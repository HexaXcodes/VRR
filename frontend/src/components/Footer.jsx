import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { site, navigation } from '../config/site'
import WhatsAppCTA from './WhatsAppCTA'
export default function Footer() {
  const { t } = useTranslation()

  return <footer className="bg-brand-navy py-12 text-white"><div className="page-container">
    <div className="grid gap-10 md:grid-cols-3"><div><Link to="/" className="flex items-center gap-3"><img src={site.logo} alt="" width="44" height="44" className="rounded-full" /><span><span className="block font-serif text-xl font-bold">VRR Career Academy</span><span className="text-[9px] font-semibold uppercase tracking-widest text-brand-gold-light">{t('footer.puIntegratedAcademy')}</span></span></Link><p className="mt-5 max-w-sm text-xs leading-relaxed text-white/65">{t('footer.focusedPuEducationAndCompetitiveExam')}</p></div>
    <div><p className="text-[10px] font-bold uppercase tracking-wider text-brand-gold-light">{t('footer.programmesAcademy')}</p><div className="mt-5 grid grid-cols-2 gap-3 text-xs text-white/75">{navigation.map(([, id]) => <Link key={id} to={`/#${id}`} className="hover:text-white">{t(`nav.${id}`)}</Link>)}<Link to="/about" className="hover:text-white">{t('footer.aboutVrr')}</Link><Link to="/courses" className="hover:text-white">{t('footer.allCourses')}</Link></div></div>
    <div><p className="text-[10px] font-bold uppercase tracking-wider text-brand-gold-light">{t('footer.admissionsDesk')}</p><div className="mt-5 flex flex-col items-start gap-3 text-xs text-white/75"><a href={`tel:${site.phone}`}>+91 {site.phoneDisplay}</a><a href={`mailto:${site.email}`} className="break-all">{site.email}</a><WhatsAppCTA className="inline-flex items-center gap-2 text-xs" /></div></div></div>
    <div className="mt-10 border-t border-white/10 pt-6 text-[10px] leading-relaxed text-white/60">© {new Date().getFullYear()}{t('footer.vrrCareerAcademyInAcademicAssociation')}</div>
  </div></footer>
}
