import Lead from '../models/Lead.js'
import { enums } from '../config/leadFields.js'
import { sendSuccess } from '../utils/response.js'

// Admission reporting uses Bengaluru time (UTC+05:30), weeks start Monday.
export function reportingBoundaries(now = new Date()) {
  const offset = 330 * 60000
  const local = new Date(now.getTime() + offset)
  const midnight = Date.UTC(local.getUTCFullYear(), local.getUTCMonth(), local.getUTCDate())
  const today = new Date(midnight - offset)
  const thisWeek = new Date(midnight - ((local.getUTCDay() + 6) % 7) * 86400000 - offset)
  const thisMonth = new Date(Date.UTC(local.getUTCFullYear(), local.getUTCMonth(), 1) - offset)
  return { today, thisWeek, thisMonth }
}
export async function dashboard(req, res) {
  const now = new Date()
  const boundaries = reportingBoundaries(now)
  const group = field => [{ $group: { _id: `$${field}`, count: { $sum: 1 } } }]
  const [result] = await Lead.aggregate([{ $facet: {
    totals: [{ $group: { _id: null, total: { $sum: 1 },
      ...Object.fromEntries(Object.entries(boundaries).map(([key, date]) => [key, { $sum: { $cond: [{ $and: [{ $gte: ['$createdAt', date] }, { $lte: ['$createdAt', now] }] }, 1, 0] } }])),
    } }],
    status: group('status'), stream: group('interestedStream'), exam: group('targetExam'), source: group('leadSource'),
  } }])
  const counts = (rows, keys) => Object.fromEntries(keys.map(key => [key, rows.find(row => row._id === key)?.count || 0]))
  const statuses = counts(result.status, enums.status)
  const totals = result.totals[0] || {}
  const recentLeads = await Lead.find().select('studentName phone interestedStream targetExam requestType status createdAt').sort({ createdAt: -1, _id: -1 }).limit(5).lean()
  sendSuccess(res, {
    totalLeads: totals.total || 0, newLeads: statuses.new, contacted: statuses.contacted,
    counsellingScheduled: statuses.counselling_scheduled, campusVisits: statuses.campus_visit_scheduled,
    applicationsStarted: statuses.application_started, admitted: statuses.admitted, lost: statuses.lost,
    today: totals.today || 0, thisWeek: totals.thisWeek || 0, thisMonth: totals.thisMonth || 0,
    byStream: counts(result.stream, enums.interestedStream), byTargetExam: counts(result.exam, enums.targetExam),
    bySource: counts(result.source, enums.leadSource), recentLeads,
  })
}
