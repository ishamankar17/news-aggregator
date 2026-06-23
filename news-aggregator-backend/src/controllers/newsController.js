import * as newsService from '../services/newsService.js'
import SearchHistory from '../models/SearchHistory.js'
import { sendSuccess, sendError } from '../utils/response.js'
import { cacheStats } from '../utils/cache.js'
import logger from '../utils/logger.js'

// ── GET /api/news/headlines ───────────────────────────────────────────────────
export async function getHeadlines(req, res, next) {
  try {
    const {
      category = 'general',
      page     = 1,
      pageSize = 20,
      country  = 'us',
    } = req.query

    const result = await newsService.getTopHeadlines({
      category,
      page:     parseInt(page, 10),
      pageSize: Math.min(parseInt(pageSize, 10), 100),
      country,
    })

    return sendSuccess(res, result, 'Headlines fetched', 200, {
      category,
      page: parseInt(page, 10),
      pageSize: parseInt(pageSize, 10),
    })
  } catch (err) {
    next(err)
  }
}

// ── GET /api/news/search ──────────────────────────────────────────────────────
export async function searchNews(req, res, next) {
  try {
    const {
      q: query,
      page     = 1,
      pageSize = 20,
      sortBy   = 'publishedAt',
      language = 'en',
    } = req.query

    if (!query?.trim()) return sendError(res, 'Query parameter "q" is required', 400)

    const result = await newsService.searchArticles({
      query: query.trim(),
      page:  parseInt(page, 10),
      pageSize: Math.min(parseInt(pageSize, 10), 100),
      sortBy,
      language,
    })

    // Persist search history for authenticated users (fire-and-forget)
    if (req.user) {
      SearchHistory.create({
        user:        req.user._id,
        query:       query.trim(),
        resultCount: result.totalResults,
      }).catch((e) => logger.error(`SearchHistory save error: ${e.message}`))
    }

    return sendSuccess(res, result, 'Search results fetched', 200, {
      query: query.trim(),
      page: parseInt(page, 10),
      pageSize: parseInt(pageSize, 10),
      sortBy,
    })
  } catch (err) {
    next(err)
  }
}

// ── GET /api/news/category/:category ─────────────────────────────────────────
export async function getByCategory(req, res, next) {
  try {
    const { category } = req.params
    const { page = 1, pageSize = 20 } = req.query

    const VALID = ['general','technology','business','health','sports','entertainment','science']
    if (!VALID.includes(category)) return sendError(res, `Invalid category. Choose from: ${VALID.join(', ')}`, 400)

    const result = await newsService.getByCategory({
      category,
      page:     parseInt(page, 10),
      pageSize: Math.min(parseInt(pageSize, 10), 100),
    })

    return sendSuccess(res, result, `${category} news fetched`, 200, {
      category,
      page: parseInt(page, 10),
      pageSize: parseInt(pageSize, 10),
    })
  } catch (err) {
    next(err)
  }
}

// ── GET /api/news/sources ─────────────────────────────────────────────────────
export async function getSources(req, res, next) {
  try {
    const { category, language = 'en', country } = req.query
    const sources = await newsService.getSources({ category, language, country })
    return sendSuccess(res, { sources }, 'Sources fetched')
  } catch (err) {
    next(err)
  }
}

// ── GET /api/news/cache-stats (admin / debug) ─────────────────────────────────
export function getCacheStats(_req, res) {
  return sendSuccess(res, cacheStats(), 'Cache statistics')
}
