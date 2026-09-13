import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import { ApiError, asyncHandler } from '../utils/errors.js'

export const authenticate = asyncHandler(async (req, res, next) => {
  const match = req.get('Authorization')?.match(/^Bearer ([^\s]+)$/i)
  if (!match) throw new ApiError(401, 'Authentication required')
  let payload
  try { payload = jwt.verify(match[1], process.env.JWT_SECRET, { algorithms: ['HS256'], issuer: 'vrr-academy', audience: 'vrr-admin' }) }
  catch { throw new ApiError(401, 'Invalid or expired token') }
  if (typeof payload.sub !== 'string' || !/^[a-f\d]{24}$/i.test(payload.sub)) throw new ApiError(401, 'Invalid or expired token')
  const user = await User.findById(payload.sub)
  if (!user?.isActive) throw new ApiError(401, 'Invalid or expired token')
  if (payload.passwordVersion !== user.updatedAt.getTime()) throw new ApiError(401, 'Invalid or expired token')
  req.user = user
  next()
})
export const adminOnly = (req, res, next) => {
  if (req.user.role !== 'admin') return next(new ApiError(403, 'Admin role required'))
  next()
}
