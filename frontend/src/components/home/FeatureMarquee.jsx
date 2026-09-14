import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import Icon from '../Icon'

function MarqueeRow({ items, reverse, paused }) {
  return <div className="marquee-row"><div className={`marquee-track ${reverse ? 'marquee-reverse' : ''} ${paused ? 'is-paused' : ''}`}>
    {[0, 1].map(copy => <div key={copy} className="marquee-group" aria-hidden={copy === 1 ? true : undefined}>{items.map((item, index) => (reverse ? [0, 4] : [0, 3, 7]).includes(index) ? <span key={index} className="marquee-word">{item}<span aria-hidden="true">✳</span></span> : <span key={index} className="marquee-pill"><span className="text-brand-gold"><Icon name={['cap', 'book', 'chart', 'check', 'people', 'chat', 'calendar'][index % 7]} className="h-4 w-4" /></span>{item}</span>)}</div>)}
  </div></div>
}
export default function FeatureMarquee() {
  const { t } = useTranslation()

  const rows = [
  [t('featureMarquee.concepts'), t('featureMarquee.expertFaculty'), t('featureMarquee.integratedPreparation'), t('featureMarquee.practice'), t('featureMarquee.chapterWiseTesting'), t('featureMarquee.omrPractice'), t('featureMarquee.doubtClearing'), t('featureMarquee.testing'), t('featureMarquee.parentUpdates'), t('featureMarquee.performanceAnalysis')],
  [t('featureMarquee.mentoring'), t('featureMarquee.academicCounselling'), t('featureMarquee.puCompetitivePrep'), t('featureMarquee.mentoringDetail'), t('featureMarquee.guidance'), t('featureMarquee.revisionSupport'), t('featureMarquee.streamGuidance'), t('featureMarquee.campusVisit'), t('featureMarquee.entranceAssessment')],
]
  const [paused, setPaused] = useState(false)
  return <div className="feature-marquee border-b border-brand-border bg-brand-bg py-4" aria-label={t('featureMarquee.academicFeatures')}>
    <div className="space-y-3">{rows.map((items, index) => <MarqueeRow key={index} items={items} reverse={index === 1} paused={paused} />)}</div>
    <div className="page-container mt-2 flex justify-end"><button type="button" onClick={() => setPaused(value => !value)} aria-pressed={paused} className="marquee-toggle rounded px-2 py-1 text-[10px] font-semibold text-brand-muted hover:text-brand-navy">{paused ? t('featureMarquee.playFeatureStrip') : t('featureMarquee.pauseFeatureStrip')}</button></div>
  </div>
}
