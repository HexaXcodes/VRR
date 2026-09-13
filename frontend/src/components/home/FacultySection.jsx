import { useState } from 'react'
import { faculty } from '../../data/faculty'
import FacultyProfileModal, { FacultyAvatar } from './FacultyProfileModal'
import Icon from '../Icon'
export default function FacultySection() {
  const [selected, setSelected] = useState(null)
  return <section id="faculty" className="border-y border-brand-border bg-white section-space"><div className="page-container">
    <div className="flex flex-wrap items-end justify-between gap-4"><div><p className="eyebrow">Academic Mentors</p><h2 className="section-heading mt-3">Learn From Experienced Faculty</h2><p className="mt-3 text-sm text-brand-muted">Subject specialists focused on concept clarity, problem solving and exam preparation.</p></div><span className="text-xs font-medium text-brand-muted">Core Academic Team</span></div>
    <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">{faculty.map(person => <button type="button" key={person.id} aria-haspopup="dialog" aria-label={`View profile of ${person.name}`} onClick={() => setSelected(person)} className="group flex flex-col items-center rounded-2xl border border-brand-border bg-brand-bg p-6 text-center transition duration-200 hover:-translate-y-0.5 hover:border-brand-gold hover:shadow-lg">
      <FacultyAvatar person={person} /><span className="mt-4 text-sm font-bold text-brand-navy">{person.name}</span><span className="mt-2 rounded bg-brand-neutral px-2.5 py-1 text-xs font-semibold text-brand-navy">{person.subject}</span><span className="mb-5 mt-3 text-xs leading-relaxed text-brand-muted">{person.qualifications}</span><span className="mt-auto flex w-full items-center justify-center gap-2 border-t border-brand-border pt-4 text-xs font-bold text-brand-gold-hover">View Profile<Icon name="arrow" className="h-4 w-4" /></span>
    </button>)}</div>
    {selected && <FacultyProfileModal person={selected} onClose={() => setSelected(null)} />}
  </div></section>
}
