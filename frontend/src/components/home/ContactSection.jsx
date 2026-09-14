import { useTranslation } from 'react-i18next'
import { site } from '../../config/site'
import Icon from '../Icon'
import WhatsAppCTA from '../WhatsAppCTA'
export default function ContactSection() {
  const { t } = useTranslation()

  return <section id="contact" className="border-t border-brand-border bg-white section-space"><div className="page-container grid items-center gap-10 lg:grid-cols-12">
    <div className="lg:col-span-5"><p className="eyebrow">{t('contactSection.getInTouch')}</p><h2 className="mt-3 font-serif text-3xl font-bold text-brand-navy">{t('contactSection.campusAdmissionsDesk')}</h2><p className="mt-3 text-sm text-brand-muted">{t('contactSection.forAdmissionsConversationsAndCampusWalkthroughs')}</p><div className="mt-6 flex items-start gap-3"><Icon name="pin" className="h-5 w-5 shrink-0 text-brand-gold" /><address className="text-sm not-italic leading-relaxed text-brand-muted"><strong className="block text-brand-navy">VRR Career Academy</strong>{t('common.address')}</address></div><div className="mt-6 flex flex-wrap gap-2"><a href={`tel:${site.phone}`} className="btn-outline text-xs"><Icon name="phone" />{t('contactSection.call')}</a><WhatsAppCTA className="btn-gold text-xs" /><a href={`mailto:${site.email}`} className="btn-outline text-xs"><Icon name="mail" />{t('contactSection.email')}</a></div></div>
    <div className="flex min-h-[280px] flex-col items-center justify-center rounded-2xl border border-brand-border bg-brand-neutral p-8 text-center lg:col-span-7"><img src={site.logo} width="64" height="64" alt="" className="h-16 w-16 rounded-full" loading="lazy" /><h3 className="mt-5 font-serif text-2xl font-semibold text-brand-navy">{t('contactSection.vrrCareerAcademyBengaluru')}</h3><p className="mt-3 text-xs text-brand-muted">{t('contactSection.findDirectionsToOurAdmissionsDesk')}</p><a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className="btn-outline mt-5 text-xs">{t('contactSection.openInGoogleMaps')}<Icon name="arrow" className="h-4 w-4" /></a></div>
  </div></section>
}
