import Icon from '../Icon'
import { site } from '../../config/site'
export default function HeroSection({ onVisit }) {
  return <section id="home" className="page-container py-10 lg:py-16">
    <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
      <div className="min-w-0 space-y-6 lg:col-span-7">
        <div className="hero-admissions-badge inline-flex items-center gap-2 rounded-full border border-brand-gold/30 bg-brand-gold-light/30 px-3.5 py-1.5 text-[11px] font-bold tracking-wider text-brand-navy"><span className="hero-admissions-dot h-1.5 w-1.5 rounded-full bg-brand-gold" />ADMISSIONS OPEN • 2027–28</div>
        <div>
          <h1 className="tracking-tight text-brand-navy">
            <span className="hero-heading block font-sans font-medium">PU Boards + JEE / NEET / KCET</span>
            <span className="mt-2 block font-serif text-4xl font-bold not-italic leading-[1.15] text-brand-gold sm:text-5xl lg:whitespace-nowrap lg:text-[clamp(1.875rem,3vw,2.5rem)]">One Focused Academic System</span>
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-brand-muted sm:text-lg">Integrated PU education designed around strong concepts, regular practice, testing, mentoring and structured exam preparation in Bengaluru.</p>
        </div>
        <div className="flex max-w-xl items-center gap-3 rounded-xl border border-brand-border bg-brand-neutral p-3 text-sm"><Icon name="cap" className="h-6 w-6 shrink-0 text-brand-gold" /><span>In academic association with <strong className="text-brand-navy">Shanthi Niketan PU College</strong></span></div>
        <div className="flex flex-wrap items-center gap-2.5"><span className="text-[10px] font-bold uppercase tracking-wider text-brand-muted">Programs:</span>{['PCMB', 'PCMC', 'PCME'].map(stream => <a href="#pathways" key={stream} className="rounded-md border border-brand-border bg-white px-3 py-1 text-xs font-bold text-brand-navy hover:border-brand-gold">{stream}</a>)}<span className="text-xs text-brand-muted">• Bengaluru Campus</span></div>
        <div className="flex flex-col gap-3 sm:flex-row"><a href="#fee-enquiry" className="btn-gold">Get Fee Structure<Icon name="arrow" /></a><button type="button" onClick={() => onVisit()} className="btn-outline"><Icon name="calendar" />Book Campus Visit</button></div>
        <p className="text-xs font-medium leading-relaxed text-brand-muted">Limited Seats <span className="mx-1">•</span> Entrance Assessment <span className="mx-1">•</span> Academic Counselling</p>
      </div>
      <div className="relative overflow-hidden rounded-2xl border border-brand-border bg-brand-neutral shadow-xl lg:col-span-5">
        <img src={site.heroImage} alt={site.heroImageAlt} width="800" height="760" loading="eager" className="aspect-[4/3] w-full object-cover lg:aspect-auto lg:h-[460px]" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-navy/50 via-transparent to-transparent" />
        <div className="absolute inset-x-4 bottom-5 flex flex-wrap gap-2">{[['check', 'Chapter-wise Testing'], ['people', 'Expert Faculty']].map(([icon, label]) => <div key={label} className="flex items-center gap-2 rounded-xl border border-brand-border bg-white/95 px-3 py-2.5 text-[11px] font-bold text-brand-navy shadow-sm"><Icon name={icon} className="h-4 w-4 text-brand-gold" />{label}</div>)}</div>
      </div>
    </div>
  </section>
}
