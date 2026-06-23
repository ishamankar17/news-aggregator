import User from '../models/User.js'
import { signToken } from '../services/authService.js'
import {
  sendSuccess, sendCreated, sendBadRequest,
  sendUnauthorized, sendConflict, sendError,
} from '../utils/response.js'
import logger from '../utils/logger.js'

// ── POST /api/auth/register ───────────────────────────────────────────────────
export async function register(req, res, next) {
  try {
    const { name, email, password } = req.body

    const existing = await User.findOne({ email })
    if (existing) return sendConflict(res, 'An account with this email already exists')

    const user = await User.create({ name, email, password })
    const token = signToken({ id: user._id, email: user.email })

    logger.info(`New user registered: ${email}`)
    return sendCreated(res, { token, user }, 'Account created successfully')
  } catch (err) {
    next(err)
  }
}

// ── POST /api/auth/login ──────────────────────────────────────────────────────
export async function login(req, res, next) {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email }).select('+password')
    if (!user) return sendUnauthorized(res, 'Invalid email or password')

    const valid = await user.comparePassword(password)
    if (!valid) return sendUnauthorized(res, 'Invalid email or password')

    if (!user.isActive) return sendUnauthorized(res, 'Account is deactivated')

    await user.recordLogin()
    const token = signToken({ id: user._id, email: user.email })

    // Strip password from response
    const userObj = user.toJSON()
    logger.info(`User logged in: ${email}`)
    return sendSuccess(res, { token, user: userObj }, 'Login successful')
  } catch (err) {
    next(err)
  }
}

// ── GET /api/auth/me ──────────────────────────────────────────────────────────
export function getMe(req, res) {
  return sendSuccess(res, { user: req.user }, 'User profile fetched')
}

// ── PUT /api/auth/me ──────────────────────────────────────────────────────────
export async function updateMe(req, res, next) {
  try {
    const { name, preferences } = req.body

    const updates = {}
    if (name) updates.name = name.trim()
    if (preferences?.categories) updates['preferences.categories'] = preferences.categories
    if (typeof preferences?.darkMode === 'boolean') updates['preferences.darkMode'] = preferences.darkMode

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $set: updates },
      { new: true, runValidators: true }
    )

    return sendSuccess(res, { user }, 'Profile updated')
  } catch (err) {
    next(err)
  }
}

// ── PUT /api/auth/change-password ─────────────────────────────────────────────
export async function changePassword(req, res, next) {
  try {
    const { currentPassword, newPassword } = req.body

    const user = await User.findById(req.user._id).select('+password')
    const valid = await user.comparePassword(currentPassword)
    if (!valid) return sendBadRequest(res, 'Current password is incorrect')

    user.password = newPassword
    await user.save()

    const token = signToken({ id: user._id, email: user.email })
    logger.info(`Password changed for: ${user.email}`)
    return sendSuccess(res, { token }, 'Password changed successfully')
  } catch (err) {
    next(err)
  }
}

// ── DELETE /api/auth/me ───────────────────────────────────────────────────────
export async function deleteMe(req, res, next) {
  try {
    await User.findByIdAndUpdate(req.user._id, { isActive: false })
    logger.info(`Account deactivated: ${req.user.email}`)
    return sendSuccess(res, {}, 'Account deactivated')
  } catch (err) {
    next(err)
  }
}
