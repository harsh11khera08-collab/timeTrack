/**
 * AI Chaser Job
 * Uses Claude API to generate personalized timesheet reminder messages
 * and send them via MS Teams and/or Email for part-time employees
 */
import Anthropic from '@anthropic-ai/sdk';
import { PrismaClient } from '@prisma/client';
import { sendTeamsMessage } from './teamsService.js';
import { sendEmail } from './emailService.js';
import { getMondayOfCurrentWeek, getMondayOfPreviousWeek, formatDate } from '../utils/dates.js';

const prisma = new PrismaClient();
const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

/**
 * Main chaser job - finds employees missing timesheets and sends AI-crafted reminders
 */
export async function runChaserJob() {
  const today = new Date();
  const dayOfWeek = today.getDay(); // 1=Mon ... 5=Fri

  // Check previous week on Monday (5 working days have passed)
  const weekToCheck = dayOfWeek === 1
    ? getMondayOfPreviousWeek()
    : getMondayOfCurrentWeek();

  const chaseAfterDays = parseInt(process.env.CHASE_AFTER_DAYS || '5');
  const maxChases = parseInt(process.env.MAX_CHASES || '3');

  console.log(`[Chaser] Checking for missing timesheets for week of ${formatDate(weekToCheck)}`);

  // Find part-time/contract employees who haven't logged for the week
  const partTimeEmployees = await prisma.user.findMany({
    where: {
      isActive: true,
      employmentType: { in: ['PARTTIME', 'CONTRACT'] },
    },
    include: {
      timesheetEntries: {
        where: {
          weekStart: weekToCheck,
          status: { not: 'DRAFT' },
        },
      },
      incidents: {
        where: {
          weekStart: weekToCheck,
          type: 'MISSING_TIMESHEET',
        },
      },
    },
  });

  for (const employee of partTimeEmployees) {
    const hasEntries = employee.timesheetEntries.length > 0;
    if (hasEntries) continue;

    const existingIncident = employee.incidents[0];
    const chaseCount = existingIncident?.chaseCount || 0;

    if (chaseCount >= maxChases) {
      console.log(`[Chaser] Max chases reached for ${employee.name}, escalating to PM`);
      await escalateToPM(employee, weekToCheck);
      continue;
    }

    // Generate personalized message using Claude
    const message = await generateChaseMessage(employee, weekToCheck, chaseCount + 1);

    // Send notification
    const channel = process.env.NOTIFICATION_CHANNEL || 'BOTH';
    if (channel === 'TEAMS' || channel === 'BOTH') {
      await sendTeamsMessage(employee.email, message.teamsCard);
    }
    if (channel === 'EMAIL' || channel === 'BOTH') {
      await sendEmail(employee.email, message.emailSubject, message.emailBody);
    }

    // Save notification record
    await prisma.notification.create({
      data: {
        userId: employee.id,
        channel: channel,
        subject: message.emailSubject,
        body: message.teamsCard,
        sentAt: new Date(),
      },
    });

    // Upsert incident record
    if (existingIncident) {
      await prisma.incident.update({
        where: { id: existingIncident.id },
        data: { chaseCount: chaseCount + 1, lastChasedAt: new Date() },
      });
    } else {
      await prisma.incident.create({
        data: {
          userId: employee.id,
          type: 'MISSING_TIMESHEET',
          weekStart: weekToCheck,
          chaseCount: 1,
          lastChasedAt: new Date(),
        },
      });
    }

    console.log(`[Chaser] Chase #${chaseCount + 1} sent to ${employee.name} (${employee.email})`);
  }
}

/**
 * Generate personalized AI chase message using Claude
 */
async function generateChaseMessage(employee, weekStart, chaseNumber) {
  const tone = process.env.CHASE_TONE || 'friendly';
  const weekStr = formatDate(weekStart);

  const prompt = `You are a helpful timesheet reminder assistant for a company called TimeTrack.

Generate a ${tone} timesheet reminder message for:
- Employee: ${employee.name}
- Week: ${weekStr}
- Reminder number: ${chaseNumber} of 3
- Employment type: Part-time

Rules:
1. Keep it short and conversational (2-3 sentences)
2. Tell them they can reply directly to this message to log their hours
3. Remind them the format: "Project Name, X hours, brief description"
4. For reminder #2+, be slightly more urgent but always friendly
5. Never be rude or threatening

Respond with JSON in this exact format:
{
  "teamsCard": "The Teams message text",
  "emailSubject": "Email subject line",
  "emailBody": "Full email body text"
}`;

  try {
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 500,
      messages: [{ role: 'user', content: prompt }],
    });

    const content = response.content[0].text;
    const parsed = JSON.parse(content.replace(/```json|```/g, '').trim());
    return parsed;
  } catch (error) {
    // Fallback message if Claude API fails
    return {
      teamsCard: `Hi ${employee.name.split(' ')[0]}! 👋 Quick reminder to fill your timesheet for ${weekStr}. Reply with your hours: "Project, hours, description". Thanks!`,
      emailSubject: `⏱️ Timesheet Reminder – Week of ${weekStr}`,
      emailBody: `Hi ${employee.name.split(' ')[0]},\n\nPlease fill your timesheet for the week of ${weekStr}.\n\nReply with: Project name, Hours worked, Brief description.\n\nThank you!`,
    };
  }
}

/**
 * Parse timesheet entry from employee reply (Teams/Email)
 */
export async function parseTimesheetReply(userId, replyText) {
  const prompt = `Parse this timesheet reply and extract time entries.

Reply: "${replyText}"

Extract entries as JSON array:
[{
  "projectHint": "partial project name or code",
  "hours": number,
  "description": "what they worked on",
  "billable": true (assume billable unless specified)
}]

If you can't parse it, return: { "error": "Could not understand the reply" }`;

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 500,
    messages: [{ role: 'user', content: prompt }],
  });

  const content = response.content[0].text;
  return JSON.parse(content.replace(/```json|```/g, '').trim());
}

/**
 * Escalate to Project Manager when max chases hit
 */
async function escalateToPM(employee, weekStart) {
  // Find PMs for this employee's projects
  const projects = await prisma.projectMember.findMany({
    where: { userId: employee.id },
    include: { project: true },
  });

  for (const pm of projects) {
    const manager = await prisma.user.findFirst({
      where: { id: pm.project.managerId },
    });
    if (!manager) continue;

    const msg = `⚠️ Escalation: ${employee.name} has not submitted timesheets for the week of ${formatDate(weekStart)} despite ${3} reminders. Please follow up directly.`;

    await sendEmail(
      manager.email,
      `[TimeTrack] Timesheet Escalation – ${employee.name}`,
      msg
    );
  }
}
