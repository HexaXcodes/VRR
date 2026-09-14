import { useTranslation } from 'react-i18next'
import VisualJourney from './VisualJourney'

export default function LearningSystem() {
  const { t } = useTranslation()

  const steps = [
  [t('learningSystem.concept'), t('learningSystem.boardAlignedTeachingWithCompetitiveExam'), 'book'],
  [t('learningSystem.practice'), t('learningSystem.solvedExamplesWorksheetsAndApplicationProblems'), 'cap'],
  [t('learningSystem.test'), t('learningSystem.puAssessmentsMcqsAndOmrPractice'), 'check'],
  [t('learningSystem.analyse'), t('learningSystem.identifyAccuracySpeedAndWeakerTopics'), 'chart'],
  [t('learningSystem.improve'), t('learningSystem.doubtClearingRevisionAndExamStrategy'), 'medal'],
]
  return <section id="learning-system" className="learning-section section-space"><div className="page-container">
    <div className="journey-heading"><div><p className="eyebrow">{t('learningSystem.provenMethodology')}</p><h2 className="section-heading mt-3">{t('learningSystem.aSimpleSystem')}<br />{t('learningSystem.consistentImprovement')}</h2></div><p className="text-sm text-brand-muted">{t('learningSystem.aDisciplinedFiveStageLearningCycle')}</p></div>
    <VisualJourney steps={steps.map(([title, copy]) => ({ title, copy }))} />
  </div></section>
}
