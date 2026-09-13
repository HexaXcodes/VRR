const courses = [
  {
    title: 'Foundation Courses',
    subtitle: 'Classes 8–10',
    description:
      'Build strong academic foundations and develop conceptual clarity through structured learning and regular practice.',
    features: [
      'Class 8 to 10 aligned curriculum',
      'Strong conceptual foundation',
      'Regular tests and performance tracking',
      'Personalized mentoring and doubt support',
    ],
  },
  {
    title: 'JEE Preparation',
    subtitle: 'Classes 11–12',
    description:
      'Focused preparation for JEE Main and Advanced with strong concepts, regular practice and exam-oriented guidance.',
    features: [
      'Expert faculty guidance',
      'Daily doubt support',
      'Regular mock tests',
      'Structured study material',
    ],
  },
  {
    title: 'NEET Preparation',
    subtitle: 'Classes 11–12',
    description:
      'Focused preparation for medical aspirants with emphasis on conceptual understanding, practice and examination strategy.',
    features: [
      'Strong Biology preparation',
      'Previous-year question practice',
      'Regular test series',
      'Career guidance and mentoring',
    ],
  },
  {
    title: 'KCET Preparation',
    subtitle: 'Classes 11–12',
    description:
      'Focused preparation for the Karnataka CET examination with structured practice and exam-oriented preparation.',
    features: [
      'KCET-focused preparation',
      'Regular practice and assessments',
      'KCET-specific test series',
      'Concept-based learning',
    ],
  },
]

export default function VRRCourses() {
  return (
    <section className="min-h-screen bg-white pt-24 pb-16 sm:pt-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-primaryBlue">
            VRR Career Academy
          </p>

          <h1 className="mt-3 text-4xl font-black text-darkText sm:text-5xl">
            VRR Courses
          </h1>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            Focused academic preparation and structured guidance designed
            to help students build strong concepts and prepare confidently
            for their academic and competitive examinations.
          </p>
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
                <h3 className="text-sm font-bold uppercase tracking-wide text-darkText">
                  What the program offers
                </h3>

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
          <h2 className="text-2xl font-black text-white sm:text-3xl">
            Find the right preparation program for you
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-white/80">
            Explore our programs and get the guidance you need for your
            academic and competitive examination journey.
          </p>

          <a
            href="/#contact"
            className="mt-6 inline-flex rounded-xl bg-primaryGold px-6 py-3 font-bold text-darkText transition hover:opacity-90"
          >
            Enquire Now
          </a>
        </div>
      </div>
    </section>
  )
}