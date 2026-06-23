import logger from '../utils/logger.js'
import { sendError } from '../utils/response.js'

/**
 * Global Express error handler — must be the last middleware registered.
 */
// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, next) {
  logger.error(`${err.message}${err.stack ? `\n${err.stack}` : ''}`)

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map((e) => ({
      field: e.path,
      message: e.message,
    }))
    return sendError(res, 'Validation error', 400, errors)
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0] || 'field'
    return sendError(res, `${field} already exists`, 409)
  }

  // Mongoose cast error (e.g. invalid ObjectId)
  if (err.name === 'CastError') {
    return sendError(res, `Invalid value for ${err.path}`, 400)
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') return sendError(res, 'Invalid token', 401)
  if (err.name === 'TokenExpiredError') return sendError(res, 'Token expired', 401)

  // NewsAPI upstream error (passed with .status property)
  if (err.status) return sendError(res, err.message, err.status >= 400 && err.status < 600 ? err.status : 502)

  // Default
  const isDev = process.env.NODE_ENV !== 'production'
  return sendError(
    res,
    isDev ? err.message : 'Internal server error',
    err.statusCode || 500
  )
}

/**
 * Catch-all for unknown routes.
 */
export function notFoundHandler(req, res) {
  sendError(res, `Route not found: ${req.method} ${req.originalUrl}`, 404)
}
