import { Router } from 'express'
import { body } from 'express-validator'
import * as authCtrl from '../controllers/authController.js'
import { protect } from '../middleware/auth.js'
import { validate } from '../middleware/validate.js'
import { authLimiter } from '../middleware/rateLimiter.js'

const router = Router()

// Validation rule sets
const registerRules = [
  body('name').trim().notEmpty().withMessage('Name is required').isLength({ min: 2, max: 60 }),
  body('email').isEmail().withMessage('Valid email is required').normalizeEmail(),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
]

const loginRules = [
  body('email').isEmail().withMessage('Valid email is required').normalizeEmail(),
  body('password').notEmpty().withMessage('Password is required'),
]

const changePasswordRules = [
  body('currentPassword').notEmpty().withMessage('Current password is required'),
  body('newPassword').isLength({ min: 6 }).withMessage('New password must be at least 6 characters'),
]

// Public routes (with auth rate limiter)
router.post('/register', authLimiter, registerRules,     validate, authCtrl.register)
router.post('/login',    authLimiter, loginRules,        validate, authCtrl.login)

// Protected routes
router.get('/me',                protect,                           authCtrl.getMe)
router.put('/me',                protect,                           authCtrl.updateMe)
router.put('/change-password',   protect, changePasswordRules, validate, authCtrl.changePassword)
router.delete('/me',             protect,                           authCtrl.deleteMe)

export default router
