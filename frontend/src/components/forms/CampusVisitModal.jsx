import { useTranslation } from 'react-i18next'
import Modal from '../Modal'
import LeadForm from './LeadForm'
export default function CampusVisitModal({ onClose, preferredCampus }) {
  const { t } = useTranslation()

  return <Modal title={t('campusVisitModal.bookACampusVisit')} onClose={onClose}><p className="mb-5 text-sm text-brand-muted">{t('campusVisitModal.comeExploreTheLearningEnvironmentAnd')}</p><LeadForm mode="visit" preferredCampus={preferredCampus} /></Modal>
}
