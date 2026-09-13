import { Link } from 'react-router-dom'
import { site } from '../../config/site'
import WhatsAppCTA from '../WhatsAppCTA'
import Icon from '../Icon'
export default function MobileCTA() {
  return <nav aria-label="Quick admissions contact" className="mobile-cta fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t border-brand-border bg-white/95 px-3 pt-2 backdrop-blur lg:hidden"><a href={`tel:${site.phone}`} className="flex min-h-12 items-center justify-center gap-2 text-xs font-bold text-brand-navy"><Icon name="phone" className="h-4 w-4" />Call</a><WhatsAppCTA className="flex min-h-12 items-center justify-center gap-2 text-xs font-bold text-brand-navy" /><Link to="/#fee-enquiry" className="flex min-h-12 items-center justify-center gap-2 rounded-lg bg-brand-gold text-xs font-bold text-brand-navy"><Icon name="mail" className="h-4 w-4" />Enquire</Link></nav>
}
