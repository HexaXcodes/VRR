import { useTranslation } from 'react-i18next'


export default function VRRCourses() {
  const { t } = useTranslation()

  const courses = [
  {
    title: t('courses.foundationCourses'),
    subtitle: t('courses.classes810'),
    description:
      t('courses.buildStrongAcademicFoundationsAndDevelop'),
    features: [
      t('courses.class8To10AlignedCurriculum'),
      t('courses.strongConceptualFoundation'),
      t('courses.regularTestsAndPerformanceTracking'),
      t('courses.personalizedMentoringAndDoubtSupport'),
    ],
  },
  {
    title: t('courses.jeePreparation'),
    subtitle: t('courses.classes1112'),
    description:
      t('courses.focusedPreparationForJeeMainAnd'),
    features: [
      t('courses.expertFacultyGuidance'),
      t('courses.dailyDoubtSupport'),
      t('courses.regularMockTests'),
      t('courses.structuredStudyMaterial'),
    ],
  },
  {
    title: t('courses.neetPreparation'),
    subtitle: t('courses.classes1112'),
    description:
      t('courses.focusedPreparationForMedicalAspirantsWith'),
    features: [
      t('courses.strongBiologyPreparation'),
      t('courses.previousYearQuestionPractice'),
      t('courses.regularTestSeries'),
      t('courses.careerGuidanceAndMentoring'),
    ],
  },
  {
    title: t('courses.kcetPreparation'),
    subtitle: t('courses.classes1112'),
    description:
      t('courses.focusedPreparationForTheKarnatakaCet'),
    features: [
      t('courses.kcetFocusedPreparation'),
      t('courses.regularPracticeAndAssessments'),
      t('courses.kcetSpecificTestSeries'),
      t('courses.conceptBasedLearning'),
    ],
  },
]
  return (
    <section className="min-h-screen bg-white pt-24 pb-16 sm:pt-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-primaryBlue">
            VRR Career Academy
          </p>

          <h1 className="mt-3 text-4xl font-black text-darkText sm:text-5xl">{t('courses.vrrCourses')}</h1>

          <p className="mt-5 text-lg leading-8 text-slate-600">{t('courses.focusedAcademicPreparationAndStructuredGuidance')}</p>
        </div>

        {/* Course Cards */}
        <div className="mt-12 grid gap-7 md:grid-cols-2">
          {courses.map((course) => (
            <article
              key={course.title}
              className="group rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="mb-6 h-1.5 w-16 rounded-full bg-primaryGold" />

              <p className="text-sm font-bold uppercase tracking-wide text-primaryBlue">
                {course.subtitle}
              </p>

              <h2 className="mt-2 text-2xl font-black text-darkText sm:text-3xl">
                {course.title}
              </h2>

              <p className="mt-4 leading-7 text-slate-600">
                {course.description}
              </p>

              <div className="mt-6 border-t border-slate-100 pt-5">
                <h3 className="text-sm font-bold uppercase tracking-wide text-darkText">{t('courses.whatTheProgramOffers')}</h3>

                <ul className="mt-4 space-y-3">
                  {course.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 text-slate-600"
                    >
                      <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primaryGold" />

                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 rounded-2xl bg-primaryBlue px-6 py-8 text-center sm:px-10">
          <h2 className="text-2xl font-black text-white sm:text-3xl">{t('courses.findTheRightPreparationProgramFor')}</h2>

          <p className="mx-auto mt-3 max-w-2xl text-white/80">{t('courses.exploreOurProgramsAndGetThe')}</p>

          <a
            href="/#contact"
            className="mt-6 inline-flex rounded-xl bg-primaryGold px-6 py-3 font-bold text-darkText transition hover:opacity-90"
          >{t('courses.enquireNow')}</a>
        </div>
      </div>
    </section>
  )
}