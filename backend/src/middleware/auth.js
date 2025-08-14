import { createRemoteJWKSet, jwtVerify } from 'jose';

let jwks;

export function authMiddleware({ issuer, audience }) {
  if (!jwks) {
    // Standard JWKS URL for most OIDC providers
    jwks = createRemoteJWKSet(new URL(`${issuer}/.well-known/jwks.json`));
  }

  return async function (req, res, next) {
    try {
      const auth = req.headers.authorization || '';
      const token = auth.startsWith('Bearer ') ? auth.slice(7) : null;
      if (!token) return res.status(401).json({ error: 'Missing Bearer token' });

      const { payload } = await jwtVerify(token, jwks, {
        issuer,
        audience
      });

      req.user = {
        sub: payload.sub,
        email: payload.email,
        name: payload.name
      };
      next();
    } catch (err) {
      console.error('JWT verify failed:', err?.message);
      return res.status(401).json({ error: 'Invalid or expired token' });
    }
  };
}