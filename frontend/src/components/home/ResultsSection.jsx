import { useTranslation } from 'react-i18next'
import { site } from '../../config/site'
import Icon from '../Icon'
export default function ResultsSection() {
  const { t } = useTranslation()

  return <section id="achievements" className="results-section section-space"><div className="page-container results-layout">
    <div className="results-intro"><p className="eyebrow">{t('resultsSection.selectedVrrAlumni2ndPuc2025')}</p><h2 className="section-heading mt-3">{t('resultsSection.academic')}<br />{t('resultsSection.achievement')}</h2><p className="mt-3 text-sm text-brand-muted">{t('resultsSection.selectedAcademicAchievementsFromVrrAlumni')}</p><span className="results-year" aria-hidden="true">2025</span>
      <h3 className="font-serif text-2xl font-semibold text-brand-navy">{t('resultsSection.strongAcademicFoundation')}</h3><p className="mt-3 text-sm leading-relaxed text-brand-muted">{t('resultsSection.learnMoreAboutOurAcademicApproach')}</p><a href="#learning-system" className="editorial-link mt-6">{t('resultsSection.exploreOurLearningSystem')}<Icon name="arrow" /></a>
    </div>
    <figure className="results-artwork">
      {site.resultsImage ? <img src={site.resultsImage} alt={t('resultsSection.selectedVrrAlumniAcademicResults2nd')} loading="lazy" className="h-auto w-full" /> : <div className="results-placeholder"><Icon name="medal" className="h-12 w-12" /><h3>{t('resultsSection.2025AlumniResults')}</h3><p>{t('resultsSection.theSelectedAlumniResultGraphicWill')}</p></div>}
      <figcaption>{t('resultsSection.vrrCareerAcademy')}<span>{t('resultsSection.2ndPuc2025')}</span></figcaption>
    </figure>
  </div></section>
}
