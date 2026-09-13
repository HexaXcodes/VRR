import Icon from '../Icon'
const steps = [
  ['Concept', 'Board-aligned teaching with competitive-exam depth.', 'book'],
  ['Practice', 'Solved examples, worksheets and application problems.', 'cap'],
  ['Test', 'PU assessments, MCQs and OMR practice.', 'check'],
  ['Analyse', 'Identify accuracy, speed and weaker topics.', 'chart'],
  ['Improve', 'Doubt clearing, revision and exam strategy.', 'medal'],
]
export default function LearningSystem() {
  return <section id="learning-system" className="page-container section-space">
    <div className="mx-auto max-w-xl text-center"><p className="eyebrow">Proven Methodology</p><h2 className="section-heading mt-3">A Simple System. Consistent Improvement.</h2><p className="mt-4 text-sm text-brand-muted">A disciplined five-stage learning cycle.</p></div>
    <ol className="mt-9 grid gap-4 lg:grid-cols-5">{steps.map(([title, copy, icon], index) => <li key={title} className="rounded-2xl border border-brand-border bg-white p-6"><div className={`mb-4 inline-flex h-9 w-9 items-center justify-center rounded-full ${index === 4 ? 'bg-brand-gold text-brand-navy' : 'bg-brand-navy text-white'}`}><Icon name={icon} className="h-4 w-4" /></div><h3 className="font-bold text-brand-navy"><span className="sr-only">{index + 1}. </span>{title}</h3><p className="mt-2 text-xs leading-relaxed text-brand-muted">{copy}</p></li>)}</ol>
  </section>
}
