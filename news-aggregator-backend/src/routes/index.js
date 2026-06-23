import { Router } from 'express'
import authRoutes          from './auth.js'
import newsRoutes          from './news.js'
import bookmarkRoutes      from './bookmarks.js'
import searchHistoryRoutes from './searchHistory.js'
import { sendSuccess }     from '../utils/response.js'

const router = Router()

// Health check
router.get('/health', (_req, res) =>
  sendSuccess(res, {
    status:  'ok',
    version: '1.0.0',
    uptime:  `${Math.floor(process.uptime())}s`,
    env:     process.env.NODE_ENV,
  }, 'Server is healthy')
)

router.use('/auth',           authRoutes)
router.use('/news',           newsRoutes)
router.use('/bookmarks',      bookmarkRoutes)
router.use('/search-history', searchHistoryRoutes)

export default router
