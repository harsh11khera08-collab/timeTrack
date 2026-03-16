import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();
const prisma = new PrismaClient();

router.get('/', authenticate, authorize(['ADMIN', 'PROJECT_MANAGER']), async (req, res) => {
  try {
    const incidents = await prisma.incident.findMany({
      include: { user: { select: { id: true, name: true, email: true, department: true } } },
      orderBy: { createdAt: 'desc' },
    });
    res.json({ success: true, data: incidents });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.patch('/:id/resolve', authenticate, authorize(['ADMIN', 'PROJECT_MANAGER']), async (req, res) => {
  try {
    const incident = await prisma.incident.update({
      where: { id: req.params.id },
      data: { resolved: true, resolvedAt: new Date(), resolvedNote: req.body.note },
    });
    res.json({ success: true, data: incident });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
