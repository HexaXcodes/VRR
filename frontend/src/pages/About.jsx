import { useTranslation } from 'react-i18next'
import { Suspense, lazy, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { setSeoMeta } from '../utils/seo'

const AcademicLeadership = lazy(() => import('../components/AcademicLeadership'))

function SectionLoader() {
  const { t } = useTranslation()
 return (
  <div className="flex min-h-screen items-center justify-center bg-gray">
    <div className="text-center">
      <div className="inline-block">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primaryBlue border-t-transparent" />
      </div>
      <p className="mt-4 text-gray-600">{t('about.loadingSection')}</p>
    </div>
  </div>
) }

export default function About() {
  const { t } = useTranslation()

  const location = useLocation()
  useEffect(() => {
    setSeoMeta(
      t('about.aboutVrrCareerAcademyMeetOur'),
      t('about.learnAboutVrrCareerAcademyOur'),
      'https://vrr-academy.com/og-image.jpg',
      'https://vrr-academy.com/about'
    )
  }, [t])

    useEffect(() => {
    if (location.hash === '#leadership') {
      const scrollToLeadership = () => {
        const element = document.getElementById('leadership')

        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          })
          return true
        }

        return false
      }

      // The leadership section is lazy-loaded, so wait for it to exist.
      const firstAttempt = setTimeout(() => {
        if (!scrollToLeadership()) {
          const secondAttempt = setTimeout(() => {
            scrollToLeadership()
          }, 300)

          return () => clearTimeout(secondAttempt)
        }
      }, 100)

      return () => clearTimeout(firstAttempt)
    }
  }, [location.hash])

  return (
    <div className="w-full">
      {/* About VRR Career Academy Section */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="flex flex-col justify-center">
              <h1 className="text-3xl font-black text-darkText sm:text-4xl lg:text-5xl">{t('about.aboutVrrCareerAcademy')}</h1>
              <p className="mt-6 text-lg leading-relaxed text-slate-600">{t('about.vrrCareerAcademyIsCommittedTo')}</p>
              <p className="mt-4 text-lg leading-relaxed text-slate-600">{t('about.ourApproachCombinesRigorousAcademicPreparation')}</p>
              <div className="mt-8 space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primaryBlue text-white">
                    ✓
                  </div>
                  <div>
                    <h3 className="font-black text-darkText">{t('about.strongFundamentals')}</h3>
                    <p className="text-sm text-slate-600">{t('about.conceptBasedLearningWithEmphasisOn')}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primaryBlue text-white">
                    ✓
                  </div>
                  <div>
                    <h3 className="font-black text-darkText">{t('about.examOrientedPreparation')}</h3>
                    <p className="text-sm text-slate-600">{t('about.regularTestsAcademicMonitoringAndExam')}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primaryBlue text-white">
                    ✓
                  </div>
                  <div>
                    <h3 className="font-black text-darkText">{t('about.personalizedGuidance')}</h3>
                    <p className="text-sm text-slate-600">{t('about.individualMentoringAndContinuousAcademicSupport')}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-8 shadow-lg">
                <div className="text-center">
                  <p className="text-sm font-bold uppercase tracking-[0.15em] text-primaryBlue">{t('about.ourMission')}</p>
                  <p className="mt-4 text-2xl font-black text-darkText leading-tight">{t('about.provideStudentsWithStrongAcademicFoundations')}</p>
                  <div className="mt-6 flex flex-col gap-2 text-left">
                    <div className="rounded-lg bg-white px-4 py-3 text-sm font-semibold text-primaryBlue">{t('about.puBoardsKcetJeeNeet')}</div>
                    <div className="rounded-lg bg-white px-4 py-3 text-sm font-semibold text-primaryBlue">{t('about.pcmbPcmcPcme')}</div>
                    <div className="rounded-lg bg-white px-4 py-3 text-sm font-semibold text-primaryBlue">{t('about.academicMonitoringMentoring')}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Academic Leadership Section */}
      <Suspense fallback={<SectionLoader />}>
        <AcademicLeadership />
      </Suspense>
    </div>
  )
}
