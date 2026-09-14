export default function PathwayMotif({ stream }) {
  return <svg className="pathway-motif" viewBox="0 0 240 180" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true">
    {stream === 'PCMB' ? <><path d="m45 50 50-28 50 28v58l-50 28-50-28Zm100 0 50-28 40 28v58l-40 28-50-28M95 22v-20M45 80H10m85 56v35" />{[[45,50],[95,22],[145,50],[145,108],[95,136],[45,108],[195,22],[195,136]].map(([x,y]) => <circle key={`${x}-${y}`} cx={x} cy={y} r="7" />)}</> : stream === 'PCMC' ? <><path d="M20 20h200v130H20Zm0 25h200M80 150v25m80-25v25M55 175h130M65 70 45 90l20 20m110-40 20 20-20 20m-45-45-20 50" /><path d="M30 30h5m10 0h5m10 0h5" /></> : <><rect x="85" y="55" width="70" height="70" rx="8" /><rect x="100" y="70" width="40" height="40" rx="3" /><path d="M100 55V20H30m95 35V5m15 50V30h70M85 70H40V40m45 50H10m75 20H30v45m70-30v40m25-40v50m15-50v25h60m-45-40h60m-60-20h35V55m-35 15h70" /></>}
  </svg>
}
