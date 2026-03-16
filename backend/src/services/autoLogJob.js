/**
 * Auto-Log Job
 * Automatically logs 8h/day for full-time employees assigned to projects
 * Runs every weekday morning
 */
import { PrismaClient } from '@prisma/client';
import { getYesterday, getMondayOfCurrentWeek } from '../utils/dates.js';

const prisma = new PrismaClient();

export async function runAutoLogJob() {
  const yesterday = getYesterday();
  const dayOfWeek = yesterday.getDay();

  // Skip weekends
  if (dayOfWeek === 0 || dayOfWeek === 6) {
    console.log('[AutoLog] Skipping weekend');
    return;
  }

  const weekStart = getMondayOfCurrentWeek();

  // Find full-time employees with active project assignments
  const fullTimeMembers = await prisma.projectMember.findMany({
    where: {
      user: { employmentType: 'FULLTIME', isActive: true },
      project: { status: 'ACTIVE' },
      allocation: { gte: 100 }, // 100% allocated = full-time on project
      OR: [
        { startDate: null },
        { startDate: { lte: yesterday } },
      ],
      AND: [
        { OR: [{ endDate: null }, { endDate: { gte: yesterday } }] },
      ],
    },
    include: {
      user: true,
      project: true,
    },
  });

  for (const member of fullTimeMembers) {
    // Check if entry already exists for this day (avoid duplicates)
    const existing = await prisma.timesheetEntry.findFirst({
      where: {
        userId: member.userId,
        projectId: member.projectId,
        date: yesterday,
      },
    });

    if (existing) {
      console.log(`[AutoLog] Entry already exists for ${member.user.name} on ${yesterday.toDateString()}`);
      continue;
    }

    // Create auto-logged entry (draft - will be submitted at week end)
    await prisma.timesheetEntry.create({
      data: {
        userId: member.userId,
        projectId: member.projectId,
        date: yesterday,
        hours: 8,
        description: 'Auto-logged (full-time assignment)',
        billable: member.project.billable,
        status: 'SUBMITTED', // auto-submit for full-time
        weekStart,
      },
    });

    console.log(`[AutoLog] Logged 8h for ${member.user.name} on ${member.project.name} (${yesterday.toDateString()})`);
  }
}
