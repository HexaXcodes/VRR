import { useEffect, useRef } from 'react'

export default function VisualJourney({ steps, variant = 'learning' }) {
  const ref = useRef(null)
  useEffect(() => {
    const element = ref.current
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        element.classList.add('journey-visible')
        observer.disconnect()
      }
    }, { threshold: .15 })
    observer.observe(element)
    return () => observer.disconnect()
  }, [])
  return <ol ref={ref} className={`visual-journey journey-${variant}`}>
    {steps.map(({ title, copy, label }, index) => <li key={title} style={{ '--stage': index }}>
      <span className="journey-number" aria-hidden="true">0{index + 1}</span>
      <span className="journey-point" aria-hidden="true" />
      {label && <p className="journey-label">{label}</p>}
      <h3>{title}</h3><p className="journey-copy">{copy}</p>
    </li>)}
  </ol>
}
