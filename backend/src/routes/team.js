import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticate, authorize } from '../middleware/auth.js';
import { syncFromKeka } from '../services/kekaService.js';

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

export default router;
