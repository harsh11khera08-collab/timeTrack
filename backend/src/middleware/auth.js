// // import jwt from 'jsonwebtoken';
// // import { PrismaClient } from '@prisma/client';

// // const prisma = new PrismaClient();

// // export async function authenticate(req, res, next) {
// //   const token = req.headers.authorization?.split(' ')[1];
// //   if (!token) return res.status(401).json({ success: false, error: 'No token provided' });

// //   try {
// //     const decoded = jwt.verify(token, process.env.JWT_SECRET);
// //     const user = await prisma.user.findUnique({ where: { id: decoded.userId } });
// //     if (!user || !user.isActive) return res.status(401).json({ success: false, error: 'Invalid token' });
// //     req.user = user;
// //     next();
// //   } catch {
// //     res.status(401).json({ success: false, error: 'Invalid or expired token' });
// //   }
// // }

// // export function authorize(roles) {
// //   return (req, res, next) => {
// //     if (!roles.includes(req.user.role)) {
// //       return res.status(403).json({ success: false, error: 'Insufficient permissions' });
// //     }
// //     next();
// //   };
// // }
// // import jwt from 'jsonwebtoken';
// // import jwksClient from 'jwks-rsa';
// // import { PrismaClient } from '@prisma/client';

// // const prisma = new PrismaClient();

// // const client = jwksClient({
// //   jwksUri: `https://login.microsoftonline.com/${process.env.AZURE_TENANT_ID}/discovery/v2.0/keys`,
// //   cache: true,
// //   cacheMaxAge: 86400000,
// // });

// // function getSigningKey(header) {
// //   return new Promise((resolve, reject) => {
// //     client.getSigningKey(header.kid, (err, key) => {
// //       if (err) return reject(err);
// //       resolve(key.getPublicKey());
// //     });
// //   });
// // }

// // export async function authenticate(req, res, next) {
// //   const token = req.headers.authorization?.split(' ')[1];
// //   if (!token) {
// //     return res.status(401).json({ success: false, error: 'No token provided' });
// //   }

// //   try {
// //     const decoded = jwt.decode(token, { complete: true });
// //     if (!decoded) {
// //       return res.status(401).json({ success: false, error: 'Invalid token format' });
// //     }

// //     const signingKey = await getSigningKey(decoded.header);

// //     const payload = jwt.verify(token, signingKey, {
// //       algorithms: ['RS256'],                          // 🔴 Fix 1
// //       audience: [
// //         process.env.AZURE_CLIENT_ID,
// //         `api://${process.env.AZURE_CLIENT_ID}`,
// //       ],
// //       issuer: `https://login.microsoftonline.com/${process.env.AZURE_TENANT_ID}/v2.0`,
// //     });

// //     // 🔴 Fix 2 — safe email resolution
// //     const userEmail = (
// //       payload.preferred_username || payload.email || payload.upn || ''
// //     ).toLowerCase();

// //     if (!userEmail) {
// //       return res.status(401).json({ success: false, error: 'Cannot resolve user identity' });
// //     }

// //     console.log("✅ Token valid for:", userEmail);

// //     // 🟡 Fix 3 + 4 — handle legacy email format + atomic upsert
// //     let user = await prisma.user.findFirst({
// //       where: {
// //         OR: [
// //           { email: userEmail },
// //           { email: userEmail.split('@')[0] },   // legacy: "alex.morgan"
// //         ]
// //       }
// //     });

// //     if (user && !user.email.includes('@')) {
// //       // Migrate legacy user to full email
// //       user = await prisma.user.update({
// //         where: { id: user.id },
// //         data:  { email: userEmail },
// //       });
// //     }

// //     if (!user) {
// //       user = await prisma.user.create({
// //         data: {
// //           email:    userEmail,
// //           name:     payload.name || userEmail,
// //           role:     'EMPLOYEE',
// //           isActive: true,
// //         },
// //       });
// //     }

// //     if (!user.isActive) {
// //       return res.status(401).json({ success: false, error: 'User inactive' });
// //     }

// //     req.user = user;
// //     next();

// //   } catch (err) {
// //     console.error('Auth error:', err.message);
// //     res.status(401).json({ success: false, error: 'Invalid or expired token' });
// //   }
// // }

// // export function authorize(roles) {
// //   return (req, res, next) => {
// //     if (!req.user) {
// //       return res.status(401).json({ success: false, error: 'Not authenticated' });
// //     }
// //     if (!roles.includes(req.user.role)) {
// //       return res.status(403).json({ success: false, error: 'Insufficient permissions' });
// //     }
// //     next();
// //   };
// // }

// import jwt from 'jsonwebtoken';
// import jwksRsa from 'jwks-rsa';
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

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

// // authenticate 
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
//           audience: process.env.AZURE_CLIENT_ID,       // App Registration client ID
//           issuer: `https://login.microsoftonline.com/${process.env.AZURE_TENANT_ID}/v2.0`,
//           algorithms: ['RS256'],
//         },
//         (err, payload) => (err ? reject(err) : resolve(payload))
//       );
//     });

//     // Extract identity from token claims
//     const email = decoded.preferred_username || decoded.email || decoded.upn;
//     const name  = decoded.name || email;
//     const oid   = decoded.oid; 

//     if (!email) {
//       return res.status(401).json({ success: false, error: 'Token missing email claim' });
//     }

//     // Find user in your DB — upsert so first-time Azure logins are handled automatically
//     const user = await prisma.user.upsert({
//       where: { email },
//       update: { name },   
//       create: {
//         email,
//         name,
//         role: 'EMPLOYEE', // default role
//         employmentType: 'FULLTIME',
//       },
//     });

//     req.user = user; 
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

// // authorize 
// // Usage: authorize(['ADMIN', 'PROJECT_MANAGER'])
// export function authorize(roles) {
//   return (req, res, next) => {
//     if (!req.user) {
//       return res.status(401).json({ success: false, error
//         : 'Not authenticated' });
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

import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function authenticate(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ success: false, error: 'No token provided' });

  try {
    const decoded = jwt.verify(token , process.env.JWT_SECRET);
    // res.json({message : "token verified"});
    const user = await prisma.employee.findUnique({ where: { email: decoded.email } });

    if (!user) return res.status(401).json({ success: false, error: 'Invalid token' });
    req.user = user;
    next();
  } catch {
    res.status(401).json({ success: false, error: 'Invalid or expired token' });
  }
}

export function authorize(roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ success: false, error: 'Insufficient permissions' });
    }
    next();
  };
}
 