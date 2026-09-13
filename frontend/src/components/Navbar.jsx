import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { site, navigation } from '../config/site'
import Icon from './Icon'
export default function Navbar() {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const toggle = useRef(null)
  useEffect(() => { setOpen(false) }, [location])
  useEffect(() => {
    if (!open) return
    const close = event => { if (event.key === 'Escape') { setOpen(false); toggle.current?.focus() } }
    document.addEventListener('keydown', close)
    return () => document.removeEventListener('keydown', close)
  }, [open])
  return <header className="sticky top-0 z-40 border-b border-brand-border bg-brand-bg/95 backdrop-blur-md">
    <div className="page-container flex h-20 items-center justify-between gap-3">
      <Link to="/" className="flex min-w-0 shrink-0 items-center gap-2.5" aria-label="VRR Career Academy home"><img src={site.logo} alt="" width="44" height="44" className="h-10 w-10 rounded-full" /><span><span className="block font-serif text-base font-bold leading-tight text-brand-navy sm:text-xl">VRR Career Academy</span><span className="mt-0.5 block text-[8px] font-bold uppercase tracking-widest text-brand-gold-hover sm:text-[9px]">PU Integrated Academy</span></span></Link>
      <nav aria-label="Main navigation" className="hidden items-center gap-5 xl:flex">{navigation.map(([label, id]) => <Link key={id} to={`/#${id}`} className="text-xs font-semibold text-brand-muted hover:text-brand-navy">{label}</Link>)}</nav>
      <div className="flex shrink-0 items-center gap-2 sm:gap-4"><a href={`tel:${site.phone}`} className="hidden items-center gap-2 text-xs font-bold text-brand-navy xl:inline-flex"><Icon name="phone" className="h-4 w-4" />Call Us</a><Link to="/#fee-enquiry" className="rounded-lg bg-brand-gold px-3 py-2.5 text-[11px] font-bold text-brand-navy hover:bg-brand-gold-hover sm:px-4"><span className="hidden sm:inline">Enquire Now</span><span className="sm:hidden">Enquire</span></Link><button ref={toggle} type="button" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="mobile-navigation" className="rounded-lg p-2 text-brand-navy xl:hidden" onClick={() => setOpen(value => !value)}><Icon name={open ? 'close' : 'menu'} /></button></div>
    </div>
    {open && <nav id="mobile-navigation" aria-label="Mobile navigation" className="max-h-[calc(100dvh-160px)] overflow-y-auto border-t border-brand-border bg-brand-bg px-5 py-4 xl:hidden">{navigation.map(([label, id]) => <Link onClick={() => setOpen(false)} key={id} to={`/#${id}`} className="block rounded-lg px-3 py-3 text-sm font-semibold text-brand-navy hover:bg-brand-neutral">{label}</Link>)}<a className="block px-3 py-3 text-sm font-semibold" href={`tel:${site.phone}`}>Call {site.phoneDisplay}</a></nav>}
  </header>
}
