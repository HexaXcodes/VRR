import { useTranslation } from 'react-i18next'
import VisualJourney from './VisualJourney'



export default function StudentSupport() {
  const { t } = useTranslation()

  const steps = [
  { title: t('learnerSupport.understand'), copy: t('learnerSupport.identifyTheStudentSCurrentAcademic') },
  { title: t('learnerSupport.identify'), copy: t('learnerSupport.useAssessmentsClassroomInteractionAndDoubt') },
  { title: t('learnerSupport.support'), copy: t('learnerSupport.provideFocusedExplanationPracticeDoubtClearing') },
  { title: t('learnerSupport.progress'), copy: t('learnerSupport.reviewPerformanceOverTimeAndAdjust') },
]
  return <section id="why-student-support" tabIndex={-1} aria-labelledby="student-support-heading" className="student-support-section section-space">
    <div className="page-container">
      <div className="journey-heading">
        <h2 id="student-support-heading" className="section-heading">{t('learnerSupport.howVrrSupports')}<br />{t('learnerSupport.eachLearner')}</h2>
        <p>{t('learnerSupport.regularAssessmentAndFacultyInteractionHelp')}</p>
      </div>
      <VisualJourney variant="student-support" steps={steps} />
    </div>
  </section>
}
