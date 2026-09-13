import Icon from '../Icon'
const pathways = [
  { stream: 'PCMB', label: 'Medical & Engineering', subjects: 'Physics, Chemistry, Mathematics, Biology', exams: ['NEET', 'KCET', 'JEE Main', 'PU Boards'] },
  { stream: 'PCMC', label: 'Tech & Computing', subjects: 'Physics, Chemistry, Mathematics, Computer Science', exams: ['JEE Main', 'JEE Advanced', 'KCET', 'PU Boards'] },
  { stream: 'PCME', label: 'Electronics & Hardware', subjects: 'Physics, Chemistry, Mathematics, Electronics', exams: ['JEE Main', 'KCET', 'PU Boards'] },
]
export default function Pathways({ onCounselling, onExplore }) {
  return <section id="pathways" className="border-y border-brand-border bg-white section-space"><div className="page-container">
    <p className="eyebrow">Academic Streams</p><h2 className="section-heading mt-3">Choose Your Pathway</h2><p className="mt-3 text-brand-muted">Structured combinations designed for your academic goals.</p>
    <div className="mt-9 grid gap-6 lg:grid-cols-3">{pathways.map(item => <article key={item.stream} className="flex flex-col rounded-2xl border border-brand-border bg-brand-bg p-6 sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-3"><span className="rounded bg-brand-gold-light px-2.5 py-1 text-xs font-bold text-brand-navy">{item.stream}</span><span className="text-[9px] font-bold uppercase tracking-wider text-brand-muted">{item.label}</span></div>
      <h3 className="mt-5 font-serif text-2xl font-bold leading-tight text-brand-navy">{item.subjects}</h3>
      <p className="mt-4 text-sm leading-relaxed text-brand-muted">Build a strong foundation through board learning, problem solving and exam practice.</p>
      <div className="mt-6 border-t border-brand-border pt-5"><p className="text-[10px] font-bold uppercase tracking-wider text-brand-muted">Target Examinations</p><div className="mt-3 flex flex-wrap gap-2">{item.exams.map(exam => <span key={exam} className="rounded border border-brand-border bg-white px-2 py-1 text-[11px] font-semibold text-brand-navy">{exam}</span>)}</div></div>
      <button type="button" onClick={() => onExplore(item.stream)} className="mt-7 flex items-center justify-between gap-3 border-t border-brand-border pt-5 text-left text-xs font-bold text-brand-navy hover:text-brand-gold-hover">Explore {item.stream} Curriculum<Icon name="arrow" className="h-4 w-4" /></button>
    </article>)}</div>
    <div className="mt-7 flex flex-col items-start justify-between gap-4 rounded-xl border border-brand-border bg-brand-neutral p-5 sm:flex-row sm:items-center"><p className="flex items-center gap-3 text-sm font-medium text-brand-navy"><Icon name="chat" className="h-5 w-5 shrink-0 text-brand-gold" />Not sure which combination fits your goals?</p><button type="button" onClick={() => onCounselling()} className="btn-navy text-xs">Talk to an Academic Counsellor<Icon name="arrow" className="h-4 w-4" /></button></div>
  </div></section>
}
