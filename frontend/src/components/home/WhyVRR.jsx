import Icon from '../Icon'
const items = [
  ['book', 'Integrated Preparation', 'Board learning and competitive-exam preparation in one focused academic programme.'],
  ['people', 'Expert Faculty', 'Subject specialists who explain concepts clearly and support academic progress.'],
  ['chart', 'Testing + Mentoring', 'Chapter-wise tests, OMR practice and guidance to turn feedback into progress.'],
  ['chat', 'Parent Visibility', 'Progress updates and academic conversations that keep parents involved.'],
]
export default function WhyVRR() {
  return <section className="page-container section-space"><div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
    <div className="lg:col-span-5"><p className="eyebrow">The VRR Difference</p><h2 className="section-heading mt-3">Why Students Choose VRR</h2><p className="mt-5 leading-relaxed text-brand-muted">A focused learning environment built around clarity, practice and personal academic support.</p><a href="#admissions" className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-brand-navy">View admissions procedure<Icon name="arrow" /></a></div>
    <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">{items.map(([icon, title, text]) => <article key={title} className="rounded-2xl border border-brand-border bg-brand-neutral p-6"><span className="inline-flex rounded-xl border border-brand-border bg-white p-2.5 text-brand-navy"><Icon name={icon} /></span><h3 className="mt-4 font-bold text-brand-navy">{title}</h3><p className="mt-2 text-sm leading-relaxed text-brand-muted">{text}</p></article>)}</div>
  </div></section>
}
