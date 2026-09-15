import { useTranslation } from 'react-i18next'
import Icon from '../Icon'
import VisualJourney from './VisualJourney'

export default function AdmissionsProcess({ onAdmission }) {
  const { t } = useTranslation()

  const steps = [
  [t('admissionsProcess.submitEnquiry'), t('admissionsProcess.shareBasicStudentAndProgrammeDetails')],
  [t('admissionsProcess.academicCounselling'), t('admissionsProcess.discussStreamChoicesAndAcademicGoals')],
  [t('admissionsProcess.entranceDiagnosticAssessment'), t('admissionsProcess.assessmentAsApplicableDuringTheAdmission')],
  [t('admissionsProcess.selectProgramme'), t('admissionsProcess.choosePcmbPcmcOrPcme')],
  [t('admissionsProcess.confirmAdmission'), t('admissionsProcess.completeTheRequiredAdmissionFormalities')],
]
  return <section id="admissions" className="admissions-section section-space"><div className="page-container"><div className="journey-heading"><div><p className="eyebrow">{t('admissionsProcess.stepByStepProcedure')}</p><h2 className="section-heading mt-3">{t('admissionsProcess.admissions202728')}</h2></div><p className="max-w-sm text-sm text-brand-muted">{t('admissionsProcess.aTransparentGuidedProcessForYour')}</p></div>
    <p className="mt-2 text-sm font-semibold text-brand-navy">{t('admissionsProcess.integratedProgramme')}</p>
    <VisualJourney variant="admissions" steps={steps.map(([title, copy], index) => ({ title, copy, label: [t('admissionsProcess.enquire'), t('admissionsProcess.counselling'), t('admissionsProcess.assessment'), t('admissionsProcess.select'), t('admissionsProcess.admission')][index] }))} />
    <div className="mt-8 text-center"><button type="button" onClick={onAdmission} className="btn-navy">{t('admissionsProcess.startAdmissionEnquiry')}<Icon name="arrow" /></button></div>
  </div></section>
}
