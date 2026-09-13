import { Suspense, lazy, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { setSeoMeta } from '../utils/seo'

const AcademicLeadership = lazy(() => import('../components/AcademicLeadership'))

const SectionLoader = () => (
  <div className="flex min-h-screen items-center justify-center bg-gray">
    <div className="text-center">
      <div className="inline-block">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primaryBlue border-t-transparent" />
      </div>
      <p className="mt-4 text-gray-600">Loading section...</p>
    </div>
  </div>
)

export default function About() {
  const location = useLocation()
  useEffect(() => {
    setSeoMeta(
      'About VRR Career Academy | Meet Our Leadership',
      'Learn about VRR Career Academy, our mission, and meet our Founder Keerthi N V and Principal Dr. P. Nageswara Rao.',
      'https://vrr-academy.com/og-image.jpg',
      'https://vrr-academy.com/about'
    )
  }, [])

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
              <h1 className="text-3xl font-black text-darkText sm:text-4xl lg:text-5xl">
                About VRR Career Academy
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-slate-600">
                VRR Career Academy is committed to providing premium PU integrated coaching in academic association with Shanti Niketan PU College. We prepare students for PU Boards, KCET, JEE, and NEET with a focus on strong fundamentals, conceptual clarity, and disciplined learning.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-slate-600">
                Our approach combines rigorous academic preparation with personalized mentoring, regular assessments, and continuous monitoring. We believe every student can excel when complex concepts are explained in a simple, structured, and relatable manner.
              </p>
              <div className="mt-8 space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primaryBlue text-white">
                    ✓
                  </div>
                  <div>
                    <h3 className="font-black text-darkText">Strong Fundamentals</h3>
                    <p className="text-sm text-slate-600">Concept-based learning with emphasis on building core understanding</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primaryBlue text-white">
                    ✓
                  </div>
                  <div>
                    <h3 className="font-black text-darkText">Exam-Oriented Preparation</h3>
                    <p className="text-sm text-slate-600">Regular tests, academic monitoring, and exam discipline</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primaryBlue text-white">
                    ✓
                  </div>
                  <div>
                    <h3 className="font-black text-darkText">Personalized Guidance</h3>
                    <p className="text-sm text-slate-600">Individual mentoring and continuous academic support</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-8 shadow-lg">
                <div className="text-center">
                  <p className="text-sm font-bold uppercase tracking-[0.15em] text-primaryBlue">Our Mission</p>
                  <p className="mt-4 text-2xl font-black text-darkText leading-tight">
                    Provide students with strong academic foundations, disciplined preparation, and the right guidance to succeed in PU Boards, KCET, JEE, and NEET.
                  </p>
                  <div className="mt-6 flex flex-col gap-2 text-left">
                    <div className="rounded-lg bg-white px-4 py-3 text-sm font-semibold text-primaryBlue">
                      PU BOARDS + KCET + JEE + NEET
                    </div>
                    <div className="rounded-lg bg-white px-4 py-3 text-sm font-semibold text-primaryBlue">
                      PCMB | PCMC | PCME
                    </div>
                    <div className="rounded-lg bg-white px-4 py-3 text-sm font-semibold text-primaryBlue">
                      Academic monitoring & mentoring
                    </div>
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
