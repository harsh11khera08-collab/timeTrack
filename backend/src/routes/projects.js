import express from 'express';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();
const prisma = new PrismaClient();

router.get('/', authenticate, async (req, res) => {
  try {
    const where = req.user.role === 'EMPLOYEE'
      ? { members: { some: { userId: req.user.id } } }
      : {};

    const projects = await prisma.project.findMany({
      where,
      include: {
        members: { include: { user: { select: { id: true, name: true, email: true, employmentType: true } } } },
        tasks: { orderBy: { sortOrder: 'asc' } },
        _count: { select: { timesheetEntries: true } },
      },
    });
    res.json({ success: true, data: projects });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.post('/', authenticate, authorize(['ADMIN', 'PROJECT_MANAGER']), async (req, res) => {
  try {
    const project = await prisma.project.create({
      data: { ...req.body, managerId: req.user.id },
    });
    res.status(201).json({ success: true, data: project });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.get('/:id', authenticate, async (req, res) => {
  try {
    const project = await prisma.project.findUnique({
      where: { id: req.params.id },
      include: {
        members: { include: { user: true } },
        tasks: { orderBy: [{ milestone: 'asc' }, { sortOrder: 'asc' }] },
      },
    });
    if (!project) return res.status(404).json({ success: false, error: 'Not found' });
    res.json({ success: true, data: project });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.patch('/:id', authenticate, authorize(['ADMIN', 'PROJECT_MANAGER']), async (req, res) => {
  try {
    const project = await prisma.project.update({
      where: { id: req.params.id },
      data: req.body,
    });
    res.json({ success: true, data: project });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.post('/:id/members', authenticate, authorize(['ADMIN', 'PROJECT_MANAGER']), async (req, res) => {
  try {
    const member = await prisma.projectMember.create({
      data: { projectId: req.params.id, ...req.body },
    });
    res.status(201).json({ success: true, data: member });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.delete(
  "/:id",
  authenticate,
  authorize(["ADMIN", "PROJECT_MANAGER"]),
  async (req, res) => {
    try {
      const projectId = req.params.id;

      // Check if project exists
      const existingProject = await prisma.project.findUnique({
        where: { id: projectId },
      });

      if (!existingProject) {
        return res.status(404).json({
          success: false,
          error: "Project not found",
        });
      }

      await prisma.$transaction(async (tx) => {
        // 1️⃣ Delete Timesheet Approvals (deepest child)
        await tx.timesheetApproval.deleteMany({
          where: {
            entry: {
              projectId: projectId,
            },
          },
        });

        // 2️⃣ Delete Timesheet Entries
        await tx.timesheetEntry.deleteMany({
          where: { projectId },
        });

        // 3️⃣ Delete Tasks
        await tx.task.deleteMany({
          where: { projectId },
        });

        // 4️⃣ Delete Project Members
        await tx.projectMember.deleteMany({
          where: { projectId },
        });

        // 5️⃣ Finally Delete Project
        await tx.project.delete({
          where: { id: projectId },
        });
      });

      res.json({
        success: true,
        message: "Project and related records deleted successfully",
      });

    } catch (err) {
      console.error("Delete Project Error:", err);
      res.status(500).json({
        success: false,
        error: err.message,
      });
    }
  }
);

export default router;
