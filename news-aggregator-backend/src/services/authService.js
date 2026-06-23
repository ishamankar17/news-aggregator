import jwt from 'jsonwebtoken'

const SECRET     = process.env.JWT_SECRET || 'fallback_secret_change_in_production'
const EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d'

export function signToken(payload) {
  return jwt.sign(payload, SECRET, { expiresIn: EXPIRES_IN })
}

export function verifyToken(token) {
  return jwt.verify(token, SECRET) // throws on invalid / expired
}

export function tokenFromHeader(req) {
  const auth = req.headers.authorization || ''
  if (auth.startsWith('Bearer ')) return auth.slice(7)
  return null
}
