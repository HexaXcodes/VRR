import { site } from '../../config/site'
import LeadForm from '../forms/LeadForm'
import WhatsAppCTA from '../WhatsAppCTA'
import Icon from '../Icon'
export default function FeeEnquirySection() {
  return <section id="fee-enquiry" className="bg-brand-navy text-white section-space"><div className="page-container grid items-center gap-12 lg:grid-cols-2">
    <div><span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-brand-navy-light px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-brand-gold-light"><span className="h-1.5 w-1.5 rounded-full bg-brand-gold" />Direct Advisory</span><h2 className="mt-5 font-serif text-4xl font-bold leading-tight sm:text-5xl">Planning for 2027–28?</h2><p className="mt-5 max-w-lg text-lg leading-relaxed text-white/75">Get programme details, fee information and admission guidance from our academic team.</p>
      <div className="mt-9 space-y-6"><a href={`tel:${site.phone}`} className="flex items-center gap-4"><span className="rounded-xl bg-brand-navy-light p-3 text-brand-gold"><Icon name="phone" /></span><span><span className="block text-[10px] font-semibold uppercase tracking-wider text-white/60">Admissions Hotline</span><span className="mt-1 block text-sm font-bold">+91 {site.phoneDisplay}</span></span></a><WhatsAppCTA className="inline-flex items-center gap-4 text-sm font-semibold text-white/90">Message Academic Counsellor</WhatsAppCTA><p className="flex items-start gap-4 text-sm leading-relaxed text-white/75"><Icon name="pin" className="h-5 w-5 shrink-0 text-brand-gold" />{site.address}</p></div>
    </div>
    <div className="rounded-2xl bg-white p-6 text-brand-dark shadow-xl sm:p-9"><h3 className="font-serif text-2xl font-bold text-brand-navy">Admissions &amp; Fee Request</h3><p className="mb-6 mt-2 text-sm text-brand-muted">Tell us a little about your plans. Our team will follow up.</p><LeadForm mode="fee" /><WhatsAppCTA className="btn-outline mt-3 w-full text-xs">Continue on WhatsApp</WhatsAppCTA></div>
  </div></section>
}
