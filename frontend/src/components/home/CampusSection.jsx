import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import Icon from '../Icon'
import { site } from '../../config/site'

// Replace null photo fields only with approved images of the relevant location.

export default function CampusSection({ onVisit }) {
  const { t } = useTranslation()

  const shanthiSlides = site.shanthiNiketanSlides || []
  const vrrSlides = site.vrrAcademySlides || []

  const campuses = [
    {
      name: 'Shanthi Niketan PU College',
      description: t('campusSection.puAcademicCampusAssociatedWithThe'),
      map: site.collegeMapsUrl,
      value: 'Shanthi Niketan',
    },
    {
      name: 'VRR Career Academy',
      description: t('campusSection.integratedAcademicAndCompetitiveExamLearning'),
      map: site.mapsUrl,
      value: 'VRR Academy',
    },
  ]

  const [selectedCampus, setSelectedCampus] = useState('Shanthi Niketan')

  // Shanthi Niketan PU College Slideshow State
  const [slideIndex, setSlideIndex] = useState(0)
  const [prevSlideIndex, setPrevSlideIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  // VRR Career Academy Slideshow State
  const [vrrSlideIndex, setVrrSlideIndex] = useState(0)
  const [prevVrrSlideIndex, setPrevVrrSlideIndex] = useState(0)
  const [isVrrTransitioning, setIsVrrTransitioning] = useState(false)

  const [failedImages, setFailedImages] = useState({})

  // Automatically advance every 2 seconds and loop infinitely for Shanthi Niketan PU College
  // Pauses while tab is hidden and resumes automatically when visible
  useEffect(() => {
    if (selectedCampus !== 'Shanthi Niketan' || shanthiSlides.length === 0) return

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mediaQuery.matches) return

    let intervalId = null

    const startTimer = () => {
      if (intervalId || document.hidden) return
      intervalId = setInterval(() => {
        setSlideIndex(prev => {
          setPrevSlideIndex(prev)
          setIsTransitioning(true)
          return (prev + 1) % shanthiSlides.length
        })
      }, 2000)
    }

    const stopTimer = () => {
      if (intervalId) {
        clearInterval(intervalId)
        intervalId = null
      }
    }

    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopTimer()
      } else {
        startTimer()
      }
    }

    startTimer()
    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      stopTimer()
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [selectedCampus, shanthiSlides.length])

  useEffect(() => {
    if (!isTransitioning) return
    const timer = setTimeout(() => setIsTransitioning(false), 550)
    return () => clearTimeout(timer)
  }, [slideIndex, isTransitioning])

  // Automatically advance every 2 seconds and loop infinitely for VRR Career Academy
  // Pauses while tab is hidden and resumes automatically when visible
  useEffect(() => {
    if (selectedCampus !== 'VRR Academy' || vrrSlides.length === 0) return

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mediaQuery.matches) return

    let intervalId = null

    const startTimer = () => {
      if (intervalId || document.hidden) return
      intervalId = setInterval(() => {
        setVrrSlideIndex(prev => {
          setPrevVrrSlideIndex(prev)
          setIsVrrTransitioning(true)
          return (prev + 1) % vrrSlides.length
        })
      }, 2000)
    }

    const stopTimer = () => {
      if (intervalId) {
        clearInterval(intervalId)
        intervalId = null
      }
    }

    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopTimer()
      } else {
        startTimer()
      }
    }

    startTimer()
    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      stopTimer()
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [selectedCampus, vrrSlides.length])

  useEffect(() => {
    if (!isVrrTransitioning) return
    const timer = setTimeout(() => setIsVrrTransitioning(false), 550)
    return () => clearTimeout(timer)
  }, [vrrSlideIndex, isVrrTransitioning])

  const handleTabKeyDown = (e, currentCampus) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault()
      const nextCampus = currentCampus === 'Shanthi Niketan' ? 'VRR Academy' : 'Shanthi Niketan'
      setSelectedCampus(nextCampus)
      const nextTab = document.getElementById(nextCampus === 'VRR Academy' ? 'campus-tab-vrr' : 'campus-tab-shanthi')
      if (nextTab) nextTab.focus()
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault()
      const prevCampus = currentCampus === 'VRR Academy' ? 'Shanthi Niketan' : 'VRR Academy'
      setSelectedCampus(prevCampus)
      const prevTab = document.getElementById(prevCampus === 'VRR Academy' ? 'campus-tab-vrr' : 'campus-tab-shanthi')
      if (prevTab) prevTab.focus()
    }
  }

  const currentSlide = shanthiSlides[slideIndex] || shanthiSlides[0]
  const prevSlide = shanthiSlides[prevSlideIndex] || shanthiSlides[0]
  const allShanthiImagesFailed = shanthiSlides.length > 0 && shanthiSlides.every(s => failedImages[s.src])

  const currentVrrSlide = vrrSlides[vrrSlideIndex] || vrrSlides[0]
  const prevVrrSlide = vrrSlides[prevVrrSlideIndex] || vrrSlides[0]
  const allVrrImagesFailed = vrrSlides.length > 0 && vrrSlides.every(s => failedImages[s.src])

  return (
    <section id="campus" className="campus-section section-space">
      <div className="page-container relative">
        <p className="campus-watermark" aria-hidden="true">{t('campusSection.learnPracticeGrow')}</p>
        <p className="eyebrow">{t('campusSection.bengaluruCampus')}</p>
        <h2 className="section-heading mt-3">{t('campusSection.exploreOurLearningEnvironment')}</h2>
        <p className="mt-3 text-sm text-brand-muted">{t('campusSection.getToKnowTheCampusWith')}</p>

        {/* Accessible Campus Selector Cards (positioned above the photo slideshow) */}
        <div
          role="tablist"
          aria-label={t('campusSection.selectCampus', 'Campus Selector')}
          className="mt-8 grid gap-6 md:grid-cols-2"
        >
          {campuses.map(campus => {
            const isSelected = selectedCampus === campus.value
            const tabId = campus.value === 'VRR Academy' ? 'campus-tab-vrr' : 'campus-tab-shanthi'
            const panelId = campus.value === 'VRR Academy' ? 'campus-panel-vrr' : 'campus-panel-shanthi'

            return (
              <article
                key={campus.name}
                className={`rounded-2xl border bg-brand-bg p-6 transition-all ${
                  isSelected
                    ? 'border-brand-gold shadow-sm ring-1 ring-brand-gold/30'
                    : 'border-brand-border hover:border-brand-gold/40'
                }`}
              >
                {/* Accessible campus selector tab button */}
                <button
                  type="button"
                  role="tab"
                  id={tabId}
                  aria-selected={isSelected}
                  aria-controls={panelId}
                  tabIndex={isSelected ? 0 : -1}
                  onClick={() => setSelectedCampus(campus.value)}
                  onKeyDown={e => handleTabKeyDown(e, campus.value)}
                  className="w-full text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold rounded-xl transition-colors cursor-pointer"
                >
                  <p className="text-[10px] font-bold uppercase tracking-wider text-brand-muted">
                    {campus.value === 'VRR Academy' ? t('campusSection.integratedLearning') : t('campusSection.puAcademicCampus')}
                  </p>
                  <h3 className="mt-2 font-serif text-2xl font-semibold text-brand-navy group-hover:text-brand-gold transition-colors">
                    {campus.name}
                  </h3>
                  <p className="mt-3 text-sm text-brand-muted">{campus.description}</p>
                </button>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  {campus.map ? (
                    <a
                      href={campus.map}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-outline flex-1 text-xs"
                    >
                      {t('campusSection.viewLocation')}
                      <Icon name="pin" className="h-4 w-4" />
                    </a>
                  ) : (
                    <a href="#contact" className="btn-outline flex-1 text-xs">
                      {t('campusSection.confirmLocation')}
                      <Icon name="pin" className="h-4 w-4" />
                    </a>
                  )}
                  <button
                    type="button"
                    onClick={() => onVisit(campus.value)}
                    className="btn-gold flex-1 text-xs"
                  >
                    {t('campusSection.bookCampusVisit')}
                  </button>
                </div>
              </article>
            )
          })}
        </div>

        {/* Shanthi Niketan PU College Slideshow / Photo Area */}
        {selectedCampus === 'Shanthi Niketan' ? (
          <div
            id="campus-panel-shanthi"
            role="tabpanel"
            aria-labelledby="campus-tab-shanthi"
            tabIndex={0}
            className="mt-8 focus:outline-none"
          >
            <figure
              className="campus-photo campus-slideshow-frame relative overflow-hidden rounded-xl border border-brand-border bg-brand-bg"
              aria-roledescription="carousel"
              aria-label={t('campusSection.shanthiNiketanSlideshow')}
            >
              {/* Previous slide underlay during crossfade */}
              {isTransitioning && prevSlide && !failedImages[prevSlide.src] && (
                <div className="campus-slide-underlay absolute inset-0 z-0" aria-hidden="true">
                  <img
                    src={prevSlide.src}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </div>
              )}

              {/* Current slide with subtle crossfade */}
              {currentSlide && !failedImages[currentSlide.src] && !allShanthiImagesFailed ? (
                <div
                  key={currentSlide.src}
                  className={`campus-slide-fade relative z-10 h-full w-full ${isTransitioning ? 'is-animating' : ''}`}
                >
                  <img
                    src={currentSlide.src}
                    alt={currentSlide.alt}
                    onError={() => setFailedImages(prev => ({ ...prev, [currentSlide.src]: true }))}
                    className="h-full w-full object-cover"
                  />
                </div>
              ) : (
                <div className="campus-placeholder relative z-10 flex h-full w-full flex-col items-center justify-center gap-3">
                  <Icon name="building" className="h-10 w-10 text-brand-gold" />
                  <p className="text-sm font-medium text-brand-navy">
                    {currentSlide ? t(currentSlide.i18nKey, currentSlide.label) : 'Shanthi Niketan PU College'}
                  </p>
                  <span className="text-xs text-brand-muted">{t('campusSection.photoComingSoon')}</span>
                </div>
              )}

              {/* Clean figcaption matching original styling */}
              <figcaption className="relative z-20 flex items-center justify-between border-t border-brand-border bg-brand-bg px-4 py-3 text-xs font-semibold text-brand-navy">
                <span>{currentSlide ? t(currentSlide.i18nKey, currentSlide.label) : ''}</span>
                <span className="text-[11px] font-normal text-brand-muted">
                  Shanthi Niketan PU College • {slideIndex + 1} / {shanthiSlides.length}
                </span>
              </figcaption>
            </figure>
          </div>
        ) : (
          /* VRR Career Academy Slideshow / Photo Area */
          <div
            id="campus-panel-vrr"
            role="tabpanel"
            aria-labelledby="campus-tab-vrr"
            tabIndex={0}
            className="mt-8 focus:outline-none"
          >
            <figure
              className="campus-photo campus-slideshow-frame relative overflow-hidden rounded-xl border border-brand-border bg-brand-bg"
              aria-roledescription="carousel"
              aria-label={t('campusSection.vrrAcademySlideshow')}
            >
              {/* Previous slide underlay during crossfade */}
              {isVrrTransitioning && prevVrrSlide && !failedImages[prevVrrSlide.src] && (
                <div className="campus-slide-underlay absolute inset-0 z-0" aria-hidden="true">
                  <img
                    src={prevVrrSlide.src}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </div>
              )}

              {/* Current slide with subtle crossfade */}
              {currentVrrSlide && !failedImages[currentVrrSlide.src] && !allVrrImagesFailed ? (
                <div
                  key={currentVrrSlide.src}
                  className={`campus-slide-fade relative z-10 h-full w-full ${isVrrTransitioning ? 'is-animating' : ''}`}
                >
                  <img
                    src={currentVrrSlide.src}
                    alt={currentVrrSlide.alt}
                    onError={() => setFailedImages(prev => ({ ...prev, [currentVrrSlide.src]: true }))}
                    className="h-full w-full object-cover"
                  />
                </div>
              ) : (
                <div className="campus-placeholder relative z-10 flex h-full w-full flex-col items-center justify-center gap-3">
                  <Icon name="building" className="h-10 w-10 text-brand-gold" />
                  <p className="text-sm font-medium text-brand-navy">
                    {currentVrrSlide ? t(currentVrrSlide.i18nKey, currentVrrSlide.label) : 'VRR Career Academy'}
                  </p>
                  <span className="text-xs text-brand-muted">{t('campusSection.photoComingSoon')}</span>
                </div>
              )}

              {/* Clean figcaption matching original styling */}
              <figcaption className="relative z-20 flex items-center justify-between border-t border-brand-border bg-brand-bg px-4 py-3 text-xs font-semibold text-brand-navy">
                <span>{currentVrrSlide ? t(currentVrrSlide.i18nKey, currentVrrSlide.label) : ''}</span>
                <span className="text-[11px] font-normal text-brand-muted">
                  VRR Career Academy • {vrrSlideIndex + 1} / {vrrSlides.length}
                </span>
              </figcaption>
            </figure>
          </div>
        )}
      </div>
    </section>
  )
}
