import Enquiry from '../models/Enquiry.js'
import Lead from '../models/Lead.js'
import { mapLegacy } from '../middleware/legacyEnquiry.js'
import { normalizePhone } from '../utils/phone.js'

export async function migrateEnquiries(report = console.log) {
  await Lead.init()
  // Ensure the idempotency constraint also exists when production disables autoIndex.
  await Lead.collection.createIndex({ legacyEnquiryId: 1 }, { unique: true, sparse: true })
  const summary = { scanned: 0, migrated: 0, skipped: 0, failed: 0 }
  for await (const enquiry of Enquiry.find().lean().cursor()) {
    summary.scanned++
    if (await Lead.exists({ legacyEnquiryId: enquiry._id })) { summary.skipped++; continue }
    try {
      const mapped = mapLegacy(enquiry)
      const lead = new Lead({
        studentName: mapped.studentName, phone: normalizePhone(enquiry.phone),
        currentClass: mapped.currentClass, targetExam: mapped.targetExam,
        message: enquiry.message, board: enquiry.board || 'Unknown',
        interestedStream: mapped.interestedStream || 'Undecided',
        status: ({ new: 'new', contacted: 'contacted', enrolled: 'admitted', rejected: 'lost' })[enquiry.status] || 'new',
        leadSource: 'website', requestType: 'general_enquiry', legacyEnquiryId: enquiry._id,
        createdAt: enquiry.createdAt, updatedAt: enquiry.updatedAt,
        activity: [{ type: 'migrated', message: 'Migrated from legacy enquiry' }],
      })
      await lead.save({ timestamps: false })
      summary.migrated++
    } catch (error) {
      if (error.code === 11000 && await Lead.exists({ legacyEnquiryId: enquiry._id })) summary.skipped++
      else { summary.failed++; report(`Enquiry ${enquiry._id} could not be migrated (${error.name}); original retained`) }
    }
  }
  return summary
}
