import { useState } from 'react'

const leaders = [
  {
    id: 'founder',
    role: 'Founder',
    name: 'Keerthi N V',
    title: 'Founder, VRR Career Academy',
    qualifications: 'B.E., M.Tech in VLSI',
    image: '/Founder.png',
    excerpt: 'Our mission is to provide students with strong academic foundations, disciplined preparation, and the right guidance to succeed in PU Boards, KCET, JEE, and NEET.',
    fullMessage: `At VRR Career Academy, our mission is to provide students with strong academic foundations, disciplined preparation, and the right guidance to succeed in PU Boards, KCET, JEE, and NEET.

I completed my M.Tech in VLSI from RV College of Engineering and began my career as a lecturer in an engineering college. During this journey, I discovered my passion for teaching and mentoring students. This passion led to the establishment of VRR Academy in 2019, with a vision to support Class 11 and Class 12 students through focused and concept-based learning.

Over the years, I have primarily taught Physics, helping students understand concepts with clarity and confidence. I am also proficient in teaching Mathematics, which has helped me guide students across multiple academic pathways.

At VRR Career Academy, we believe that every student can perform well when complex concepts are explained in a simple, structured, and relatable manner.

Our focus is not only on completing the syllabus, but also on building problem-solving ability, exam discipline, conceptual understanding, and confidence.

With regular tests, academic monitoring, and personalized guidance, we aim to create a learning environment where students are motivated to perform their best.

As the Founder of VRR Career Academy, my commitment is to provide quality education, strong mentoring, and a student-focused academic system that helps every learner move closer to their career goals.`
  },
  {
    id: 'principal',
    role: 'Principal',
    name: 'Dr. P. Nageswara Rao',
    title: 'Principal, VRR Career Academy',
    qualifications: 'M.Sc., M.Ed., KSET, Ph.D. in Mathematics',
    image: '/Principal.png',
    excerpt: 'At VRR Career Academy, our academic approach is built around strong fundamentals, regular assessments, exam-oriented preparation, and continuous improvement.',
    fullMessage: `Education plays a vital role in shaping a student's future, and at VRR Career Academy, our goal is to guide students with academic discipline, conceptual clarity, and consistent mentoring.

I bring with me more than 15 years of teaching and academic experience in the field of Mathematics.

I hold M.Sc., M.Ed., KSET, and Ph.D. in Mathematics, and have served in various academic roles including Principal and Assistant Professor for B.Ed. students.

My experience has given me a deep understanding of student learning patterns, academic planning, assessment systems, and career guidance.

Throughout my academic journey, I have been actively involved in teaching, mentoring, research, and academic administration.

I have published 7 research articles in international journals and have contributed to examination systems as a Question Paper Setter for NIOS Class 10 and Class 12 examinations for 5 years.

I have also had the privilege of guiding students who secured 100 marks in Mathematics in the 2nd PUC Karnataka Board examinations.

At VRR Career Academy, our academic approach is built around strong fundamentals, regular assessments, exam-oriented preparation, and continuous improvement.

We aim to help students prepare confidently for PU Board examinations as well as competitive exams such as KCET, JEE, and NEET.

As Principal, my focus is to ensure academic quality, disciplined learning, and meaningful guidance so that every student receives the support needed to achieve excellence.`
  }
]

export default function AcademicLeadership() {
  const [expanded, setExpanded] = useState({
    founder: false,
    principal: false
  })

  const toggleMessage = (leaderId) => {
    setExpanded(prev => ({
      ...prev,
      [leaderId]: !prev[leaderId]
    }))
  }

  return (
    <section 
        id="leadership" 
        className="border-t-[6px] border-primaryGold bg-slate-50 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-black text-darkText sm:text-4xl">
            Meet the Academic Leadership
          </h2>
          <p className="mt-3 text-lg font-semibold text-slate-600">
            Guided by educators. Built around students.
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {leaders.map((leader) => (
            <div
              key={leader.id}
              className="flex flex-col rounded-2xl border border-slate-200 bg-white shadow-md transition-shadow duration-200 hover:shadow-lg"
            >
              {/* Portrait Area */}
              <div className="relative flex w-full items-center justify-center overflow-hidden rounded-t-2xl bg-gradient-to-br from-primaryBlue/10 to-slate-100" style={{ aspectRatio: '4/5' }}>
                <img
                  src={leader.image}
                  alt={leader.name}
                  className="h-full w-full object-contain"
                />
              </div>

              {/* Content Area */}
              <div className="flex flex-1 flex-col p-6">
                <div className="mb-4">
                  <p className="text-sm font-bold uppercase tracking-[0.15em] text-primaryBlue">
                    {leader.role}
                  </p>
                  <h3 className="mt-2 text-2xl font-black text-darkText">
                    {leader.name}
                  </h3>
                  <p className="mt-1 text-sm font-semibold text-slate-600">
                    {leader.title}
                  </p>
                  <p className="mt-2 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                    {leader.qualifications}
                  </p>
                </div>

                {/* Excerpt */}
                <p className="mb-4 flex-1 text-sm leading-relaxed text-slate-600 italic">
                  &ldquo;{leader.excerpt}&rdquo;
                </p>

                {/* Read Full Message Button */}
                <button
                  onClick={() => toggleMessage(leader.id)}
                  className="mt-2 inline-flex text-sm font-bold uppercase tracking-[0.14em] text-primaryBlue transition-colors duration-200 hover:text-darkBlue"
                >
                  {expanded[leader.id] ? 'Hide Message' : 'Read Full Message'}
                </button>

                {/* Expanded Full Message */}
                {expanded[leader.id] && (
                  <div className="mt-6 space-y-4 border-t border-slate-200 pt-6 animate-fade-in">
                    {leader.fullMessage.split('\n\n').map((paragraph, idx) => (
                      <p key={idx} className="text-sm leading-relaxed text-slate-700">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
