import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import cron from 'node-cron';

dotenv.config();

// Route imports
import authRoutes from './routes/auth.js';
import projectRoutes from './routes/projects.js';
import employeeRoutes from './routes/employees.js';
import timesheetRoutes from './routes/timesheets.js';
import teamRoutes from './routes/team.js';
import reportsRoutes from './routes/reports.js';
import kekaRoutes from './routes/keka.js';
import notificationRoutes from './routes/notifications.js';
import incidentRoutes from './routes/incidents.js';

// Services
import { runChaserJob } from './services/chaserJob.js';
import { runAutoLogJob } from './services/autoLogJob.js';
import { syncFromKeka } from './services/kekaService.js';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const app = express();
const PORT = process.env.PORT || 4000;

// ─── Middleware ─────────────────────────────────────────────────────────────
app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Request logger
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// ─── API Routes ──────────────────────────────────────────────────────────────
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/timesheets', timesheetRoutes);
app.use('/api/team', teamRoutes);
app.use('/api/reports', reportsRoutes);
app.use('/api/keka', kekaRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/incidents', incidentRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date(), version: '1.0.0' });
});

// ─── Serve Frontend (production) ─────────────────────────────────────────────
const publicPath = path.join(__dirname, '../public');
app.use(express.static(publicPath));
app.get('*', (req, res) => {
  if (!req.path.startsWith('/api')) {
    res.sendFile(path.join(publicPath, 'index.html'));
  }
});

// ─── Scheduled Jobs ──────────────────────────────────────────────────────────

// Daily at 9 AM: Auto-log hours for full-time employees
cron.schedule('0 9 * * 1-5', async () => {
  console.log('[CRON] Running auto-log job for full-time employees');
  await runAutoLogJob();
});

// Daily at 10 AM Mon-Fri: Chase part-time employees who haven't logged
cron.schedule('0 10 * * 1-5', async () => {
  console.log('[CRON] Running AI chaser job for missing timesheets');
  await runChaserJob();
});

// Daily at 6 AM: Sync employees from Keka
cron.schedule('0 6 * * *', async () => {
  console.log('[CRON] Syncing employees from Keka');
  await syncFromKeka();
});

// Every Monday 8 AM: Generate weekly incident check
// cron.schedule('0 8 * * 1', async () => {
//   console.log('[CRON] Checking for week-long missing timesheets');
//  // await checkWeeklyCompliance();
// });

// ─── Start ───────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`✅ TimeTrack API running on http://localhost:${PORT}`);
  console.log(`   Environment: ${process.env.NODE_ENV || 'development'}`);
});
