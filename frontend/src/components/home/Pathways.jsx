import { useTranslation } from 'react-i18next'
import Icon from '../Icon'
import PathwayMotif from './PathwayMotif'

export default function Pathways({ onCounselling, onExplore }) {
  const { t } = useTranslation()

  const pathways = [
  { stream: 'PCMB', label: t('pathways.medicalEngineering'), subjects: t('pathways.physicsChemistryMathematicsBiology'), exams: ['NEET', 'KCET', 'JEE Main', 'PU Boards'] },
  { stream: 'PCMC', label: t('pathways.techComputing'), subjects: t('pathways.physicsChemistryMathematicsComputerScience'), exams: ['JEE Main', 'JEE Advanced', 'KCET', 'PU Boards'] },
  { stream: 'PCME', label: t('pathways.electronicsHardware'), subjects: t('pathways.physicsChemistryMathematicsElectronics'), exams: ['JEE Main', 'KCET', 'PU Boards'] },
]
  return <section id="pathways" className="pathways-section section-space"><div className="page-container">
    <p className="eyebrow">{t('pathways.academicStreams')}</p><h2 className="section-heading mt-3">{t('pathways.chooseYourPathway')}</h2><p className="mt-3 text-brand-muted">{t('pathways.structuredCombinationsDesignedForYourAcademic')}</p>
    <div className="pathway-panels mt-9">{pathways.map(item => <article key={item.stream} className="pathway-panel">
      <PathwayMotif stream={item.stream} />
      <div className="flex flex-wrap items-center justify-between gap-3"><span className="rounded bg-brand-gold-light px-2.5 py-1 text-xs font-bold text-brand-navy">{item.stream}</span><span className="text-[9px] font-bold uppercase tracking-wider text-brand-muted">{item.label}</span></div>
      <h3 className="mt-5 font-serif text-2xl font-bold leading-tight text-brand-navy">{item.subjects}</h3>
      <p className="mt-4 text-sm leading-relaxed text-brand-muted">{t('pathways.buildAStrongFoundationThroughBoard')}</p>
      <div className="mt-6 border-t border-brand-border pt-5"><p className="text-[10px] font-bold uppercase tracking-wider text-brand-muted">{t('pathways.targetExaminations')}</p><div className="mt-3 flex flex-wrap gap-2">{item.exams.map(exam => <span key={exam === 'PU Boards' ? t('common.boards') : exam} className="rounded border border-brand-border bg-white px-2 py-1 text-[11px] font-semibold text-brand-navy">{exam}</span>)}</div></div>
      <button type="button" onClick={() => onExplore(item.stream)} className="mt-7 flex items-center justify-between gap-3 border-t border-brand-border pt-5 text-left text-xs font-bold text-brand-navy hover:text-brand-gold-hover">{t('pathways.exploreCurriculum', { stream: item.stream })}<Icon name="arrow" className="h-4 w-4" /></button>
    </article>)}</div>
    <div className="mt-7 flex flex-col items-start justify-between gap-4 rounded-xl border border-brand-border bg-brand-neutral p-5 sm:flex-row sm:items-center"><p className="flex items-center gap-3 text-sm font-medium text-brand-navy"><Icon name="chat" className="h-5 w-5 shrink-0 text-brand-gold" />{t('pathways.notSureWhichCombinationFitsYour')}</p><button type="button" onClick={() => onCounselling()} className="btn-navy text-xs">{t('pathways.talkToAnAcademicCounsellor')}<Icon name="arrow" className="h-4 w-4" /></button></div>
  </div></section>
}
