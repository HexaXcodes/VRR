import Icon from '../Icon'
import { site } from '../../config/site'
// Replace null photo fields only with approved images of the relevant location.
const gallery = ['Classroom', 'Physics Lab', 'Chemistry Lab', 'Biology Lab', 'Campus'].map(label => ({ label, photo: null }))
export default function CampusSection({ onVisit }) {
  const campuses = [
    { name: 'Shanthi Niketan PU College', description: 'PU academic campus associated with the integrated programme.', map: site.collegeMapsUrl, value: 'Shanthi Niketan' },
    { name: 'VRR Career Academy', description: 'Integrated academic and competitive-exam learning centre.', map: site.mapsUrl, value: 'VRR Academy' },
  ]
  return <section id="campus" className="border-y border-brand-border bg-white section-space"><div className="page-container">
    <p className="eyebrow">Bengaluru Campus</p><h2 className="section-heading mt-3">Explore Our Learning Environment</h2><p className="mt-3 text-sm text-brand-muted">Get to know the campus with a visit and an academic conversation.</p>
    <div className="mt-9 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">{gallery.map(item => <figure key={item.label} className="overflow-hidden rounded-xl border border-brand-border bg-brand-neutral">
      {item.photo ? <img src={item.photo} alt={item.label} loading="lazy" className="aspect-[4/3] w-full object-cover" /> : <div className="flex aspect-[4/3] flex-col items-center justify-center gap-2 text-brand-muted"><Icon name="building" className="h-7 w-7 text-brand-gold" /><span className="text-[10px]">Photo coming soon</span></div>}
      <figcaption className="border-t border-brand-border px-4 py-3 text-xs font-semibold text-brand-navy">{item.label}</figcaption>
    </figure>)}</div>
    <div className="mt-6 grid gap-6 md:grid-cols-2">{campuses.map(campus => <article key={campus.name} className="rounded-2xl border border-brand-border bg-brand-bg p-6"><p className="text-[10px] font-bold uppercase tracking-wider text-brand-muted">{campus.value === 'VRR Academy' ? 'Integrated Learning' : 'PU Academic Campus'}</p><h3 className="mt-2 font-serif text-2xl font-semibold text-brand-navy">{campus.name}</h3><p className="mt-3 text-sm text-brand-muted">{campus.description}</p><div className="mt-6 flex flex-col gap-3 sm:flex-row">{campus.map ? <a href={campus.map} target="_blank" rel="noopener noreferrer" className="btn-outline flex-1 text-xs">View Location<Icon name="pin" className="h-4 w-4" /></a> : <a href="#contact" className="btn-outline flex-1 text-xs">Confirm Location<Icon name="pin" className="h-4 w-4" /></a>}<button type="button" onClick={() => onVisit(campus.value)} className="btn-gold flex-1 text-xs">Book Campus Visit</button></div></article>)}</div>
  </div></section>
}
