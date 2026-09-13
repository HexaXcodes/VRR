export class ApiError extends Error {
  constructor(statusCode, message) { super(message); this.statusCode = statusCode }
}
export const asyncHandler = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)

export function errorHandler(err, req, res, next) {
  if (res.headersSent) return next(err)
  let status = err.statusCode || err.status || 500
  let message = err.message
  if (err.name === 'ValidationError' || err.name === 'CastError') { status = 400; message = 'Invalid input' }
  if (err.code === 11000) { status = 409; message = 'Record already exists' }
  if (err.name === 'VersionError') { status = 409; message = 'Lead changed; reload and retry' }
  if (err.type === 'entity.parse.failed') { status = 400; message = 'Invalid JSON body' }
  if (status >= 500) { console.error('API request failed', { name: err.name }); message = 'Internal server error' }
  res.status(status).json({ success: false, message, errors: [] })
}
