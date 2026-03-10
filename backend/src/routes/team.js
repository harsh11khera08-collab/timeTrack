import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticate, authorize } from '../middleware/auth.js';
import { syncFromKeka } from '../services/kekaService.js';
import axios from 'axios';

const router = express.Router();
const prisma = new PrismaClient();

router.get('/', authenticate, async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      where: { isActive: true },
      include: {
        incidents: { where: { resolved: false } },
        projectMembers: { include: { project: { select: { id: true, name: true } } } },
      },
    });
    res.json({ success: true, data: users.map(u => ({ ...u, passwordHash: undefined })) });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.post('/sync-keka', authenticate, authorize(['ADMIN', 'PROJECT_MANAGER']), async (req, res) => {
  try {
    const result = await syncFromKeka();
    res.json({ success: result.success, ...result });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.post(
  "/send",
  //authenticate,
  //authorize(["ADMIN", "PROJECT_MANAGER"]),
  async (req, res) => {
    try {

      const graphToken = req.headers["x-ms-token"]; // Graph API token
      const {senderEmail , email, message } = req.body;

      if (!graphToken) {
        return res.status(400).json({
          success: false,
          error: "Microsoft Graph token missing"
        });
      }

      /*
      1️⃣ Get Azure user
      */
      const userRes = await axios.get(
        `https://graph.microsoft.com/v1.0/users/${email}`,
        {
          headers: {
            Authorization: `Bearer ${graphToken}`
          }
        }
      );

      const userId = userRes.data.id;

      const senderRes = await axios.get(
        `https://graph.microsoft.com/v1.0/users/${senderEmail}`,
        { headers: { Authorization: `Bearer ${graphToken}` } }
      );
      const senderId = senderRes.data.id;

      /*
      2️⃣ Create one-to-one chat
      */
      const chatRes = await axios.post(
        `https://graph.microsoft.com/v1.0/chats`,
        {
          chatType: "oneOnOne",
           members: [
            {
              "@odata.type": "#microsoft.graph.aadUserConversationMember",
              roles: ["owner"],
              "user@odata.bind": `https://graph.microsoft.com/v1.0/users('${senderId}')`
            },
            {
              "@odata.type": "#microsoft.graph.aadUserConversationMember",
              roles: ["owner"],
              "user@odata.bind": `https://graph.microsoft.com/v1.0/users('${userId}')`
            }
          ]
        },
        {
          headers: {
            Authorization: `Bearer ${graphToken}`,
            "Content-Type": "application/json"
          }
        }
      );

      const chatId = chatRes.data.id;

      /*
      3️⃣ Send Teams message
      */
      const messageRes = await axios.post(
        `https://graph.microsoft.com/v1.0/chats/${chatId}/messages`,
        {
          body: {
            content: message
          }
        },
        {
          headers: {
            Authorization: `Bearer ${graphToken}`,
            "Content-Type": "application/json"
          }
        }
      );

      res.json({
        success: true,
        message: "Teams message sent successfully",
        data: messageRes.data
      });

    } catch (error) {

      console.error(error.response?.data || error.message);

      res.status(500).json({
        success: false,
        error: "Failed to send Teams message" + error.message,
        details: error.response?.data
      });
    }
  }
);

export default router;