import { useTranslation } from 'react-i18next'
import { useState } from 'react'



export default function AcademicLeadership() {
  const { t } = useTranslation()

  const leaders = [
  {
    id: 'founder',
    role: t('academicLeadership.founder'),
    name: 'Keerthi N V',
    title: t('academicLeadership.founderVrrCareerAcademy'),
    qualifications: 'B.E., M.Tech in VLSI',
    image: '/Founder.png',
    excerpt: t('academicLeadership.ourMissionIsToProvideStudents'),
    fullMessage: t('academicLeadership.atVrrCareerAcademyOurMission')
  },
  {
    id: 'principal',
    role: t('academicLeadership.principal'),
    name: 'Dr. P. Nageswara Rao',
    title: t('academicLeadership.principalVrrCareerAcademy'),
    qualifications: 'M.Sc., M.Ed., KSET, Ph.D. in Mathematics',
    image: '/Principal.png',
    excerpt: t('academicLeadership.atVrrCareerAcademyOurAcademic'),
    fullMessage: t('academicLeadership.educationPlaysAVitalRoleIn')
  }
]
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
          <h2 className="text-3xl font-black text-darkText sm:text-4xl">{t('academicLeadership.meetTheAcademicLeadership')}</h2>
          <p className="mt-3 text-lg font-semibold text-slate-600">{t('academicLeadership.guidedByEducatorsBuiltAroundStudents')}</p>
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
                  {expanded[leader.id] ? t('academicLeadership.hideMessage') : t('academicLeadership.readFullMessage')}
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
