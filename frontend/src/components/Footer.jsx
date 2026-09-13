import { Link } from 'react-router-dom'
import { site, navigation } from '../config/site'
import WhatsAppCTA from './WhatsAppCTA'
export default function Footer() {
  return <footer className="bg-brand-navy py-12 text-white"><div className="page-container">
    <div className="grid gap-10 md:grid-cols-3"><div><Link to="/" className="flex items-center gap-3"><img src={site.logo} alt="" width="44" height="44" className="rounded-full" /><span><span className="block font-serif text-xl font-bold">VRR Career Academy</span><span className="text-[9px] font-semibold uppercase tracking-widest text-brand-gold-light">PU Integrated Academy</span></span></Link><p className="mt-5 max-w-sm text-xs leading-relaxed text-white/65">Focused PU education and competitive-exam preparation in academic association with Shanthi Niketan PU College.</p></div>
    <div><p className="text-[10px] font-bold uppercase tracking-wider text-brand-gold-light">Programmes &amp; Academy</p><div className="mt-5 grid grid-cols-2 gap-3 text-xs text-white/75">{navigation.map(([label, id]) => <Link key={id} to={`/#${id}`} className="hover:text-white">{label}</Link>)}<Link to="/about" className="hover:text-white">About VRR</Link><Link to="/courses" className="hover:text-white">All Courses</Link></div></div>
    <div><p className="text-[10px] font-bold uppercase tracking-wider text-brand-gold-light">Admissions Desk</p><div className="mt-5 flex flex-col items-start gap-3 text-xs text-white/75"><a href={`tel:${site.phone}`}>+91 {site.phoneDisplay}</a><a href={`mailto:${site.email}`} className="break-all">{site.email}</a><WhatsAppCTA className="inline-flex items-center gap-2 text-xs" /></div></div></div>
    <div className="mt-10 border-t border-white/10 pt-6 text-[10px] leading-relaxed text-white/60">© {new Date().getFullYear()} VRR Career Academy. In academic association with Shanthi Niketan PU College.</div>
  </div></footer>
}
