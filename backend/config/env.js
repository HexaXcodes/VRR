import jwt from 'jsonwebtoken'

export function validateEnv() {
  try {
    return readEnv()
  } catch (error) {
    error.code = 'INVALID_ENV'
    throw error
  }
}

function readEnv() {
  if (!process.env.JWT_SECRET || Buffer.byteLength(process.env.JWT_SECRET) < 32) throw new Error('JWT_SECRET must contain at least 32 bytes')
  const expiry = process.env.JWT_EXPIRES_IN || '8h'
  if (!/^\d+(s|m|h|d)$/.test(expiry)) throw new Error('JWT_EXPIRES_IN must be a positive duration such as 8h')
  const token = jwt.decode(jwt.sign({}, process.env.JWT_SECRET, { expiresIn: expiry }))
  if (token.exp <= token.iat) throw new Error('JWT_EXPIRES_IN must be positive')
  if (process.env.NODE_ENV === 'production') {
    for (const key of ['MONGODB_URI', 'FRONTEND_URL']) if (!process.env[key]) throw new Error(`${key} is required in production`)
  }
  const origins = (process.env.FRONTEND_URL || 'http://localhost:5173').split(',').map(v => v.trim())
  for (const origin of origins) {
    const url = new URL(origin)
    if (!['http:', 'https:'].includes(url.protocol) || url.origin !== origin) throw new Error('FRONTEND_URL must contain comma-separated origins without paths')
  }
  if (process.env.TRUST_PROXY && !/^\d+$/.test(process.env.TRUST_PROXY)) throw new Error('TRUST_PROXY must be a non-negative hop count')
  return origins
}
