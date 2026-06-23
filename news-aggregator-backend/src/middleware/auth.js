import { verifyToken, tokenFromHeader } from '../services/authService.js'
import User from '../models/User.js'
import { sendUnauthorized } from '../utils/response.js'
import logger from '../utils/logger.js'

/**
 * Protects a route — attaches req.user on success.
 */
export async function protect(req, res, next) {
  try {
    const token = tokenFromHeader(req)
    if (!token) return sendUnauthorized(res, 'No token provided')

    const decoded = verifyToken(token)
    const user = await User.findById(decoded.id).select('-password')
    if (!user || !user.isActive) return sendUnauthorized(res, 'User not found or deactivated')

    req.user = user
    next()
  } catch (err) {
    logger.warn(`Auth failed: ${err.message}`)
    if (err.name === 'TokenExpiredError') return sendUnauthorized(res, 'Token expired')
    return sendUnauthorized(res, 'Invalid token')
  }
}

/**
 * Optional auth — sets req.user if a valid token is present, but never blocks.
 */
export async function optionalAuth(req, _res, next) {
  try {
    const token = tokenFromHeader(req)
    if (token) {
      const decoded = verifyToken(token)
      const user = await User.findById(decoded.id).select('-password')
      if (user?.isActive) req.user = user
    }
  } catch {
    // silently ignore
  }
  next()
}
