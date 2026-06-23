import axios from 'axios'
import logger from '../utils/logger.js'

const newsApiClient = axios.create({
  baseURL: process.env.NEWS_API_BASE_URL || 'https://newsapi.org/v2',
  timeout: 12_000,
  headers: { 'X-Api-Key': process.env.NEWS_API_KEY },
})

// Log outgoing requests in dev
newsApiClient.interceptors.request.use((config) => {
  logger.debug(`NewsAPI → ${config.method?.toUpperCase()} ${config.url}`)
  return config
})

// Normalise errors from NewsAPI
newsApiClient.interceptors.response.use(
  (res) => res,
  (err) => {
    const status  = err.response?.status
    const apiMsg  = err.response?.data?.message
    const timeout = err.code === 'ECONNABORTED'

    const message = timeout
      ? 'NewsAPI request timed out'
      : apiMsg || `NewsAPI error (HTTP ${status ?? 'unknown'})`

    logger.error(`NewsAPI error: ${message}`)
    return Promise.reject(Object.assign(new Error(message), { status }))
  }
)

export default newsApiClient
