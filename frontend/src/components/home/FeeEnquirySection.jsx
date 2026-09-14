import { useTranslation } from 'react-i18next'
import { site } from '../../config/site'
import LeadForm from '../forms/LeadForm'
import WhatsAppCTA from '../WhatsAppCTA'
import Icon from '../Icon'
export default function FeeEnquirySection() {
  const { t } = useTranslation()

  return <section id="fee-enquiry" className="fee-section bg-brand-navy text-white section-space"><div className="page-container grid items-center gap-12 lg:grid-cols-2">
    <div><span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-brand-navy-light px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-brand-gold-light"><span className="h-1.5 w-1.5 rounded-full bg-brand-gold" />{t('feeEnquirySection.directAdvisory')}</span><h2 className="fee-heading mt-5">{t('feeEnquirySection.readyFor')}<br /><span>2027–28?</span></h2><p className="mt-5 max-w-lg text-lg leading-relaxed text-white/75">{t('feeEnquirySection.getProgrammeDetailsFeeInformationAnd')}</p>
      <div className="mt-9 space-y-6"><a href={`tel:${site.phone}`} className="flex items-center gap-4"><span className="rounded-xl bg-brand-navy-light p-3 text-brand-gold"><Icon name="phone" /></span><span><span className="block text-[10px] font-semibold uppercase tracking-wider text-white/60">{t('feeEnquirySection.admissionsHotline')}</span><span className="mt-1 block text-sm font-bold">+91 {site.phoneDisplay}</span></span></a><WhatsAppCTA className="inline-flex items-center gap-4 text-sm font-semibold text-white/90">{t('feeEnquirySection.messageAcademicCounsellor')}</WhatsAppCTA><p className="flex items-start gap-4 text-sm leading-relaxed text-white/75"><Icon name="pin" className="h-5 w-5 shrink-0 text-brand-gold" />{t('common.address')}</p></div>
    </div>
    <div className="fee-form-card rounded-2xl p-6 text-brand-dark sm:p-9"><h3 className="font-serif text-2xl font-bold text-brand-navy">{t('feeEnquirySection.admissionsFeeRequest')}</h3><p className="mb-6 mt-2 text-sm text-brand-muted">{t('feeEnquirySection.tellUsALittleAboutYour')}</p><LeadForm mode="fee" /><WhatsAppCTA className="btn-outline mt-3 w-full text-xs">{t('feeEnquirySection.continueOnWhatsapp')}</WhatsAppCTA></div>
  </div></section>
}
