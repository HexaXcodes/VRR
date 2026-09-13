import Modal from '../Modal'
import LeadForm from './LeadForm'
export default function CounsellingModal({ onClose, initialStream }) {
  return <Modal title="Talk to an Academic Counsellor" onClose={onClose}><p className="mb-5 text-sm text-brand-muted">Let’s discuss your stream choices and academic goals.</p><LeadForm mode="counselling" initialStream={initialStream} /></Modal>
}
