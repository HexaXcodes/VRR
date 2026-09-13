import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import mongoSanitize from 'express-mongo-sanitize'
import mongoose from 'mongoose'
import { validateEnv } from './config/env.js'
import leadRoutes from './routes/leadRoutes.js'
import enquiryRoutes from './routes/enquiryRoutes.js'
import adminRoutes from './routes/adminRoutes.js'
import { login } from './controllers/authController.js'
import { loginValidators } from './middleware/validation.js'
import { ApiError, asyncHandler, errorHandler } from './utils/errors.js'
import { sendSuccess } from './utils/response.js'

export function createApp() {
  const origins = validateEnv()
  const app = express()
  app.disable('x-powered-by')
  app.set('trust proxy', Number(process.env.TRUST_PROXY || 0))
  app.use(helmet())
  app.use(cors({
    origin: (origin, done) => done(origin && !origins.includes(origin) ? new ApiError(403, 'Origin not allowed') : null, true),
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'], maxAge: 86400,
  }))
  app.use(express.json({ limit: '10kb' }))
  app.use(express.urlencoded({ limit: '10kb', extended: false }))
  app.use((req, res, next) => {
    if (mongoSanitize.has(req.body || {}) || mongoSanitize.has(req.query || {})) return next(new ApiError(400, 'Unsafe input keys'))
    next()
  })
  app.use(mongoSanitize())
  const limiter = limit => rateLimit({
    windowMs: 15 * 60 * 1000, limit, standardHeaders: 'draft-7', legacyHeaders: false,
    handler: (req, res) => res.status(429).json({ success: false, message: 'Too many requests; try again later', errors: [] }),
  })
  // One shared quota prevents bypassing limits through the legacy/convenience aliases.
  const leadLimit = limiter(10)
  app.use('/api/leads', leadLimit, leadRoutes)
  app.use('/api/enquiry', leadLimit, enquiryRoutes)
  app.use('/api/admin', (req, res, next) => { res.set('Cache-Control', 'no-store'); next() })
  app.post('/api/admin/auth/login', limiter(5), ...loginValidators, asyncHandler(login))
  app.use('/api/admin', adminRoutes)
  app.get('/api/health', (req, res) => sendSuccess(res, { status: mongoose.connection.readyState === 1 ? 'ready' : 'unavailable' }, 'Health', mongoose.connection.readyState === 1 ? 200 : 503))
  app.get('/api/status', (req, res) => sendSuccess(res, { status: 'OK', service: 'VRR Academy API', version: '2.0.0' }))
  app.use((req, res, next) => next(new ApiError(404, 'Route not found')))
  app.use(errorHandler)
  return app
}
