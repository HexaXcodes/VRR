import Icon from '../Icon'
const steps = [
  ['Submit Enquiry', 'Share basic student and programme details.'],
  ['Academic Counselling', 'Discuss stream choices and academic goals.'],
  ['Entrance / Diagnostic Assessment', 'Assessment as applicable during the admission process.'],
  ['Select Programme', 'Choose PCMB, PCMC or PCME.'],
  ['Confirm Admission', 'Complete the required admission formalities.'],
]
export default function AdmissionsProcess({ onAdmission }) {
  return <section id="admissions" className="page-container section-space"><div className="text-center"><p className="eyebrow">Step-by-step Procedure</p><h2 className="section-heading mt-3">Admissions 2027–28</h2><p className="mt-3 text-sm text-brand-muted">A transparent, guided process for your next academic step.</p></div>
    <ol className="mt-9 grid gap-4 lg:grid-cols-5">{steps.map(([title, text], index) => <li key={title} className="rounded-2xl border border-brand-border bg-white p-5"><span className={`inline-flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${index === 4 ? 'bg-brand-gold text-brand-navy' : 'bg-brand-navy text-white'}`}>{index + 1}</span><h3 className="mt-4 text-sm font-bold text-brand-navy">{title}</h3><p className="mt-2 text-xs leading-relaxed text-brand-muted">{text}</p></li>)}</ol>
    <div className="mt-8 text-center"><button type="button" onClick={onAdmission} className="btn-navy">Start Admission Enquiry<Icon name="arrow" /></button></div>
  </section>
}
