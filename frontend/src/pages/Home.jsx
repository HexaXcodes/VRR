import { useTranslation } from 'react-i18next'
import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigationType } from 'react-router-dom'
import HeroSection from '../components/home/HeroSection'
import TrustStrip from '../components/home/TrustStrip'
import FeatureMarquee from '../components/home/FeatureMarquee'
import WhyVRR from '../components/home/WhyVRR'
import StudentSupport from '../components/home/StudentSupport'
import Pathways from '../components/home/Pathways'
import LearningSystem from '../components/home/LearningSystem'
import FacultySection from '../components/home/FacultySection'
import ResultsSection from '../components/home/ResultsSection'
import CampusSection from '../components/home/CampusSection'
import AdmissionsProcess from '../components/home/AdmissionsProcess'
import FeeEnquirySection from '../components/home/FeeEnquirySection'
import FAQSection from '../components/home/FAQSection'
import ContactSection from '../components/home/ContactSection'
import CampusVisitModal from '../components/forms/CampusVisitModal'
import CounsellingModal from '../components/forms/CounsellingModal'
import AdmissionEnquiryModal from '../components/forms/AdmissionEnquiryModal'
import PathwayModal from '../components/PathwayModal'
import CareerExplorer from '../components/home/CareerExplorer'

export default function Home() {
  const { t } = useTranslation()

  const [interaction, setInteraction] = useState(null)
  const location = useLocation()
  const navigationType = useNavigationType()
  const initialNavigation = useRef(true)
  useEffect(() => {
    document.title = t('home.vrrCareerAcademyPuIntegratedAdmissions')
  }, [t])
  useEffect(() => {
    const isInitial = initialNavigation.current
    initialNavigation.current = false
    // Native anchors and Back/Forward already scroll through the browser.
    // Retain scroll setup for initial loads and router-driven links.
    if (!isInitial && navigationType === 'POP') return
    const id = location.hash.slice(1)
    if (id) requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView())
    else window.scrollTo(0, 0)
  }, [location, navigationType])
  const onVisit = preferredCampus => setInteraction({ type: 'visit', preferredCampus })
  const onCounselling = initialStream => setInteraction({ type: 'counselling', initialStream })
  return <div className="v2-home">
    <HeroSection onVisit={onVisit} /><TrustStrip /><FeatureMarquee /><WhyVRR /><StudentSupport />
    <Pathways onCounselling={onCounselling} onExplore={stream => setInteraction({ type: 'pathway', stream })} /><CareerExplorer /><LearningSystem />
    <FacultySection /><ResultsSection /><CampusSection onVisit={onVisit} />
    <AdmissionsProcess onAdmission={() => setInteraction({ type: 'admission' })} />
    <FeeEnquirySection /><FAQSection /><ContactSection />
    {interaction?.type === 'visit' && <CampusVisitModal preferredCampus={interaction.preferredCampus} onClose={() => setInteraction(null)} />}
    {interaction?.type === 'pathway' && <PathwayModal stream={interaction.stream} onClose={() => setInteraction(null)} onCounselling={onCounselling} />}
    {interaction?.type === 'counselling' && <CounsellingModal initialStream={interaction.initialStream} onClose={() => setInteraction(null)} />}
    {interaction?.type === 'admission' && <AdmissionEnquiryModal onClose={() => setInteraction(null)} />}
  </div>
}
