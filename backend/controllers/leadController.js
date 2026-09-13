import Lead from '../models/Lead.js'
import { createLead, findLead, updateLead } from '../services/leadService.js'
import { sendSuccess } from '../utils/response.js'
import { ApiError } from '../utils/errors.js'

export async function submitLead(req, res) {
  const lead = await createLead(req.body)
  sendSuccess(res, { _id: lead.id, studentName: lead.studentName, requestType: lead.requestType, createdAt: lead.createdAt }, 'Enquiry submitted successfully', 201)
}
export async function listLeads(req, res) {
  const { page = 1, limit = 20, from, to, search } = req.query
  const filter = {}
  for (const key of ['status', 'interestedStream', 'targetExam', 'requestType', 'leadSource', 'assignedCounsellor']) {
    if (req.query[key] !== undefined) filter[key] = req.query[key]
  }
  if (from || to) {
    filter.createdAt = {}
    if (from) filter.createdAt.$gte = new Date(from)
    if (to) {
      const end = new Date(to)
      if (/^\d{4}-\d{2}-\d{2}$/.test(to)) end.setUTCHours(23, 59, 59, 999)
      filter.createdAt.$lte = end
    }
  }
  if (search) {
    const escaped = search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    filter.$or = ['studentName', 'parentName', 'phone', 'email', 'school'].map(key => ({ [key]: { $regex: escaped, $options: 'i' } }))
  }
  const [items, total] = await Promise.all([
    Lead.find(filter).select('-notes -activity').populate('assignedCounsellor', 'name email role')
      .sort({ createdAt: -1, _id: -1 }).skip((page - 1) * limit).limit(limit).lean(),
    Lead.countDocuments(filter),
  ])
  sendSuccess(res, { items, pagination: { page, limit, total, pages: Math.ceil(total / limit) } })
}
export async function getLead(req, res) {
  const lead = await findLead(req.params.id)
  await lead.populate([
    { path: 'assignedCounsellor', select: 'name email role' },
    { path: 'notes.createdBy', select: 'name email role' },
    { path: 'activity.performedBy', select: 'name email role' },
  ])
  sendSuccess(res, lead)
}
export async function patchLead(req, res) {
  sendSuccess(res, await updateLead(req.params.id, req.body, req.user), 'Lead updated')
}
export async function addNote(req, res) {
  const lead = await findLead(req.params.id)
  lead.notes.push({ text: req.body.text, createdBy: req.user._id })
  lead.activity.push({ type: 'note_added', message: 'Note added', performedBy: req.user._id })
  await lead.save()
  sendSuccess(res, lead.notes.at(-1), 'Note added', 201)
}
export async function deleteLead(req, res) {
  const lead = await Lead.findByIdAndDelete(req.params.id)
  if (!lead) throw new ApiError(404, 'Lead not found')
  sendSuccess(res, { _id: lead.id }, 'Lead deleted')
}
