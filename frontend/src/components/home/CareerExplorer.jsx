import { useTranslation } from 'react-i18next'
import { useState } from 'react'


export default function CareerExplorer() {
  const { t } = useTranslation()

  const opportunities = [
  [t('careerExplorer.medicine'), ['PCMB'], 15, 12], [t('careerExplorer.biotechnology'), ['PCMB'], 50, 8], [t('careerExplorer.lifeSciences'), ['PCMB'], 85, 12],
  [t('careerExplorer.research'), ['PCMB'], 13, 35], [t('careerExplorer.computerScience'), ['PCMC'], 87, 35],
  [t('careerExplorer.aiMachineLearning'), ['PCMC'], 13, 58], [t('careerExplorer.dataScience'), ['PCMC'], 87, 58],
  [t('careerExplorer.cybersecurity'), ['PCMC'], 15, 81], [t('careerExplorer.electronics'), ['PCME'], 50, 85], [t('careerExplorer.semiconductors'), ['PCME'], 85, 81],
  [t('careerExplorer.embeddedSystems'), ['PCME'], 33, 32], [t('careerExplorer.robotics'), ['PCME'], 67, 32],
  [t('careerExplorer.engineering'), ['PCMB', 'PCMC', 'PCME'], 50, 66],
]
  const [selected, setSelected] = useState('PCMB')
  return <section className="career-section" aria-labelledby="career-title">
    <div className="page-container career-layout">
      <div className="career-intro"><p className="eyebrow">{t('careerExplorer.yourSubjectsYourPossibilities')}</p>
        <h2 id="career-title">{t('careerExplorer.whereCan')}<br /><span>{t('careerExplorer.thisTakeYou')}</span></h2>
        <p>{t('careerExplorer.exploreTheDirectionsEachScienceCombination')}</p>
        <div className="career-select" role="group" aria-label={t('careerExplorer.exploreCareerPathways')}>{['PCMB', 'PCMC', 'PCME'].map(stream => <button type="button" key={stream} aria-pressed={selected === stream} onMouseEnter={() => setSelected(stream)} onFocus={() => setSelected(stream)} onClick={() => setSelected(stream)}>{stream}</button>)}</div>
        <p className="career-hint">{t('careerExplorer.selectAStreamToTraceIts')}</p>
        <p className="sr-only" role="status">{selected}: {opportunities.filter(([, streams]) => streams.includes(selected)).map(([name]) => name).join(', ')}</p>
      </div>
      <div className="career-network" aria-label={t('careerExplorer.connections', { stream: selected })}>
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">{opportunities.map(([name, streams, x, y]) => <path key={name} className={streams.includes(selected) ? 'is-connected' : ''} d={`M50 48 Q${x} 48 ${x} ${y}`} />)}</svg>
        <div className="career-hub" aria-hidden="true">{selected}<span>{t('careerExplorer.yourPathway')}</span></div>
        <ul>{opportunities.map(([name, streams, x, y]) => <li key={name} className={`career-node ${streams.includes(selected) ? 'is-connected' : ''}`} style={{ '--x': `${x}%`, '--y': `${y}%` }}><span className="career-node-dot" aria-hidden="true" />{name}<span className="sr-only">{streams.includes(selected) ? t('careerExplorer.connected', { stream: selected }) : ''}</span></li>)}</ul>
      </div>
    </div>
  </section>
}
