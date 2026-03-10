import express from 'express';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import { authenticate, authorize } from '../middleware/auth.js';
import { parseTimesheetReply } from '../services/chaserJob.js';
import { getMondayOfWeek } from '../utils/dates.js';
import multer from 'multer';
import xlsx from 'xlsx';

const router = express.Router();
const prisma = new PrismaClient();
const upload = multer({ storage: multer.memoryStorage() });

// ─── Schemas ──────────────────────────────────────────────────────────────────

const entrySchema = z.object({
  projectId: z.string(),
  taskId: z.string().optional(),
  date: z.string(),
  hours: z.number().min(0.25).max(24),
  description: z.string().optional(),
  billable: z.boolean().default(true),
});

// ─── Routes ───────────────────────────────────────────────────────────────────

/**
 * GET /api/timesheets
 * Get timesheet entries (filtered by user, week, project, status)
 */
router.get('/', authenticate, async (req, res) => {
  try {
    const { userId, weekStart, projectId, status, employeeId } = req.query;

    // PMs can see team timesheets; employees see only their own
    const targetUserId = req.user.role !== 'EMPLOYEE' && employeeId
      ? employeeId
      : req.user.id;

    const where = {};
    if (req.user.role === 'EMPLOYEE') where.userId = req.user.id;
    else if (userId) where.userId = userId;

    if (weekStart) where.weekStart = new Date(weekStart);
    if (projectId) where.projectId = projectId;
    if (status) where.status = status;

    const entries = await prisma.timesheetEntry.findMany({
      where,
      include: {
        user: { select: { id: true, name: true, email: true } },
        project: { select: { id: true, name: true, code: true, billable: true } },
        task: { select: { id: true, title: true } },
      },
      orderBy: { date: 'asc' },
    });

    res.json({ success: true, data: entries });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * POST /api/timesheets
 * Create a timesheet entry
 */
router.post('/', authenticate, async (req, res) => {
  try {
    const parsed = entrySchema.parse(req.body);
    const date = new Date(parsed.date);
    const weekStart = getMondayOfWeek(date);

    const entry = await prisma.timesheetEntry.create({
      data: {
        userId: req.user.id,
        projectId: parsed.projectId,
        taskId: parsed.taskId,
        date,
        hours: parsed.hours,
        description: parsed.description,
        billable: parsed.billable,
        status: 'DRAFT',
        weekStart,
      },
    });

    res.status(201).json({ success: true, data: entry });
  } catch (err) {
    if (err instanceof z.ZodError) return res.status(400).json({ success: false, errors: err.errors });
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * PATCH /api/timesheets/:id
 * Update a timesheet entry (own entry only, unless PM)
 */
router.patch('/:id', authenticate, async (req, res) => {
  try {
    const entry = await prisma.timesheetEntry.findUnique({ where: { id: req.params.id } });
    if (!entry) return res.status(404).json({ success: false, error: 'Entry not found' });

    // Only owner can edit draft entries; PM/Admin can override
    const canEdit = entry.userId === req.user.id && entry.status === 'DRAFT';
    const canOverride = ['ADMIN', 'PROJECT_MANAGER'].includes(req.user.role);

    if (!canEdit && !canOverride) {
      return res.status(403).json({ success: false, error: 'Cannot edit this entry' });
    }

    const updateData = { ...req.body };

    // Track PM override
    if (canOverride && entry.userId !== req.user.id) {
      updateData.overriddenBy = req.user.id;
      updateData.overrideNote = req.body.overrideNote;
    }

    const updated = await prisma.timesheetEntry.update({
      where: { id: req.params.id },
      data: updateData,
    });

    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * POST /api/timesheets/submit
 * Submit a week's timesheet for approval
 */
router.post('/submit', authenticate, async (req, res) => {
  try {
    const { weekStart } = req.body;
    const updated = await prisma.timesheetEntry.updateMany({
      where: {
        userId: req.user.id,
        weekStart: new Date(weekStart),
        status: 'DRAFT',
      },
      data: { status: 'SUBMITTED' },
    });

    res.json({ success: true, count: updated.count });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * POST /api/timesheets/approve
 * Approve or reject timesheet entries (PM/Admin only)
 */
router.post('/approve', authenticate, authorize(['ADMIN', 'PROJECT_MANAGER']), async (req, res) => {
  try {
    const { entryIds, action, note } = req.body; // action: 'APPROVED' | 'REJECTED'

    if (!['APPROVED', 'REJECTED'].includes(action)) {
      return res.status(400).json({ success: false, error: 'Invalid action' });
    }

    // Update entries
    await prisma.timesheetEntry.updateMany({
      where: { id: { in: entryIds } },
      data: { status: action },
    });

    // Create approval records
    await prisma.timesheetApproval.createMany({
      data: entryIds.map(id => ({
        entryId: id,
        approverId: req.user.id,
        action,
        note,
      })),
    });

    // Resolve incidents if approved
    if (action === 'APPROVED') {
      const entries = await prisma.timesheetEntry.findMany({ where: { id: { in: entryIds } } });
      for (const entry of entries) {
        await prisma.incident.updateMany({
          where: { userId: entry.userId, weekStart: entry.weekStart, resolved: false },
          data: { resolved: true, resolvedAt: new Date() },
        });
      }
    }

    res.json({ success: true, message: `${entryIds.length} entries ${action.toLowerCase()}` });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * POST /api/timesheets/teams-reply
 * Handle timesheet submission from Teams bot reply
 */
router.post('/teams-reply', async (req, res) => {
  try {
    const { userEmail, reply } = req.body;

    const user = await prisma.user.findUnique({ where: { email: userEmail } });
    if (!user) return res.status(404).json({ error: 'User not found' });

    // Use Claude to parse the reply
    const parsed = await parseTimesheetReply(user.id, reply);

    if (parsed.error) {
      return res.json({ message: `Sorry, I couldn't understand that. Please try: "Project Name, X hours, description"` });
    }

    // Match projects
    const entries = [];
    for (const item of parsed) {
      const project = await prisma.project.findFirst({
        where: {
          OR: [
            { name: { contains: item.projectHint, mode: 'insensitive' } },
            { code: { contains: item.projectHint, mode: 'insensitive' } },
          ],
          members: { some: { userId: user.id } },
        },
      });

      if (!project) continue;

      const weekStart = getMondayOfWeek(new Date());
      const entry = await prisma.timesheetEntry.create({
        data: {
          userId: user.id,
          projectId: project.id,
          date: new Date(),
          hours: item.hours,
          description: item.description,
          billable: item.billable,
          status: 'SUBMITTED',
          weekStart,
        },
      });
      entries.push({ project: project.name, hours: item.hours });
    }

    const summary = entries.map(e => `${e.project}: ${e.hours}h`).join(', ');
    res.json({
      message: `✅ Logged: ${summary}. Submitted for approval!`,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * POST /api/timesheets/upload-wbs
 * Upload WBS Excel file and create tasks
 */
router.post('/upload-wbs', authenticate, authorize(['ADMIN', 'PROJECT_MANAGER']), upload.single('file'), async (req, res) => {
  try {
    const { projectId } = req.body;
    const workbook = xlsx.read(req.file.buffer);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = xlsx.utils.sheet_to_json(sheet);

    const tasks = [];
    for (const row of rows) {
      const assignee = row['Assignee Email']
        ? await prisma.user.findUnique({ where: { email: row['Assignee Email'] } })
        : null;

      const task = await prisma.task.create({
        data: {
          projectId,
          title: row['Task Name'],
          type: row['Type']?.toLowerCase() === 'milestone' ? 'MILESTONE' : 'TASK',
          milestone: row['Milestone'] || null,
          assigneeId: assignee?.id || null,
          startDate: row['Start Date'] ? new Date(row['Start Date']) : null,
          endDate: row['End Date'] ? new Date(row['End Date']) : null,
          estimatedHours: parseFloat(row['Est. Hours'] || 0),
          status: 'NOT_STARTED',
        },
      });
      tasks.push(task);
    }

    res.json({ success: true, created: tasks.length, tasks });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.delete('/:id', authenticate, async (req, res) => {
  try {
    const entry = await prisma.timesheetEntry.findUnique({
      where: { id: req.params.id },
    });

    if (!entry) {
      return res.status(404).json({
        success: false,
        error: 'Entry not found',
      });
    }

    const isOwner = entry.userId === req.user.id;
    const isDraft = entry.status === 'DRAFT';
    const isManager = ['ADMIN', 'PROJECT_MANAGER'].includes(req.user.role);

    // Employees can delete only their own DRAFT entries
    if (!(isManager || (isOwner && isDraft))) {
      return res.status(403).json({
        success: false,
        error: 'You cannot delete this entry',
      });
    }

    await prisma.$transaction(async (tx) => {
      // 1️⃣ Delete approvals linked to this entry
      await tx.timesheetApproval.deleteMany({
        where: { entryId: req.params.id },
      });

      // 2️⃣ Delete the entry itself
      await tx.timesheetEntry.delete({
        where: { id: req.params.id },
      });
    });

    res.json({
      success: true,
      message: 'Timesheet entry deleted successfully',
    });

  } catch (err) {
    console.error('Delete Timesheet Error:', err);
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

export default router;
