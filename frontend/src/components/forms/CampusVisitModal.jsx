import Modal from '../Modal'
import LeadForm from './LeadForm'
export default function CampusVisitModal({ onClose, preferredCampus }) {
  return <Modal title="Book a Campus Visit" onClose={onClose}><p className="mb-5 text-sm text-brand-muted">Come explore the learning environment and discuss your questions with our team.</p><LeadForm mode="visit" preferredCampus={preferredCampus} /></Modal>
}
