import { useState } from 'react'
import Icon from '../Icon'
const rows = [
  ['Expert Faculty', 'Integrated Preparation', 'Chapter-wise Testing', 'OMR Practice', 'Doubt Clearing', 'Parent Updates', 'Performance Analysis'],
  ['Academic Counselling', 'PU + Competitive Prep', 'Mentoring', 'Revision Support', 'Stream Guidance', 'Campus Visit', 'Entrance Assessment'],
]
function MarqueeRow({ items, reverse, paused }) {
  return <div className="marquee-row"><div className={`marquee-track ${reverse ? 'marquee-reverse' : ''} ${paused ? 'is-paused' : ''}`}>
    {[0, 1].map(copy => <div key={copy} className="marquee-group" aria-hidden={copy === 1 ? true : undefined}>{items.map((item, index) => <span key={item} className="flex shrink-0 items-center gap-2.5 whitespace-nowrap rounded-full border border-brand-border bg-white px-4 py-2 text-xs font-semibold text-brand-navy"><span className="rounded-full bg-brand-gold-light/40 p-1.5 text-brand-gold"><Icon name={['cap', 'book', 'chart', 'check', 'people', 'chat', 'calendar'][index]} className="h-4 w-4" /></span>{item}</span>)}</div>)}
  </div></div>
}
export default function FeatureMarquee() {
  const [paused, setPaused] = useState(false)
  return <div className="feature-marquee border-b border-brand-border bg-brand-bg py-4" aria-label="Academic features">
    <div className="space-y-3">{rows.map((items, index) => <MarqueeRow key={index} items={items} reverse={index === 1} paused={paused} />)}</div>
    <div className="page-container mt-2 flex justify-end"><button type="button" onClick={() => setPaused(value => !value)} aria-pressed={paused} className="marquee-toggle rounded px-2 py-1 text-[10px] font-semibold text-brand-muted hover:text-brand-navy">{paused ? 'Play feature strip' : 'Pause feature strip'}</button></div>
  </div>
}
