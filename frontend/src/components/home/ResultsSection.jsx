import { site } from '../../config/site'
import Icon from '../Icon'
export default function ResultsSection() {
  return <section id="achievements" className="page-container section-space"><p className="eyebrow">Selected VRR Alumni • 2nd PUC 2025</p><h2 className="section-heading mt-3">Academic Achievement</h2><p className="mt-3 text-sm text-brand-muted">Selected academic achievements from VRR alumni.</p>
    <div className="mt-9 grid gap-6 lg:grid-cols-12">
      <div className="results-panel flex min-h-[280px] flex-col items-center justify-center overflow-hidden rounded-2xl border border-brand-border bg-brand-neutral p-8 text-center lg:col-span-8">
        {site.resultsImage ? <img src={site.resultsImage} alt="Selected VRR alumni academic results, 2nd PUC 2025" loading="lazy" className="h-auto w-full rounded-xl" /> : <><span className="icon-tile"><Icon name="cap" /></span><h3 className="mt-5 font-serif text-2xl font-semibold text-brand-navy">2025 Alumni Results</h3><p className="mt-3 max-w-sm text-sm leading-relaxed text-brand-muted">The selected alumni result graphic will be added here.</p></>}
      </div>
      <div className="flex flex-col items-start justify-center rounded-2xl border border-brand-border bg-white p-8 lg:col-span-4"><span className="icon-tile"><Icon name="medal" /></span><h3 className="mt-5 font-serif text-2xl font-semibold text-brand-navy">Strong Academic Foundation</h3><p className="mt-3 text-sm leading-relaxed text-brand-muted">Learn more about our academic approach and the support available to students.</p><a href="#learning-system" className="mt-6 inline-flex items-center gap-3 text-sm font-bold text-brand-navy">Explore our learning system<Icon name="arrow" /></a></div>
    </div>
  </section>
}
