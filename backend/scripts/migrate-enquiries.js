import 'dotenv/config'
import mongoose from 'mongoose'
import connectDB from '../config/db.js'
import { migrateEnquiries } from '../services/migrationService.js'

try {
  if (process.env.NODE_ENV === 'production' && !process.env.MONGODB_URI) throw new Error('MONGODB_URI is required')
  await connectDB()
  const summary = await migrateEnquiries()
  console.log('Migration summary:', summary)
  if (summary.failed) process.exitCode = 1
} catch (error) {
  console.error('Migration failed:', error.name)
  process.exitCode = 1
} finally { await mongoose.disconnect() }
