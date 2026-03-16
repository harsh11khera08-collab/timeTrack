/**
 * Keka HR Integration Service
 * Syncs employees from Keka API into TimeTrack
 */
import axios from 'axios';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const kekaClient = axios.create({
  baseURL: process.env.KEKA_BASE_URL || 'https://api.keka.com/v1',
  headers: {
    'Authorization': `Bearer ${process.env.KEKA_API_TOKEN}`,
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

/**
 * Fetch all employees from Keka and upsert into DB
 */
export async function syncFromKeka() {
  const logEntry = { status: 'SUCCESS', recordsSync: 0, error: null };

  try {
    console.log('[Keka] Starting sync...');

    // Keka API: GET /employees
    // Ref: https://developers.keka.com/reference/employees
    const response = await kekaClient.get('/employees', {
      params: {
        status: 'Active',
        pageSize: 200,
      }
    });

    const kekaEmployees = response.data?.data || [];
    console.log(`[Keka] Fetched ${kekaEmployees.length} employees`);

    for (const ke of kekaEmployees) {
      await prisma.user.upsert({
        where: { kekaId: ke.employeeId },
        update: {
          name: `${ke.firstName} ${ke.lastName}`,
          email: ke.email,
          department: ke.department?.name,
          designation: ke.jobTitle,
          employmentType: mapEmploymentType(ke.employmentType),
          isActive: ke.status === 'Active',
          updatedAt: new Date(),
        },
        create: {
          kekaId: ke.employeeId,
          name: `${ke.firstName} ${ke.lastName}`,
          email: ke.email,
          passwordHash: await bcrypt.hash('Welcome@123', 10), // default password
          role: 'EMPLOYEE',
          department: ke.department?.name,
          designation: ke.jobTitle,
          employmentType: mapEmploymentType(ke.employmentType),
          isActive: ke.status === 'Active',
        },
      });
      logEntry.recordsSync++;
    }

    await prisma.kekaSyncLog.create({
      data: { ...logEntry, status: 'SUCCESS' }
    });

    console.log(`[Keka] Sync complete. ${logEntry.recordsSync} records processed.`);
    return { success: true, count: logEntry.recordsSync };

  } catch (error) {
    console.error('[Keka] Sync failed:', error.message);
    await prisma.kekaSyncLog.create({
      data: { status: 'FAILED', recordsSync: logEntry.recordsSync, error: error.message }
    });
    return { success: false, error: error.message };
  }
}

/**
 * Map Keka employment type to our enum
 */
function mapEmploymentType(kekaType) {
  const map = {
    'FullTime': 'FULLTIME',
    'PartTime': 'PARTTIME',
    'Contract': 'CONTRACT',
    'Intern': 'CONTRACT',
  };
  return map[kekaType] || 'FULLTIME';
}

/**
 * Fetch a specific employee from Keka
 */
export async function getKekaEmployee(kekaId) {
  const response = await kekaClient.get(`/employees/${kekaId}`);
  return response.data?.data;
}
