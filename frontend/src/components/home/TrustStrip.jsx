import { useTranslation } from 'react-i18next'
import Icon from '../Icon'

export default function TrustStrip() {
  const { t } = useTranslation()

  const items = [
  ['cap', t('trustStrip.integratedPreparation'), t('trustStrip.puBoardsKcetJeeNeet')],
  ['medal', t('trustStrip.expertFaculty'), t('trustStrip.subjectSpecialistsMentors')],
  ['book', t('trustStrip.regularAssessment'), t('trustStrip.descriptiveOmrTestPractice')],
  ['chart', t('trustStrip.mentoringUpdates'), t('trustStrip.academicFeedbackForParents')],
]
  return <div className="border-y border-brand-border bg-white"><div className="page-container grid grid-cols-2 gap-6 py-6 lg:grid-cols-4">{items.map(([icon, title, text]) => <div key={title} className="flex items-start gap-3"><span className="icon-tile shrink-0"><Icon name={icon} /></span><div><p className="text-xs font-bold text-brand-navy sm:text-sm">{title}</p><p className="mt-1 text-[11px] leading-relaxed text-brand-muted">{text}</p></div></div>)}</div></div>
}
