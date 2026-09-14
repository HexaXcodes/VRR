import { useTranslation } from 'react-i18next'
import Icon from '../Icon'

export default function FAQSection() {
  const { t } = useTranslation()

  const questions = [
  [t('faq.isVrrAPuCollegeOr'), t('faq.vrrCareerAcademyOffersIntegratedAcademic')],
  [t('faq.whichCombinationsAreOffered'), t('faq.pcmbPhysicsChemistryMathematicsBiologyPcmc')],
  [t('faq.isKcetJeeNeetPreparationIntegrated'), t('faq.theIntegratedProgrammeCombinesPuBoards')],
  [t('faq.howOftenAreTestsConducted'), t('faq.testingIncludesChapterWiseAssessmentsMcqs')],
  [t('faq.canParentsReceiveProgressUpdates'), t('faq.parentCommunicationAndAcademicProgressDiscussions')],
  [t('faq.whenAreClassesConducted'), t('faq.pleaseContactTheAdmissionsTeamFor')],
  [t('faq.howCanIGetTheFee'), t('faq.submitTheFeeEnquiryFormOn')],
  [t('faq.canIBookACampusVisit'), t('faq.yesUseBookCampusVisitTo')],
]
  return <section id="faq" className="page-container section-space"><div className="mx-auto max-w-4xl"><div className="text-center"><p className="eyebrow">{t('faq.clearAnswers')}</p><h2 className="section-heading mt-3">{t('faq.frequentlyAskedQuestions')}</h2><p className="mt-3 text-sm text-brand-muted">{t('faq.keyFactsAboutVrrCareerAcademy')}</p></div><div className="mt-9 space-y-3">{questions.map(([question, answer], index) => <details key={index} className="group rounded-2xl border border-brand-border bg-brand-neutral p-5"><summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-bold text-brand-navy">{question}<Icon name="chevron" className="h-4 w-4 shrink-0 transition-transform group-open:rotate-180" /></summary><p className="mt-4 text-sm leading-relaxed text-brand-muted">{answer}</p></details>)}</div></div></section>
}
