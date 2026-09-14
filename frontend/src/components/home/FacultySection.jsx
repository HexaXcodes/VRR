import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { faculty } from '../../data/faculty'
import FacultyProfileModal from './FacultyProfileModal'
import Icon from '../Icon'
export default function FacultySection() {
  const { t } = useTranslation()

  const [selected, setSelected] = useState(null)
  return <section id="faculty" className="border-y border-brand-border bg-white section-space"><div className="page-container">
    <div className="flex flex-wrap items-end justify-between gap-4"><div><p className="eyebrow">{t('facultySection.academicMentors')}</p><h2 className="section-heading mt-3">{t('facultySection.learnFromExperiencedFaculty')}</h2><p className="mt-3 text-sm text-brand-muted">{t('facultySection.subjectSpecialistsFocusedOnConceptClarity')}</p></div><span className="text-xs font-medium text-brand-muted">{t('facultySection.coreAcademicTeam')}</span></div>
    <div className="faculty-portraits mt-9">{faculty.map(person => <button type="button" key={person.id} aria-haspopup="dialog" aria-label={t('facultySection.profileLabel', { name: person.name })} onClick={() => setSelected(person)} className="faculty-card group">
      <span className="faculty-portrait">{person.photo ? <img src={person.photo} alt={person.name} loading="lazy" /> : <span className="faculty-initials" aria-hidden="true">{person.initials}</span>}<span className="faculty-subject">{t(`common.${person.subject.toLowerCase()}`)}</span></span><span className="faculty-name">{person.name}</span><span className="faculty-qualifications">{person.qualifications}</span><span className="faculty-profile-link">{t('facultySection.viewProfile')}<Icon name="arrow" className="h-4 w-4" /></span>
    </button>)}</div>
    {selected && <FacultyProfileModal person={selected} onClose={() => setSelected(null)} />}
  </div></section>
}
