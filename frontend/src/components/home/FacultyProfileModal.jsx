import Modal from '../Modal'
export function FacultyAvatar({ person, large = false }) {
  return person.photo ? <img src={person.photo} alt={person.name} className={`rounded-full object-cover ${large ? 'h-28 w-28' : 'h-20 w-20'}`} />
    : <span aria-hidden="true" className={`inline-flex shrink-0 items-center justify-center rounded-full border-2 border-brand-border bg-brand-navy font-serif font-bold text-brand-gold-light ${large ? 'h-28 w-28 text-3xl' : 'h-20 w-20 text-xl'}`}>{person.initials}</span>
}
export default function FacultyProfileModal({ person, onClose }) {
  return <Modal title={person.name} onClose={onClose}>
    <div className="flex flex-col items-center gap-4 text-center"><FacultyAvatar person={person} large /><span className="rounded-full bg-brand-gold-light px-4 py-1.5 text-sm font-bold text-brand-navy">{person.subject}</span><p className="text-sm leading-relaxed text-brand-muted">{person.qualifications}</p></div>
    {person.bio && <div className="mt-7"><h3 className="font-serif text-xl font-semibold text-brand-navy">Biography</h3><p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-brand-muted">{person.bio}</p></div>}
    {person.teachingFocus && <div className="mt-7"><h3 className="font-serif text-xl font-semibold text-brand-navy">Teaching Focus</h3><p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-brand-muted">{person.teachingFocus}</p></div>}
  </Modal>
}
