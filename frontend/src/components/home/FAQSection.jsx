import Icon from '../Icon'
const questions = [
  ['Is VRR a PU college or coaching academy?', 'VRR Career Academy offers integrated academic and competitive-exam preparation in academic association with Shanthi Niketan PU College. Our admissions team can explain the programme and enrolment process.'],
  ['Which combinations are offered?', 'PCMB (Physics, Chemistry, Mathematics, Biology), PCMC (Physics, Chemistry, Mathematics, Computer Science) and PCME (Physics, Chemistry, Mathematics, Electronics).'],
  ['Is KCET / JEE / NEET preparation integrated?', 'The integrated programme combines PU Boards with competitive-exam preparation. NEET preparation is offered with PCMB; discuss the right pathway for your goals with an academic counsellor.'],
  ['How often are tests conducted?', 'Testing includes chapter-wise assessments, MCQs and OMR practice. Ask our team for the current programme schedule.'],
  ['Can parents receive progress updates?', 'Parent communication and academic progress discussions are part of the learning approach. Our team can explain how updates are shared.'],
  ['When are classes conducted?', 'Please contact the admissions team for the timetable applicable to your programme and intake.'],
  ['How can I get the fee structure?', 'Submit the fee enquiry form on this page. Our admissions team will contact you with programme and fee information.'],
  ['Can I book a campus visit?', 'Yes. Use Book Campus Visit to share your preferred date and time. Our team will contact you to confirm the arrangements.'],
]
export default function FAQSection() {
  return <section id="faq" className="page-container section-space"><div className="mx-auto max-w-4xl"><div className="text-center"><p className="eyebrow">Clear Answers</p><h2 className="section-heading mt-3">Frequently Asked Questions</h2><p className="mt-3 text-sm text-brand-muted">Key facts about VRR Career Academy integrated programmes.</p></div><div className="mt-9 space-y-3">{questions.map(([question, answer]) => <details key={question} className="group rounded-2xl border border-brand-border bg-brand-neutral p-5"><summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-bold text-brand-navy">{question}<Icon name="chevron" className="h-4 w-4 shrink-0 transition-transform group-open:rotate-180" /></summary><p className="mt-4 text-sm leading-relaxed text-brand-muted">{answer}</p></details>)}</div></div></section>
}
