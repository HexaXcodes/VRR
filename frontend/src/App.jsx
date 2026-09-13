import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import MobileCTA from './components/home/MobileCTA'
const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const VRRCourses = lazy(() => import('./pages/VRRCourses'))
export default function App() {
  return <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
    <div className="site-shell flex min-h-screen flex-col">
      <a href="#main-content" className="sr-only fixed left-4 top-4 z-50 rounded bg-white p-3 text-brand-navy focus:not-sr-only">Skip to content</a>
      <Navbar />
      <main id="main-content" tabIndex={-1} className="flex-1">
        <Suspense fallback={<div className="page-container py-24 text-brand-muted" role="status">Loading…</div>}>
          <Routes><Route path="/" element={<Home />} /><Route path="/about" element={<About />} /><Route path="/courses" element={<VRRCourses />} /></Routes>
        </Suspense>
      </main>
      <Footer /><MobileCTA />
    </div>
  </BrowserRouter>
}
