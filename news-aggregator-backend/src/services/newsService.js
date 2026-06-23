import newsApiClient from '../config/newsApi.js'
import { withCache } from '../utils/cache.js'
import logger from '../utils/logger.js'

const TTL_HEADLINES = parseInt(process.env.CACHE_TTL_HEADLINES || '300', 10)
const TTL_SEARCH    = parseInt(process.env.CACHE_TTL_SEARCH    || '180', 10)
const TTL_SOURCES   = parseInt(process.env.CACHE_TTL_SOURCES   || '3600', 10)

/** Strip removed/null articles */
function cleanArticles(articles = []) {
  return articles.filter(
    (a) => a.title && a.title !== '[Removed]' && a.url && a.url !== 'https://removed.com'
  )
}

/**
 * GET /top-headlines
 */
export async function getTopHeadlines({ category = 'general', pageSize = 20, page = 1, country = 'us' } = {}) {
  const cacheKey = `headlines:${category}:${country}:${page}:${pageSize}`

  return withCache(cacheKey, TTL_HEADLINES, async () => {
    logger.info(`Fetching top-headlines [category=${category}, page=${page}]`)
    const { data } = await newsApiClient.get('/top-headlines', {
      params: { category, pageSize, page, country, language: 'en' },
    })
    return {
      totalResults: data.totalResults || 0,
      articles: cleanArticles(data.articles),
    }
  })
}

/**
 * GET /everything  — keyword search
 */
export async function searchArticles({ query, pageSize = 20, page = 1, sortBy = 'publishedAt', language = 'en' } = {}) {
  const cacheKey = `search:${query}:${sortBy}:${page}:${pageSize}:${language}`

  return withCache(cacheKey, TTL_SEARCH, async () => {
    logger.info(`Searching articles [q="${query}", sortBy=${sortBy}, page=${page}]`)
    const { data } = await newsApiClient.get('/everything', {
      params: { q: query, pageSize, page, sortBy, language },
    })
    return {
      totalResults: data.totalResults || 0,
      articles: cleanArticles(data.articles),
    }
  })
}

/**
 * GET /sources
 */
export async function getSources({ category, language = 'en', country } = {}) {
  const cacheKey = `sources:${category ?? 'all'}:${language}:${country ?? 'all'}`

  return withCache(cacheKey, TTL_SOURCES, async () => {
    logger.info(`Fetching sources [category=${category}]`)
    const params = { language }
    if (category) params.category = category
    if (country)  params.country  = country
    const { data } = await newsApiClient.get('/sources', { params })
    return data.sources || []
  })
}

/**
 * GET /top-headlines by category (alias with explicit country param)
 */
export async function getByCategory({ category, pageSize = 20, page = 1 } = {}) {
  return getTopHeadlines({ category, pageSize, page, country: 'us' })
}
