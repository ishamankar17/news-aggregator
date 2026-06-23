import winston from 'winston'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const logsDir = path.join(__dirname, '../../logs')

const { combine, timestamp, colorize, printf, json, errors } = winston.format

const devFormat = combine(
  colorize(),
  timestamp({ format: 'HH:mm:ss' }),
  errors({ stack: true }),
  printf(({ level, message, timestamp, stack }) =>
    stack
      ? `${timestamp} [${level}] ${message}\n${stack}`
      : `${timestamp} [${level}] ${message}`
  )
)

const prodFormat = combine(timestamp(), errors({ stack: true }), json())

const logger = winston.createLogger({
  level: process.env.NODE_ENV === 'production' ? 'warn' : 'debug',
  format: process.env.NODE_ENV === 'production' ? prodFormat : devFormat,
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: path.join(logsDir, 'error.log'),
      level: 'error',
      maxsize: 5_242_880, // 5 MB
      maxFiles: 3,
    }),
    new winston.transports.File({
      filename: path.join(logsDir, 'combined.log'),
      maxsize: 5_242_880,
      maxFiles: 5,
    }),
  ],
})

export default logger
