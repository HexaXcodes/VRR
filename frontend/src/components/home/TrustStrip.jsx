import Icon from '../Icon'
const items = [
  ['cap', 'Integrated Preparation', 'PU Boards + KCET / JEE / NEET'],
  ['medal', 'Expert Faculty', 'Subject specialists & mentors'],
  ['book', 'Regular Assessment', 'Descriptive & OMR test practice'],
  ['chart', 'Mentoring & Updates', 'Academic feedback for parents'],
]
export default function TrustStrip() {
  return <div className="border-y border-brand-border bg-white"><div className="page-container grid grid-cols-2 gap-6 py-6 lg:grid-cols-4">{items.map(([icon, title, text]) => <div key={title} className="flex items-start gap-3"><span className="icon-tile shrink-0"><Icon name={icon} /></span><div><p className="text-xs font-bold text-brand-navy sm:text-sm">{title}</p><p className="mt-1 text-[11px] leading-relaxed text-brand-muted">{text}</p></div></div>)}</div></div>
}
