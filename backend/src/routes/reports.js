import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();
const prisma = new PrismaClient();

/**
 * GET /api/reports/utilization
 * Resource utilization report - hours per employee
 */
router.get('/utilization', authenticate, authorize(['ADMIN', 'PROJECT_MANAGER']), async (req, res) => {
  try {
    const { startDate, endDate, projectId } = req.query;

    const where = {
      status: { in: ['SUBMITTED', 'APPROVED'] },
    };
    if (startDate && endDate) {
      where.date = { gte: new Date(startDate), lte: new Date(endDate) };
    }
    if (projectId) where.projectId = projectId;

    const entries = await prisma.timesheetEntry.groupBy({
      by: ['userId', 'billable'],
      where,
      _sum: { hours: true },
    });

    const users = await prisma.user.findMany({
      where: { id: { in: [...new Set(entries.map(e => e.userId))] } },
      select: { id: true, name: true, email: true, department: true, employmentType: true },
    });

    const result = users.map(user => {
      const billableHours = entries.find(e => e.userId === user.id && e.billable)?._sum.hours || 0;
      const nonBillableHours = entries.find(e => e.userId === user.id && !e.billable)?._sum.hours || 0;
      const totalHours = billableHours + nonBillableHours;
      return {
        ...user,
        billableHours,
        nonBillableHours,
        totalHours,
        billabilityPct: totalHours ? ((billableHours / totalHours) * 100).toFixed(1) : 0,
      };
    });

    res.json({ success: true, data: result });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * GET /api/reports/project-summary
 * Project hours summary with budget utilization
 */
router.get('/project-summary', authenticate, authorize(['ADMIN', 'PROJECT_MANAGER']), async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    const projects = await prisma.project.findMany({
      include: {
        timesheetEntries: {
          where: {
            status: { in: ['SUBMITTED', 'APPROVED'] },
            ...(startDate && endDate ? { date: { gte: new Date(startDate), lte: new Date(endDate) } } : {}),
          },
        },
        members: {
          include: { user: { select: { id: true, name: true } } },
        },
      },
    });

    const result = projects.map(p => {
      const billableHrs = p.timesheetEntries.filter(t => t.billable).reduce((a, b) => a + b.hours, 0);
      const nonBillableHrs = p.timesheetEntries.filter(t => !t.billable).reduce((a, b) => a + b.hours, 0);
      const totalHrs = billableHrs + nonBillableHrs;
      return {
        id: p.id,
        name: p.name,
        code: p.code,
        client: p.client,
        status: p.status,
        billable: p.billable,
        budgetHours: p.budgetHours,
        loggedHours: totalHrs,
        billableHours: billableHrs,
        nonBillableHours: nonBillableHrs,
        remainingHours: Math.max(0, p.budgetHours - totalHrs),
        utilizationPct: p.budgetHours ? ((totalHrs / p.budgetHours) * 100).toFixed(1) : 0,
        memberCount: p.members.length,
      };
    });

    res.json({ success: true, data: result });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * GET /api/reports/compliance
 * Timesheet compliance report with incident counts
 */
router.get('/compliance', authenticate, authorize(['ADMIN', 'PROJECT_MANAGER']), async (req, res) => {
  try {
    const incidents = await prisma.incident.findMany({
      include: {
        user: { select: { id: true, name: true, email: true, department: true } },
      },
      orderBy: { createdAt: 'desc' },
    });

    // Aggregate by employee
    const byEmployee = {};
    for (const inc of incidents) {
      if (!byEmployee[inc.userId]) {
        byEmployee[inc.userId] = {
          user: inc.user,
          totalIncidents: 0,
          openIncidents: 0,
          resolvedIncidents: 0,
          incidentHistory: [],
        };
      }
      byEmployee[inc.userId].totalIncidents++;
      if (inc.resolved) byEmployee[inc.userId].resolvedIncidents++;
      else byEmployee[inc.userId].openIncidents++;
      byEmployee[inc.userId].incidentHistory.push({
        id: inc.id,
        weekStart: inc.weekStart,
        chaseCount: inc.chaseCount,
        resolved: inc.resolved,
        createdAt: inc.createdAt,
      });
    }

    res.json({ success: true, data: Object.values(byEmployee) });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * GET /api/reports/export
 * Export report data as CSV
 */
router.get('/export', authenticate, authorize(['ADMIN', 'PROJECT_MANAGER']), async (req, res) => {
  try {
    const { type, startDate, endDate } = req.query;

    const entries = await prisma.timesheetEntry.findMany({
      where: {
        status: { in: ['SUBMITTED', 'APPROVED'] },
        ...(startDate && endDate ? { date: { gte: new Date(startDate), lte: new Date(endDate) } } : {}),
      },
      include: {
        user: { select: { name: true, email: true, department: true } },
        project: { select: { name: true, code: true, client: true } },
        task: { select: { title: true } },
      },
      orderBy: { date: 'asc' },
    });

    const rows = entries.map(e => ({
      Date: e.date.toISOString().split('T')[0],
      Employee: e.user.name,
      Email: e.user.email,
      Department: e.user.department,
      Project: e.project.name,
      'Project Code': e.project.code,
      Client: e.project.client,
      Task: e.task?.title || '',
      Hours: e.hours,
      Billable: e.billable ? 'Yes' : 'No',
      Description: e.description,
      Status: e.status,
    }));

    // Convert to CSV
    const headers = Object.keys(rows[0] || {}).join(',');
    const csvRows = rows.map(r => Object.values(r).map(v => `"${v}"`).join(','));
    const csv = [headers, ...csvRows].join('\n');

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="timetrack-report-${Date.now()}.csv"`);
    res.send(csv);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
