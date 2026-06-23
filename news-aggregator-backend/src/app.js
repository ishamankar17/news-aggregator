import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'
import morgan from 'morgan'
import mongoSanitize from 'express-mongo-sanitize'

import routes from './routes/index.js'
import { apiLimiter } from './middleware/rateLimiter.js'
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js'
import logger from './utils/logger.js'

const app = express()

// ── Security ─────────────────────────────────────────────────────────────────
app.use(helmet())
app.use(mongoSanitize())        // strip $ and . from req.body/params/query

// ── CORS ─────────────────────────────────────────────────────────────────────
const allowedOrigins = (process.env.CORS_ORIGINS || 'http://localhost:5173')
  .split(',')
  .map((o) => o.trim())

app.use(
  cors({
    origin(origin, callback) {
      // allow requests with no origin (curl, Postman, mobile apps)
      if (!origin || allowedOrigins.includes(origin)) return callback(null, true)
      callback(new Error(`CORS: origin "${origin}" not allowed`))
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
)

// ── Compression & parsing ─────────────────────────────────────────────────────
app.use(compression())
app.use(express.json({ limit: '10kb' }))
app.use(express.urlencoded({ extended: false, limit: '10kb' }))

// ── Request logging ──────────────────────────────────────────────────────────
if (process.env.NODE_ENV !== 'test') {
  app.use(
    morgan('combined', {
      stream: { write: (msg) => logger.http(msg.trim()) },
      skip: (req) => req.url === '/api/health',
    })
  )
}

// ── Rate limiting ─────────────────────────────────────────────────────────────
app.use('/api', apiLimiter)

// ── Routes ────────────────────────────────────────────────────────────────────
app.use('/api', routes)

// ── 404 & global error handler ────────────────────────────────────────────────
app.use(notFoundHandler)
app.use(errorHandler)

export default app
