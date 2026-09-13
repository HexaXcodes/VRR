import 'dotenv/config'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import connectDB from '../config/db.js'
import User from '../models/User.js'

try {
  const name = process.env.ADMIN_NAME?.trim()
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase()
  const password = process.env.ADMIN_PASSWORD
  if (!name || !email || !password || password.length < 12 || Buffer.byteLength(password) > 72) {
    throw new Error('Set ADMIN_NAME, ADMIN_EMAIL and ADMIN_PASSWORD (12+ characters, maximum 72 UTF-8 bytes)')
  }
  if (process.env.NODE_ENV === 'production' && !process.env.MONGODB_URI) throw new Error('MONGODB_URI is required')
  const passwordHash = await bcrypt.hash(password, 12)
  const candidate = new User({ name, email, passwordHash, role: 'admin', isActive: true })
  await candidate.validate()
  await connectDB()
  await User.init()
  // Explicit operator-run reset also invalidates older JWTs through updatedAt.
  const user = await User.findOneAndUpdate({ email }, { $set: { name, passwordHash, role: 'admin', isActive: true } }, { upsert: true, new: true, runValidators: true })
  console.log('Admin created or updated:', user.id)
} catch (error) {
  console.error(error.name === 'Error' ? error.message : 'Admin setup failed; check configuration and database connectivity')
  process.exitCode = 1
} finally { await mongoose.disconnect() }
