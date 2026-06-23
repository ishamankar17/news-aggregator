import 'dotenv/config'
import app from './app.js'
import { connectDB, disconnectDB } from './config/database.js'
import logger from './utils/logger.js'

const PORT = parseInt(process.env.PORT || '5000', 10)

async function start() {
  await connectDB()

  const server = app.listen(PORT, () => {
    logger.info(`🚀 NewsWire API running on http://localhost:${PORT}`)
    logger.info(`   Environment : ${process.env.NODE_ENV || 'development'}`)
    logger.info(`   API base    : http://localhost:${PORT}/api`)
  })

  // ── Graceful shutdown ──────────────────────────────────────────────────────
  const shutdown = async (signal) => {
    logger.info(`${signal} received — shutting down gracefully…`)
    server.close(async () => {
      await disconnectDB()
      logger.info('Server closed. Bye!')
      process.exit(0)
    })
    // Force exit after 10 s
    setTimeout(() => process.exit(1), 10_000)
  }

  process.on('SIGTERM', () => shutdown('SIGTERM'))
  process.on('SIGINT',  () => shutdown('SIGINT'))

  process.on('unhandledRejection', (reason) => {
    logger.error(`Unhandled rejection: ${reason}`)
    server.close(() => process.exit(1))
  })
}

start()
