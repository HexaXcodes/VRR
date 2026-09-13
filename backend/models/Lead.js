import mongoose from 'mongoose'
import { enums, appointmentStatuses } from '../config/leadFields.js'
import { normalizePhone } from '../utils/phone.js'

const { Schema } = mongoose
const text = (max, extra = {}) => ({ type: String, trim: true, maxlength: max, ...extra })
const phone = { type: String, set: normalizePhone, match: /^\+91[6-9]\d{9}$/ }
const userRef = { type: Schema.Types.ObjectId, ref: 'User' }
const appointment = {
  requested: { type: Boolean, default: false },
  status: { type: String, enum: appointmentStatuses, default: 'not_requested' },
}
const defaults = { currentClass: 'other', board: 'Unknown', interestedStream: 'Undecided', targetExam: 'Undecided', requestType: 'general_enquiry', leadSource: 'website', preferredCampus: 'No Preference', status: 'new' }
const schema = new Schema({
  studentName: text(100, { required: true, minlength: 2 }),
  parentName: text(100), phone: { ...phone, required: true }, whatsapp: phone,
  email: text(254, { lowercase: true, match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ }),
  ...Object.fromEntries(Object.entries(enums).map(([key, values]) => [key, { type: String, enum: values, default: defaults[key] }])),
  school: text(150), preferredContactTime: text(150), message: text(1000),
  assignedCounsellor: userRef, followUpDate: Date,
  campusVisit: { ...appointment, preferredDate: Date, timeSlot: { type: String, enum: ['morning', 'afternoon', 'evening', null], default: null } },
  counselling: { ...appointment, scheduledAt: Date },
  notes: [{ text: text(2000, { required: true }), createdBy: { ...userRef, required: true }, createdAt: { type: Date, default: Date.now } }],
  activity: [{ type: text(50), message: text(500), performedBy: userRef, timestamp: { type: Date, default: Date.now } }],
  legacyEnquiryId: { type: Schema.Types.ObjectId, select: false },
}, { timestamps: true, optimisticConcurrency: true })

schema.index({ phone: 1 })
for (const field of ['status', 'interestedStream', 'targetExam', 'requestType', 'leadSource', 'assignedCounsellor']) schema.index({ [field]: 1, createdAt: -1 })
schema.index({ createdAt: -1 })
schema.index({ followUpDate: 1 }, { sparse: true })
schema.index({ legacyEnquiryId: 1 }, { unique: true, sparse: true })
export default mongoose.model('Lead', schema)
