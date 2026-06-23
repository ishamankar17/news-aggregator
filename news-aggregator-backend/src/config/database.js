import mongoose from 'mongoose'
import logger from '../utils/logger.js'

const MONGO_OPTIONS = {
  serverSelectionTimeoutMS: 10_000,
  socketTimeoutMS: 45_000,
  maxPoolSize: 10,
  minPoolSize: 2,
  retryWrites: true,
  w: 'majority',
}

export async function connectDB() {
  const uri = process.env.MONGODB_URI

  if (!uri) {
    logger.error('MONGODB_URI is not set in environment variables')
    process.exit(1)
  }

  mongoose.connection.on('connected', () =>
    logger.info(`MongoDB connected → ${mongoose.connection.host}`)
  )
  mongoose.connection.on('error', (err) =>
    logger.error(`MongoDB error: ${err.message}`)
  )
  mongoose.connection.on('disconnected', () =>
    logger.warn('MongoDB disconnected — attempting reconnect…')
  )

  try {
    await mongoose.connect(uri, MONGO_OPTIONS)
  } catch (err) {
    logger.error(`MongoDB initial connection failed: ${err.message}`)
    process.exit(1)
  }
}

export async function disconnectDB() {
  await mongoose.connection.close()
  logger.info('MongoDB connection closed')
}

export default mongoose
