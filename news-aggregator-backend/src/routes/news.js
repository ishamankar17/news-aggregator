import { Router } from 'express'
import * as newsCtrl from '../controllers/newsController.js'
import { optionalAuth } from '../middleware/auth.js'
import { newsLimiter } from '../middleware/rateLimiter.js'

const router = Router()

// All news routes get optional auth (for tracking search history)
// and a stricter rate limit
router.use(newsLimiter)
router.use(optionalAuth)

router.get('/headlines',          newsCtrl.getHeadlines)
router.get('/search',             newsCtrl.searchNews)
router.get('/category/:category', newsCtrl.getByCategory)
router.get('/sources',            newsCtrl.getSources)
router.get('/cache-stats',        newsCtrl.getCacheStats)

export default router
