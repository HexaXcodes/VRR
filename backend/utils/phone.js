export function normalizePhone(value) {
  if (typeof value !== 'string') return value
  const compact = value.replace(/[\s()-]/g, '')
  const match = compact.match(/^(?:\+91|91)?([6-9]\d{9})$/)
  return match ? `+91${match[1]}` : compact
}
