/**
 * MS Teams Integration Service
 * Sends adaptive card messages to employees via Teams webhook
 * Employees can fill timesheets directly from Teams via bot
 */
import axios from 'axios';

/**
 * Send a message to Teams channel/user via webhook
 */
export async function sendTeamsMessage(userEmail, messageText) {
  const webhookUrl = process.env.TEAMS_WEBHOOK_URL;
  if (!webhookUrl) {
    console.warn('[Teams] TEAMS_WEBHOOK_URL not configured, skipping');
    return false;
  }

  // Adaptive Card for timesheet reminder
  const adaptiveCard = {
    type: 'message',
    attachments: [
      {
        contentType: 'application/vnd.microsoft.card.adaptive',
        contentUrl: null,
        content: {
          '$schema': 'http://adaptivecards.io/schemas/adaptive-card.json',
          type: 'AdaptiveCard',
          version: '1.3',
          body: [
            {
              type: 'TextBlock',
              text: '⏱️ TimeTrack Reminder',
              weight: 'Bolder',
              size: 'Medium',
              color: 'Accent',
            },
            {
              type: 'TextBlock',
              text: messageText,
              wrap: true,
            },
            {
              type: 'TextBlock',
              text: 'Quick Log Format: "Project Name, X hours, description"',
              size: 'Small',
              color: 'Good',
              wrap: true,
            },
          ],
          actions: [
            {
              type: 'Action.ShowCard',
              title: '📝 Log Hours Now',
              card: {
                type: 'AdaptiveCard',
                body: [
                  {
                    type: 'Input.Text',
                    id: 'timesheetReply',
                    placeholder: 'e.g. Phoenix Portal, 4 hours, API development',
                    isMultiline: true,
                  },
                ],
                actions: [
                  {
                    type: 'Action.Http',
                    title: 'Submit',
                    method: 'POST',
                    url: `${process.env.API_BASE_URL}/api/timesheets/teams-reply`,
                    body: JSON.stringify({
                      userEmail,
                      reply: '{{timesheetReply.value}}',
                    }),
                    headers: [
                      { name: 'Content-Type', value: 'application/json' },
                    ],
                  },
                ],
              },
            },
            {
              type: 'Action.OpenUrl',
              title: '🌐 Open TimeTrack',
              url: process.env.FRONTEND_URL || 'http://localhost:3000',
            },
          ],
        },
      },
    ],
  };

  try {
    await axios.post(webhookUrl, adaptiveCard);
    console.log(`[Teams] Message sent to ${userEmail}`);
    return true;
  } catch (error) {
    console.error(`[Teams] Failed to send message to ${userEmail}:`, error.message);
    return false;
  }
}
