import Modal from './Modal'
import { pathways } from '../data/pathways'

function Tags({ items }) {
  return <ul className="mt-3 flex flex-wrap gap-2">{items.map(item => <li key={item} className="max-w-full rounded-lg border border-brand-border bg-brand-neutral px-2.5 py-1.5 text-xs leading-relaxed text-brand-navy">{item}</li>)}</ul>
}

export default function PathwayModal({ stream, onClose, onCounselling }) {
  const pathway = pathways[stream]
  return <Modal className="pathway-dialog" trapFocus onClose={onClose} title={<><span className="mb-2 block font-sans text-xs font-bold tracking-wider text-brand-gold-hover">{pathway.stream}</span>{pathway.title}</>}>
    <div className="grid gap-6 sm:grid-cols-2 sm:gap-8">
      <div className="min-w-0 space-y-6">
        <section><h3 className="font-serif text-xl font-semibold text-brand-navy">Subjects</h3><Tags items={pathway.subjects} /></section>
        <section><h3 className="font-serif text-xl font-semibold text-brand-navy">Competitive Exams</h3><Tags items={pathway.exams} /></section>
        <section><h3 className="font-serif text-xl font-semibold text-brand-navy">Best For</h3><p className="mt-3 text-sm leading-relaxed text-brand-muted">{pathway.bestFor}</p></section>
      </div>
      <div className="min-w-0 space-y-6">
        <section><h3 className="font-serif text-xl font-semibold text-brand-navy">Future Scope</h3><p className="mt-3 text-sm leading-relaxed text-brand-muted">{pathway.futureScope}</p></section>
        <section><h3 className="font-serif text-xl font-semibold text-brand-navy">Career Opportunities</h3><Tags items={pathway.careers} /></section>
      </div>
    </div>
    <div className="mt-7 border-t border-brand-border pt-5">
      <p className="text-sm font-medium text-brand-navy">Still unsure which stream fits you?</p>
      <button type="button" className="btn-gold mt-3 w-full sm:w-auto" onClick={() => onCounselling(pathway.stream)}>Talk to an Academic Counsellor</button>
    </div>
  </Modal>
}
