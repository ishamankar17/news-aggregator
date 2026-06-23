import rateLimit from 'express-rate-limit'
import { sendError } from '../utils/response.js'

const handler = (_req, res) =>
  sendError(res, 'Too many requests — please try again later.', 429)

/** General API limiter: 100 req / 15 min per IP */
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  handler,
})

/** Strict limiter for auth routes: 10 req / 15 min per IP */
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  handler,
})

/** News proxy routes: 60 req / 15 min per IP */
export const newsLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 60,
  standardHeaders: true,
  legacyHeaders: false,
  handler,
})
