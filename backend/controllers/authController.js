import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { randomBytes } from 'node:crypto'
import User from '../models/User.js'
import { ApiError } from '../utils/errors.js'
import { sendSuccess } from '../utils/response.js'

// Equal-cost password comparison also when the account does not exist.
const dummyHash = bcrypt.hashSync(randomBytes(32).toString('hex'), 12)
export async function login(req, res) {
  const user = await User.findOne({ email: req.body.email }).select('+passwordHash')
  const valid = await bcrypt.compare(req.body.password, user?.passwordHash || dummyHash)
  if (!valid || !user?.isActive) throw new ApiError(401, 'Invalid email or password')
  // lastLogin should not invalidate existing sessions.
  await User.updateOne({ _id: user._id }, { $set: { lastLogin: new Date() } }, { timestamps: false })
  const token = jwt.sign({ passwordVersion: user.updatedAt.getTime() }, process.env.JWT_SECRET, {
    subject: user.id, expiresIn: process.env.JWT_EXPIRES_IN || '8h',
    algorithm: 'HS256', issuer: 'vrr-academy', audience: 'vrr-admin',
  })
  sendSuccess(res, { token, user: { _id: user.id, name: user.name, email: user.email, role: user.role } }, 'Login successful')
}
