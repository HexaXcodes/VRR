import { useTranslation } from 'react-i18next'
import Modal from '../Modal'
import LeadForm from './LeadForm'
export default function CounsellingModal({ onClose, initialStream }) {
  const { t } = useTranslation()

  return <Modal title={t('counsellingModal.talkToAnAcademicCounsellor')} onClose={onClose}><p className="mb-5 text-sm text-brand-muted">{t('counsellingModal.letSDiscussYourStreamChoices')}</p><LeadForm mode="counselling" initialStream={initialStream} /></Modal>
}
