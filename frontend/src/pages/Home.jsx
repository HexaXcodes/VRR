import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import HeroSection from '../components/home/HeroSection'
import TrustStrip from '../components/home/TrustStrip'
import FeatureMarquee from '../components/home/FeatureMarquee'
import WhyVRR from '../components/home/WhyVRR'
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

export default function Home() {
  const [interaction, setInteraction] = useState(null)
  const location = useLocation()
  useEffect(() => {
    document.title = 'VRR Career Academy | PU Integrated Admissions 2027–28'
  }, [])
  useEffect(() => {
    const id = location.hash.slice(1)
    if (id) requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView())
    else window.scrollTo(0, 0)
  }, [location])
  const onVisit = preferredCampus => setInteraction({ type: 'visit', preferredCampus })
  const onCounselling = initialStream => setInteraction({ type: 'counselling', initialStream })
  return <>
    <HeroSection onVisit={onVisit} /><TrustStrip /><FeatureMarquee /><WhyVRR />
    <Pathways onCounselling={onCounselling} onExplore={stream => setInteraction({ type: 'pathway', stream })} /><FeatureMarquee /><LearningSystem />
    <FacultySection /><FeatureMarquee /><ResultsSection /><CampusSection onVisit={onVisit} />
    <FeatureMarquee /><AdmissionsProcess onAdmission={() => setInteraction({ type: 'admission' })} />
    <FeeEnquirySection /><FAQSection /><ContactSection />
    {interaction?.type === 'visit' && <CampusVisitModal preferredCampus={interaction.preferredCampus} onClose={() => setInteraction(null)} />}
    {interaction?.type === 'pathway' && <PathwayModal stream={interaction.stream} onClose={() => setInteraction(null)} onCounselling={onCounselling} />}
    {interaction?.type === 'counselling' && <CounsellingModal initialStream={interaction.initialStream} onClose={() => setInteraction(null)} />}
    {interaction?.type === 'admission' && <AdmissionEnquiryModal onClose={() => setInteraction(null)} />}
  </>
}
