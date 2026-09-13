export const enums = {
  currentClass: ['9', '10', '11', '12', 'other'],
  board: ['CBSE', 'ICSE', 'State', 'IGCSE', 'Other', 'Unknown'],
  interestedStream: ['PCMB', 'PCMC', 'PCME', 'Undecided'],
  targetExam: ['NEET', 'JEE', 'KCET', 'Boards', 'Multiple', 'Undecided'],
  requestType: ['general_enquiry', 'fee_structure', 'campus_visit', 'counselling', 'admission'],
  leadSource: ['website', 'whatsapp', 'instagram', 'google', 'referral', 'walk_in', 'other'],
  preferredCampus: ['VRR Academy', 'Shanthi Niketan', 'No Preference'],
  status: ['new', 'contacted', 'counselling_scheduled', 'campus_visit_scheduled', 'application_started', 'admitted', 'lost'],
}
export const appointmentStatuses = ['not_requested', 'requested', 'scheduled', 'completed', 'cancelled']
export const publicFields = ['studentName', 'parentName', 'phone', 'whatsapp', 'email', 'currentClass', 'board', 'school', 'interestedStream', 'targetExam', 'requestType', 'leadSource', 'preferredCampus', 'preferredContactTime', 'message', 'campusVisit']
export const updateFields = ['status', 'assignedCounsellor', 'followUpDate', 'campusVisit', 'counselling', 'preferredContactTime', 'message']
