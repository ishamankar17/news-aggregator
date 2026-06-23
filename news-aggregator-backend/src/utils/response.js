/**
 * Standardised JSON response helpers.
 * Every response shape: { success, message, data?, meta?, errors? }
 */

export const sendSuccess = (res, data = {}, message = 'Success', statusCode = 200, meta = {}) => {
  const body = { success: true, message }
  if (Object.keys(data).length) body.data = data
  if (Object.keys(meta).length)  body.meta = meta
  return res.status(statusCode).json(body)
}

export const sendError = (res, message = 'An error occurred', statusCode = 500, errors = null) => {
  const body = { success: false, message }
  if (errors) body.errors = errors
  return res.status(statusCode).json(body)
}

export const sendCreated = (res, data, message = 'Created') =>
  sendSuccess(res, data, message, 201)

export const sendNotFound = (res, message = 'Resource not found') =>
  sendError(res, message, 404)

export const sendUnauthorized = (res, message = 'Unauthorized') =>
  sendError(res, message, 401)

export const sendForbidden = (res, message = 'Forbidden') =>
  sendError(res, message, 403)

export const sendBadRequest = (res, message = 'Bad request', errors = null) =>
  sendError(res, message, 400, errors)

export const sendConflict = (res, message = 'Conflict') =>
  sendError(res, message, 409)
