import express from 'express';
import jwt from 'jsonwebtoken';
import jwksRsa from 'jwks-rsa';

const router = express.Router();

const TENANT_ID = 'f3753df1-d56f-4b0d-9fc0-527f64948897';
const CLIENT_ID = '3a780fe7-1950-45d4-9b97-f488c01a55f9';

const jwksClient = jwksRsa({
  jwksUri: `https://login.microsoftonline.com/${TENANT_ID}/discovery/v2.0/keys`,
  cache: true,
});

function getSigningKey(header, callback) {
  jwksClient.getSigningKey(header.kid, (err, key) => {
    if (err) return callback(err);
    callback(null, key.getPublicKey());
  });
}

// GET /api/test
// Send your Azure AD token as: Authorization: Bearer <token>
// Returns the decoded user info from the token
router.get('/', async (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, error: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = await new Promise((resolve, reject) => {
      jwt.verify(
        token,
        getSigningKey,
        {
        //   audience: CLIENT_ID,
          issuer: `https://login.microsoftonline.com/${TENANT_ID}/v2.0`,
          algorithms: ['RS256'],
        },
        (err, payload) => (err ? reject(err) : resolve(payload))
      );
    });

    // Return the user info extracted from the token
    return res.json({
      success: true,
      message: 'Token is valid!',
      user: {
        name:  decoded.name,
        email: decoded.preferred_username || decoded.email,
        oid:   decoded.oid,  // unique Azure object ID
      },
    });

  } catch (err) {
    return res.status(401).json({ success: false, error: err.message });
  }
});

export default router;