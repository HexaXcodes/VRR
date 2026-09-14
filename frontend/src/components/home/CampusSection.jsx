import { useTranslation } from 'react-i18next'
import Icon from '../Icon'
import { site } from '../../config/site'
// Replace null photo fields only with approved images of the relevant location.

export default function CampusSection({ onVisit }) {
  const { t } = useTranslation()

  const gallery = [t('campusSection.classroom'), t('campusSection.physicsLab'), t('campusSection.chemistryLab'), t('campusSection.biologyLab'), t('campusSection.campus')].map(label => ({ label, photo: null }))
  const campuses = [
    { name: 'Shanthi Niketan PU College', description: t('campusSection.puAcademicCampusAssociatedWithThe'), map: site.collegeMapsUrl, value: 'Shanthi Niketan' },
    { name: 'VRR Career Academy', description: t('campusSection.integratedAcademicAndCompetitiveExamLearning'), map: site.mapsUrl, value: 'VRR Academy' },
  ]
  return <section id="campus" className="campus-section section-space"><div className="page-container relative">
    <p className="campus-watermark" aria-hidden="true">{t('campusSection.learnPracticeGrow')}</p>
    <p className="eyebrow">{t('campusSection.bengaluruCampus')}</p><h2 className="section-heading mt-3">{t('campusSection.exploreOurLearningEnvironment')}</h2><p className="mt-3 text-sm text-brand-muted">{t('campusSection.getToKnowTheCampusWith')}</p>
    <div className="campus-gallery mt-9">{gallery.map((item, index) => <figure key={item.label} className={`campus-photo campus-photo-${index + 1}`}>
      {item.photo ? <img src={item.photo} alt={item.label} loading="lazy" /> : <div className="campus-placeholder"><span className="campus-image-number" aria-hidden="true">0{index + 1}</span><Icon name="building" className="h-7 w-7 text-brand-gold" /><span className="text-[10px]">{t('campusSection.photoComingSoon')}</span></div>}
      <figcaption className="border-t border-brand-border px-4 py-3 text-xs font-semibold text-brand-navy">{item.label}</figcaption>
    </figure>)}</div>
    <div className="mt-6 grid gap-6 md:grid-cols-2">{campuses.map(campus => <article key={campus.name} className="rounded-2xl border border-brand-border bg-brand-bg p-6"><p className="text-[10px] font-bold uppercase tracking-wider text-brand-muted">{campus.value === 'VRR Academy' ? t('campusSection.integratedLearning') : t('campusSection.puAcademicCampus')}</p><h3 className="mt-2 font-serif text-2xl font-semibold text-brand-navy">{campus.name}</h3><p className="mt-3 text-sm text-brand-muted">{campus.description}</p><div className="mt-6 flex flex-col gap-3 sm:flex-row">{campus.map ? <a href={campus.map} target="_blank" rel="noopener noreferrer" className="btn-outline flex-1 text-xs">{t('campusSection.viewLocation')}<Icon name="pin" className="h-4 w-4" /></a> : <a href="#contact" className="btn-outline flex-1 text-xs">{t('campusSection.confirmLocation')}<Icon name="pin" className="h-4 w-4" /></a>}<button type="button" onClick={() => onVisit(campus.value)} className="btn-gold flex-1 text-xs">{t('campusSection.bookCampusVisit')}</button></div></article>)}</div>
  </div></section>
}
