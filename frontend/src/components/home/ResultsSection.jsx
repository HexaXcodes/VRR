import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { site } from '../../config/site'
import Icon from '../Icon'

export default function ResultsSection() {
  const { t } = useTranslation()
  const slides = site.resultsSlides || (site.resultsImage ? [{ src: site.resultsImage, alt: t('resultsSection.selectedVrrAlumniAcademicResults2nd') }] : [])

  const [currentIndex, setCurrentIndex] = useState(0)
  const [prevIndex, setPrevIndex] = useState(null)
  const [failedSources, setFailedSources] = useState({})
  const [isReducedMotion, setIsReducedMotion] = useState(false)

  // Preload results images for smooth transitions
  useEffect(() => {
    slides.forEach(slide => {
      if (slide?.src) {
        const img = new Image()
        img.src = slide.src
      }
    })
  }, [slides])

  // Observe prefers-reduced-motion media query
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setIsReducedMotion(mediaQuery.matches)

    const onChange = e => setIsReducedMotion(e.matches)
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', onChange)
      return () => mediaQuery.removeEventListener('change', onChange)
    } else if (mediaQuery.addListener) {
      mediaQuery.addListener(onChange)
      return () => mediaQuery.removeListener(onChange)
    }
  }, [])

  // Auto-advance every 2 seconds, looping infinitely from last to first
  useEffect(() => {
    if (isReducedMotion || slides.length <= 1) return

    const timer = setInterval(() => {
      if (typeof document !== 'undefined' && document.hidden) return
      setCurrentIndex(prev => {
        setPrevIndex(prev)
        return (prev + 1) % slides.length
      })
    }, 2000)

    return () => clearInterval(timer)
  }, [isReducedMotion, slides.length])

  const handleImageError = source => {
    setFailedSources(prev => ({ ...prev, [source]: true }))
  }

  const currentSlide = slides[currentIndex] || slides[0]
  const isCurrentFailed = currentSlide ? !!failedSources[currentSlide.src] : true

  const prevSlide = prevIndex !== null ? (slides[prevIndex] || null) : null
  const isPrevFailed = prevSlide ? !!failedSources[prevSlide.src] : true
  const prevSrc = prevSlide && !isPrevFailed ? prevSlide.src : null

  const currentAlt = currentSlide?.i18nKey ? t(currentSlide.i18nKey) : (currentSlide?.alt || t('resultsSection.selectedVrrAlumniAcademicResults2nd'))
  const currentResult = currentSlide?.i18nResultKey ? t(currentSlide.i18nResultKey) : (currentSlide?.result || '')

  const hasWorkingSlides = slides.some(s => !failedSources[s.src])

  return <section id="achievements" className="results-section section-space"><div className="page-container results-layout">
    <div className="results-intro"><p className="eyebrow">{t('resultsSection.selectedVrrAlumni2ndPuc2025')}</p><h2 className="section-heading mt-3">{t('resultsSection.academic')}<br />{t('resultsSection.achievement')}</h2><p className="mt-3 text-sm text-brand-muted">{t('resultsSection.selectedAcademicAchievementsFromVrrAlumni')}</p><span className="results-year" aria-hidden="true">2025</span>
      <h3 className="font-serif text-2xl font-semibold text-brand-navy">{t('resultsSection.strongAcademicFoundation')}</h3><p className="mt-3 text-sm leading-relaxed text-brand-muted">{t('resultsSection.learnMoreAboutOurAcademicApproach')}</p><a href="#learning-system" className="editorial-link mt-6">{t('resultsSection.exploreOurLearningSystem')}<Icon name="arrow" /></a>
    </div>
    <figure className="results-artwork">
      {hasWorkingSlides && currentSlide && !isCurrentFailed ? (
        <div className="results-frame" role="region" aria-roledescription="carousel" aria-label={t('resultsSection.resultsSlideshow')}>
          {prevSrc && prevSrc !== currentSlide.src && (
            <div className="results-slide-underlay" aria-hidden="true">
              <img
                src={prevSrc}
                alt=""
                width="464"
                height="570"
                className="h-full w-full object-contain p-2 select-none"
              />
            </div>
          )}
          <img
            key={currentSlide.src}
            src={currentSlide.src}
            alt={currentAlt}
            width="464"
            height="570"
            loading="eager"
            onError={() => handleImageError(currentSlide.src)}
            className={`${prevIndex !== null ? 'results-slide-fade ' : ''}relative h-full w-full object-contain p-2 select-none`}
          />
          {currentResult && (
            <div className="results-badge pointer-events-none absolute right-3 top-3 z-10 flex items-center gap-1.5 rounded-full border border-brand-gold/40 bg-white/95 px-3 py-1.5 text-[11px] font-bold text-brand-navy shadow-sm backdrop-blur">
              <Icon name="medal" className="h-3.5 w-3.5 text-brand-gold" />
              <span>{currentResult}</span>
            </div>
          )}
        </div>
      ) : (
        <div className="results-placeholder">
          <Icon name="medal" className="h-12 w-12" />
          <h3>{t('resultsSection.2025AlumniResults')}</h3>
          <p>{t('resultsSection.theSelectedAlumniResultGraphicWill')}</p>
        </div>
      )}
      <figcaption>
        {currentSlide?.studentName ? `${currentSlide.studentName} • ${t('resultsSection.vrrCareerAcademy')}` : t('resultsSection.vrrCareerAcademy')}
        <span>{currentResult || t('resultsSection.2ndPuc2025')}</span>
      </figcaption>
    </figure>
  </div></section>
}
