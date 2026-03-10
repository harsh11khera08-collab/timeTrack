import express from 'express';
import { authenticate, authorize } from '../middleware/auth.js';

// keka.js
const kekaRouter = express.Router();
kekaRouter.get('/sync-log', authenticate, authorize(['ADMIN']), async (req, res) => {
  res.json({ success: true, data: [] });
});
export default kekaRouter;

// notifications.js
const notifRouter = express.Router();
notifRouter.get('/', authenticate, async (req, res) => {
  res.json({ success: true, data: [] });
});
notifRouter.patch('/:id/read', authenticate, async (req, res) => {
  res.json({ success: true });
});
export const notificationRoutes = notifRouter;
