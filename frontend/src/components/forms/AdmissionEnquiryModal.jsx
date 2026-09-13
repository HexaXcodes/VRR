import Modal from '../Modal'
import LeadForm from './LeadForm'
export default function AdmissionEnquiryModal({ onClose }) {
  return <Modal title="Start Admission Enquiry" onClose={onClose}><p className="mb-5 text-sm text-brand-muted">Share a few details to begin your 2027–28 admissions conversation.</p><LeadForm mode="admission" /></Modal>
}
