import { useTranslation } from 'react-i18next'
import Icon from '../Icon'

export default function WhyVRR() {
  const { t } = useTranslation()

  const items = [
  ['book', t('whyVrr.integratedPreparation'), t('whyVrr.puBoardLearningAndCompetitiveExam')],
  ['people', t('whyVrr.expertFaculty'), t('whyVrr.subjectSpecialistsWhoSimplifyConceptsClear')],
  ['chart', t('whyVrr.testingMentoring'), t('whyVrr.chapterWiseAssessmentsOmrPracticeAnd')],
  ['people', t('whyVrr.studentCentredLearning'), t('whyVrr.weIdentifyStrengthsWeakerAreasAnd')],
]
  return <section className="why-section section-space"><div className="page-container why-layout">
    <div className="why-intro"><p className="eyebrow">{t('whyVrr.theVrrDifference')}</p><div className="why-display" aria-hidden="true">{t('whyVrr.why')}<br /><span>{t('whyVrr.vrr')}</span></div><h2 className="section-heading mt-3">{t('whyVrr.whyStudentsChooseVrr')}</h2><p className="mt-5 leading-relaxed text-brand-muted">{t('whyVrr.everyStudentLearnsDifferentlyVrrCombines')}</p><blockquote className="why-statement">{t('whyVrr.notEveryStudentNeedsTheSame')}<span>{t('whyVrr.theyNeedTheRightPace')}</span></blockquote><a href="#why-student-support" className="editorial-link why-support-link mt-7">{t('whyVrr.howVrrSupportsEachLearner')}<Icon name="arrow" /></a></div>
    <div className="why-panels">{items.map(([icon, title, text], index) => <article key={title} tabIndex={0} aria-labelledby={`why-feature-title-${index + 1}`} className={`why-panel why-panel-${index + 1}`}><span className="why-number" aria-hidden="true">0{index + 1}</span><Icon name={icon} /><h3 id={`why-feature-title-${index + 1}`}>{title}</h3><p>{text}</p></article>)}</div>
  </div></section>
}
