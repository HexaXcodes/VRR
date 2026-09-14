import { useTranslation } from 'react-i18next'
import Modal from '../Modal'
import LeadForm from './LeadForm'
export default function AdmissionEnquiryModal({ onClose }) {
  const { t } = useTranslation()

  return <Modal title={t('admissionEnquiryModal.startAdmissionEnquiry')} onClose={onClose}><p className="mb-5 text-sm text-brand-muted">{t('admissionEnquiryModal.shareAFewDetailsToBegin')}</p><LeadForm mode="admission" /></Modal>
}
