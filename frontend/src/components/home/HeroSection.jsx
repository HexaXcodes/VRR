import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import Icon from '../Icon'
import { site } from '../../config/site'

export default function HeroSection({ onVisit }) {
  const { t } = useTranslation()
  const slides = site.heroSlides || [{ src: site.heroImage, alt: site.heroImageAlt }]

  const [currentIndex, setCurrentIndex] = useState(0)
  const [prevIndex, setPrevIndex] = useState(null)
  const [failedSources, setFailedSources] = useState({})
  const [isReducedMotion, setIsReducedMotion] = useState(false)

  // Preload slideshow images for seamless transitions
  useEffect(() => {
    slides.forEach(slide => {
      if (slide?.src) {
        const img = new Image()
        img.src = slide.src
      }
    })
  }, [slides])

  // Listen for prefers-reduced-motion preference changes
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

  const moveImage = event => {
    if (!window.matchMedia('(min-width: 1024px) and (hover: hover) and (prefers-reduced-motion: no-preference)').matches) return
    const rect = event.currentTarget.getBoundingClientRect()
    event.currentTarget.style.setProperty('--image-x', `${((event.clientX - rect.left) / rect.width - .5) * 8}px`)
    event.currentTarget.style.setProperty('--image-y', `${((event.clientY - rect.top) / rect.height - .5) * 8}px`)
  }

  const currentSlide = slides[currentIndex] || slides[0]
  const currentFailed = failedSources[currentSlide?.src]
  const currentSrc = currentFailed ? '/images/campus-placeholder.svg' : (currentSlide?.src || site.heroImage)
  const currentAlt = currentFailed
    ? t('hero.imageAlt')
    : (currentSlide?.i18nKey ? t(currentSlide.i18nKey) : (currentSlide?.alt || site.heroImageAlt))

  const prevSlide = prevIndex !== null ? (slides[prevIndex] || null) : null
  const prevFailed = prevSlide ? failedSources[prevSlide.src] : false
  const prevSrc = prevSlide ? (prevFailed ? '/images/campus-placeholder.svg' : prevSlide.src) : null

  const isCurrentPlaceholder = currentSrc === '/images/campus-placeholder.svg'

  return <section id="home" className="hero-v2 page-container py-10 lg:py-16">
    <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
      <div className="hero-copy min-w-0 space-y-5 lg:col-span-7">
        <div className="hero-admissions-badge inline-flex items-center gap-2 rounded-full border border-brand-gold/30 bg-brand-gold-light/30 px-3.5 py-1.5 text-[11px] font-bold tracking-wider text-brand-navy"><span className="hero-admissions-dot h-1.5 w-1.5 rounded-full bg-brand-gold" />{t('hero.admissionsOpen202728')}</div>
        <div>
          <h1 className="tracking-tight text-brand-navy">
            <span className="hero-heading block font-sans font-medium">{t('hero.puBoardsJeeNeetKcet')}</span>
            <span className="hero-statement mt-2 block font-serif font-bold not-italic text-brand-gold">{t('hero.oneFocusedAcademicSystem')}</span>
          </h1>
          <p className="hero-description mt-5 max-w-xl text-base leading-relaxed text-brand-muted sm:text-lg">{t('hero.integratedPuEducationDesignedAroundStrong')}</p>
        </div>
        <div className="hero-association flex max-w-xl items-start gap-3 rounded-xl border border-brand-gold/40 border-l-[3px] bg-brand-neutral p-3 text-brand-navy">
          <Icon name="cap" className="mt-0.5 h-6 w-6 shrink-0 text-brand-gold" />
          <div className="min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-wider text-brand-gold-hover">{t('hero.integratedProgramme')}</p>
            <p className="mt-1 text-xs leading-relaxed">{t('hero.inAcademicAssociationWith')}<strong className="block text-base font-bold uppercase leading-snug">{t('hero.associationCollege')}</strong></p>
            <p className="mt-2 text-[13px] leading-relaxed">{t('hero.integratedPathway')}</p>
          </div>
        </div>
        <div className="hero-programmes flex flex-wrap items-center gap-2.5"><span className="text-[10px] font-bold uppercase tracking-wider text-brand-muted">{t('hero.programs')}</span>{['PCMB', 'PCMC', 'PCME'].map(stream => <a href="#pathways" key={stream} className="rounded-md border border-brand-border bg-white px-3 py-1 text-xs font-bold text-brand-navy hover:border-brand-gold">{stream}</a>)}<span className="text-xs text-brand-muted">{t('hero.bengaluruCampus')}</span></div>
        <div className="hero-actions flex flex-col gap-3 sm:flex-row"><a href="#fee-enquiry" className="btn-gold">{t('hero.getFeeStructure')}<Icon name="arrow" /></a><button type="button" onClick={() => onVisit()} className="btn-outline"><Icon name="calendar" />{t('hero.bookCampusVisit')}</button></div>
        <p className="hero-trust text-xs font-medium leading-relaxed text-brand-muted">{t('hero.limitedSeats')}<span className="mx-1">•</span>{t('hero.entranceAssessment')}<span className="mx-1">•</span>{t('hero.academicCounselling')}</p>
      </div>
      <div className="hero-media lg:col-span-5" onPointerMove={moveImage} onPointerLeave={event => { event.currentTarget.style.removeProperty('--image-x'); event.currentTarget.style.removeProperty('--image-y') }}>
        <div className="hero-media-index"><span>{t('hero.vrrBengaluru')}</span><span>{t('hero.01TheLearningEnvironment')}</span></div>
        <div className="hero-image-frame" role="region" aria-roledescription="carousel" aria-label={t('hero.campusSlideshow')}>
          {prevSrc && prevSrc !== currentSrc && (
            <div className="hero-slide-underlay pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
              <img
                src={prevSrc}
                alt=""
                width="800"
                height="760"
                className="aspect-[4/3] w-full h-full object-cover lg:aspect-auto lg:h-[460px]"
              />
            </div>
          )}
          <img
            key={currentSrc}
            src={currentSrc}
            alt={currentAlt}
            width="800"
            height="760"
            loading="eager"
            onError={() => handleImageError(currentSlide.src)}
            className={`${prevIndex !== null ? 'hero-slide-fade ' : ''}relative aspect-[4/3] w-full object-cover lg:aspect-auto lg:h-[460px]`}
          />
          {isCurrentPlaceholder && (
            <div className="hero-placeholder-copy">
              <p>{t('hero.imageTitle')}</p>
              <span>{t('hero.imageAlt')}</span>
            </div>
          )}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-navy/50 via-transparent to-transparent" />
        </div>
        <div className="hero-academic-badges">{[['check', t('hero.chapterWiseTesting')], ['people', t('hero.expertFaculty')]].map(([icon, label]) => <div key={label} className="flex items-center gap-2 rounded-xl border border-brand-border bg-white/95 px-3 py-2.5 text-[11px] font-bold text-brand-navy shadow-sm"><Icon name={icon} className="h-4 w-4 text-brand-gold" />{label}</div>)}</div>
      </div>
    </div>
  </section>
}
