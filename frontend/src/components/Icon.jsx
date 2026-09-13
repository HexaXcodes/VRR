const paths = {
  arrow: 'M4 12h16m-6-6 6 6-6 6',
  book: 'M12 5v15M3 4c4-1 6 0 9 2 3-2 5-3 9-2v14c-4-1-6 0-9 2-3-2-5-3-9-2Z',
  cap: 'm2 9 10-5 10 5-10 5Zm4 3v5c4 3 8 3 12 0v-5m4-3v8',
  check: 'm5 12 4 4L19 6',
  calendar: 'M5 5h14v16H5ZM8 2v6m8-6v6M5 11h14m-10 4h2m3 0h2',
  chart: 'M4 3v17h17M8 16v-5m5 5V7m5 9V4',
  people: 'M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7 9v-2a7 7 0 0 1 14 0v2m0-16a4 4 0 0 1 0 8m3 3c2 1 3 3 3 5',
  phone: 'M5 3 3 5c0 8 8 16 16 16l2-2-4-5-3 2c-3-1-5-3-6-6l2-3Z',
  chat: 'M21 11a9 9 0 0 1-9 9 10 10 0 0 1-4-1l-5 2 1-5a9 9 0 1 1 17-5ZM8 10h8m-8 4h5',
  pin: 'M19 9c0 6-7 12-7 12S5 15 5 9a7 7 0 1 1 14 0Zm-7-3a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z',
  mail: 'M3 5h18v14H3Zm0 0 9 8 9-8',
  building: 'M5 21V3h14v18M2 21h20M9 7h1m4 0h1m-6 4h1m4 0h1m-5 10v-5h4v5',
  close: 'm6 6 12 12M6 18 18 6',
  menu: 'M4 6h16M4 12h16M4 18h16',
  chevron: 'm6 9 6 6 6-6',
  medal: 'm8 3 4 5 4-5M7 13a5 5 0 1 0 10 0 5 5 0 0 0-10 0Zm3 5-1 4 3-2 3 2-1-4',
}
export default function Icon({ name = 'book', className = 'h-5 w-5' }) {
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[name] || paths.book} /></svg>
}
