import NodeCache from 'node-cache'
import logger from './logger.js'

// stdTTL = 5 min default; checkperiod = cleanup every 60 s
const cache = new NodeCache({ stdTTL: 300, checkperiod: 60, useClones: false })

export const cacheGet = (key) => {
  const value = cache.get(key)
  if (value !== undefined) {
    logger.debug(`Cache HIT  → ${key}`)
    return value
  }
  logger.debug(`Cache MISS → ${key}`)
  return null
}

export const cacheSet = (key, value, ttl) => {
  cache.set(key, value, ttl)
  logger.debug(`Cache SET  → ${key} (ttl=${ttl}s)`)
}

export const cacheDel = (key) => {
  cache.del(key)
  logger.debug(`Cache DEL  → ${key}`)
}

export const cacheFlush = () => {
  cache.flushAll()
  logger.debug('Cache flushed')
}

export const cacheStats = () => cache.getStats()

/**
 * Wrap an async function with cache-aside pattern.
 * @param {string} key   - cache key
 * @param {number} ttl   - seconds
 * @param {Function} fn  - async factory
 */
export const withCache = async (key, ttl, fn) => {
  const cached = cacheGet(key)
  if (cached !== null) return cached
  const result = await fn()
  cacheSet(key, result, ttl)
  return result
}

export default cache
