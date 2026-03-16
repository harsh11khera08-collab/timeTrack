import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const router = express.Router();
const prisma = new PrismaClient();

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

router.post('/login', async (req, res) => {
  try {
    const { email } = loginSchema.parse(req.body);
    const user = await prisma.employee.findUnique({ where: { email } });
    // if (!user || !await bcrypt.compare(password, user.passwordHash)) {
    //   return res.status(401).json({ success: false, error: 'Invalid credentials' });
    // }
    const token = jwt.sign({ email : user.email }, process.env.JWT_SECRET, { expiresIn: '24h' });
    // res.json({ success: true, token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
    // const token = "abcdef";
    res.json({ success:true , token , user : {email : user.email }});
    //res.json({ success: true, token});
  } catch (err) {
    if (err instanceof z.ZodError) return res.status(400).json({ success: false, errors: err.errors });
    res.status(500).json({ success: false, error: err.message });
  }
});
export default router;

// router.post('/refresh', async (req, res) => {
//   const { token } = req.body;
//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const newToken = jwt.sign({ userId: decoded.userId }, process.env.JWT_SECRET, { expiresIn: '24h' });
//     res.json({ success: true, token: newToken });
//   } catch {
//     res.status(401).json({ success: false, error: 'Invalid token' });
//   }
// });

// export default router;

// import jwt from 'jsonwebtoken';
// import jwksRsa from 'jwks-rsa';
// import { PrismaClient } from '@prisma/client';
// import router from '../routes/task.js';

// const prisma = new PrismaClient();

// // ─── JWKS client — fetches Microsoft's public signing keys ──────────────────
// const jwksClient = jwksRsa({
//   jwksUri: `https://login.microsoftonline.com/${process.env.AZURE_TENANT_ID}/discovery/v2.0/keys`,
//   cache: true,
//   rateLimit: true,
// });

// function getSigningKey(header, callback) {
//   jwksClient.getSigningKey(header.kid, (err, key) => {
//     if (err) return callback(err);
//     callback(null, key.getPublicKey());
//   });
// }

// // ─── authenticate ────────────────────────────────────────────────────────────
// // Validates the Azure AD Bearer token, then finds (or auto-creates) the user
// // in your local DB and attaches them to req.user.
// export async function authenticate(req, res, next) {
//   const authHeader = req.headers.authorization;

//   if (!authHeader?.startsWith('Bearer ')) {
//     return res.status(401).json({ success: false, error: 'Missing or malformed token' });
//   }

//   const token = authHeader.split(' ')[1];

//   try {
//     // Verify the Azure AD token against Microsoft's public keys
//     const decoded = await new Promise((resolve, reject) => {
//       jwt.verify(
//         token,
//         getSigningKey,
//         {
//           audience: process.env.AZURE_CLIENT_ID,       // your App Registration client ID
//           issuer: `https://login.microsoftonline.com/${process.env.AZURE_TENANT_ID}/v2.0`,
//           algorithms: ['RS256'],
//         },
//         (err, payload) => (err ? reject(err) : resolve(payload))
//       );
//     });

//     // Extract identity from token claims
//     // Azure AD puts email in 'preferred_username' or 'email' claim
//     const email = decoded.preferred_username || decoded.email || decoded.upn;
//     const name  = decoded.name || email;
//     const oid   = decoded.oid; // stable Azure object ID — never changes even if email changes

//     if (!email) {
//       return res.status(401).json({ success: false, error: 'Token missing email claim' });
//     }

//     // Find user in your DB — upsert so first-time Azure logins are handled automatically
//     const user = await prisma.user.upsert({
//       where: { email },
//       update: { name },   // keep name in sync with Azure AD
//       create: {
//         email,
//         name,
//         role: 'EMPLOYEE', // default role — change in DB/admin panel as needed
//         employmentType: 'FULLTIME',
//       },
//     });

//     req.user = user; // { id, email, name, role, employmentType, ... }
//     next();
//   } catch (err) {
//     console.error('Auth error:', err.message);

//     const message =
//       err.name === 'TokenExpiredError' ? 'Token expired' :
//       err.name === 'JsonWebTokenError'  ? 'Invalid token' :
//       'Authentication failed';

//     return res.status(401).json({ success: false, error: message });
//   }
// }

// // ─── authorize ───────────────────────────────────────────────────────────────
// // Usage: authorize(['ADMIN', 'PROJECT_MANAGER'])
// export function authorize(roles) {
//   return (req, res, next) => {
//     if (!req.user) {
//       return res.status(401).json({ success: false, error: 'Not authenticated' });
//     }
//     if (!roles.includes(req.user.role)) {
//       return res.status(403).json({
//         success: false,
//         error: `Access denied. Required roles: ${roles.join(', ')}`,
//       });
//     }
//     next();
//   };
// }
// export default router;