import Lead from '../models/Lead.js'
import User from '../models/User.js'
import { publicFields, updateFields } from '../config/leadFields.js'
import { ApiError } from '../utils/errors.js'

export async function createLead(input) {
  const values = Object.fromEntries(publicFields.filter(key => input[key] !== undefined).map(key => [key, input[key]]))
  const visit = values.requestType === 'campus_visit' || values.campusVisit !== undefined
  values.campusVisit = { ...values.campusVisit, requested: visit, status: visit ? 'requested' : 'not_requested' }
  const counselling = values.requestType === 'counselling'
  values.counselling = { requested: counselling, status: counselling ? 'requested' : 'not_requested' }
  values.activity = [{ type: 'created', message: 'Lead created' }]
  return Lead.create(values)
}

export async function findLead(id) {
  const lead = await Lead.findById(id)
  if (!lead) throw new ApiError(404, 'Lead not found')
  return lead
}

export async function updateLead(id, input, user) {
  const lead = await findLead(id)
  if (input.assignedCounsellor) {
    const assignee = await User.findOne({ _id: input.assignedCounsellor, role: 'counsellor', isActive: true })
    if (!assignee) throw new ApiError(400, 'Assignment requires an active counsellor')
  }
  const activity = message => lead.activity.push({ type: 'updated', message, performedBy: user._id })
  for (const key of updateFields) {
    if (input[key] === undefined) continue
    if (key === 'campusVisit' || key === 'counselling') {
      let changed = false
      for (const [field, value] of Object.entries(input[key])) {
        if (JSON.stringify(lead.get(`${key}.${field}`)) !== JSON.stringify(value)) {
          lead.set(`${key}.${field}`, value)
          changed = true
        }
      }
      if (changed) activity(`${key === 'campusVisit' ? 'Campus visit' : 'Counselling'} ${input[key].status || 'updated'}`)
      continue
    }
    const old = lead.get(key)
    if (String(old ?? '') === String(input[key] ?? '')) continue
    lead.set(key, input[key])
    const messages = {
      status: `Status changed from ${old} to ${input[key]}`,
      assignedCounsellor: input[key] ? 'Counsellor assigned' : 'Counsellor unassigned',
      followUpDate: input[key] ? 'Follow-up scheduled' : 'Follow-up cleared',
      preferredContactTime: 'Preferred contact time updated', message: 'Enquiry message updated',
    }
    activity(messages[key])
  }
  await lead.save()
  return lead.populate('assignedCounsellor', 'name email role')
}
