// Temporary adapter for the existing Contact form and historical API clients.
// Remove after all clients use canonical Lead fields; migration uses the same mapping.
export function mapLegacy(value) {
  const result = { ...value }
  if (result.studentName === undefined) result.studentName = result.name
  if (result.currentClass === undefined && result.class !== undefined) result.currentClass = result.class
  if (result.targetExam === undefined && result.course !== undefined) result.targetExam = ['JEE', 'NEET'].includes(result.course) ? result.course : 'Undecided'
  if (result.interestedStream === undefined && ['PCMB', 'PCMC', 'PCME'].includes(result.course)) result.interestedStream = result.course
  return result
}
export const legacyEnquiry = (req, res, next) => { req.body = mapLegacy(req.body); next() }
