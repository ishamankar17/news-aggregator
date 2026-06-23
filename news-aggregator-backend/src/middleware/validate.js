import { validationResult } from 'express-validator'
import { sendBadRequest } from '../utils/response.js'

/**
 * Run after express-validator chains. Returns 400 if any errors exist.
 */
export function validate(req, res, next) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const formatted = errors.array().map((e) => ({
      field:   e.path,
      message: e.msg,
    }))
    return sendBadRequest(res, 'Validation failed', formatted)
  }
  next()
}
