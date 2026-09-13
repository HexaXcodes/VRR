import { useEffect, useId, useRef, useState } from 'react'
import { submitLead, submitFeeStructureRequest, submitCampusVisitRequest, submitCounsellingRequest } from '../../services/api'
import Icon from '../Icon'

const services = { fee: submitFeeStructureRequest, visit: submitCampusVisitRequest, counselling: submitCounsellingRequest, admission: submitLead }
const buttonLabels = { fee: 'Get Fee Structure', visit: 'Request Campus Visit', counselling: 'Request Counselling', admission: 'Submit Admission Enquiry' }
const emptyValues = { studentName: '', parentName: '', phone: '', currentClass: 'other', interestedStream: 'Undecided', targetExam: 'Undecided', preferredDate: '', timeSlot: '' }

export default function LeadForm({ mode = 'fee', initialStream = 'Undecided', preferredCampus }) {
  const [values, setValues] = useState({ ...emptyValues, interestedStream: initialStream })
  const [status, setStatus] = useState('idle')
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState('')
  const prefix = useId()
  const controller = useRef(null)
  const summary = useRef(null)
  useEffect(() => () => controller.current?.abort(), [])
  const change = event => {
    const { name, value } = event.target
    setValues(previous => ({
      ...previous, [name]: value,
      ...(name === 'interestedStream' && ['PCMC', 'PCME'].includes(value) && previous.targetExam === 'NEET' ? { targetExam: 'Undecided' } : {}),
    }))
    setErrors(previous => ({ ...previous, [name]: undefined }))
    if (status !== 'loading') { setStatus('idle'); setMessage('') }
  }
  const submit = async event => {
    event.preventDefault()
    if (controller.current) return
    const invalid = {}
    if (values.studentName.trim().length < 2) invalid.studentName = 'Enter at least 2 characters.'
    if (!/^(?:\+91|91)?[6-9]\d{9}$/.test(values.phone.replace(/[\s()-]/g, ''))) invalid.phone = 'Enter a valid Indian mobile number.'
    if (Object.keys(invalid).length) {
      setErrors(invalid); setStatus('error'); setMessage('Please check the highlighted fields.')
      requestAnimationFrame(() => summary.current?.focus())
      return
    }
    const payload = {
      studentName: values.studentName.trim(), phone: values.phone.trim(),
      interestedStream: values.interestedStream, leadSource: 'website',
      ...(values.parentName.trim() ? { parentName: values.parentName.trim() } : {}),
    }
    if (mode === 'visit') {
      if (preferredCampus) payload.preferredCampus = preferredCampus
      if (values.preferredDate || values.timeSlot) payload.campusVisit = {
        ...(values.preferredDate ? { preferredDate: values.preferredDate } : {}),
        ...(values.timeSlot ? { timeSlot: values.timeSlot } : {}),
      }
    } else {
      payload.targetExam = values.targetExam
      if (mode !== 'fee') payload.currentClass = values.currentClass
      if (mode === 'admission') payload.requestType = 'admission'
    }
    const pending = new AbortController()
    controller.current = pending
    setStatus('loading'); setErrors({}); setMessage('')
    try {
      await services[mode](payload, { signal: pending.signal })
      if (pending.signal.aborted) return
      setStatus('success')
      setMessage('Thanks! Our admissions team will contact you shortly.')
      setValues({ ...emptyValues, interestedStream: initialStream })
      requestAnimationFrame(() => summary.current?.focus())
    } catch (error) {
      if (pending.signal.aborted) return
      const fieldErrors = Object.fromEntries((error.errors || []).map(item => [item.field?.replace('campusVisit.', ''), item.message === 'Invalid value' ? 'Please check this field.' : item.message]))
      setErrors(fieldErrors); setStatus('error')
      setMessage(error.message || 'Unable to send your request. Please try again or call our admissions team.')
      requestAnimationFrame(() => summary.current?.focus())
    } finally {
      controller.current = null
    }
  }
  const field = (name, label, options = {}) => {
    const id = `${prefix}-${name}`
    const common = { id, name, value: values[name], onChange: change, className: 'form-control', 'aria-invalid': !!errors[name], 'aria-describedby': errors[name] ? `${id}-error` : undefined }
    return <div className="min-w-0">
      <label className="mb-1.5 block text-xs font-bold text-brand-navy" htmlFor={id}>{label}{options.required ? ' *' : ''}</label>
      {options.choices ? <select {...common}>{options.choices.map(([value, text]) => <option key={value} value={value}>{text}</option>)}</select>
        : <input {...common} type={options.type || 'text'} autoComplete={options.autoComplete} required={options.required} minLength={name === 'studentName' ? 2 : undefined} maxLength={name === 'phone' ? 25 : 100} placeholder={options.placeholder} />}
      {errors[name] && <p id={`${id}-error`} className="mt-1 text-xs font-semibold text-brand-navy">{errors[name]}</p>}
    </div>
  }
  const streams = ['Undecided', 'PCMB', 'PCMC', 'PCME'].map(value => [value, value])
  const exams = ['Undecided', 'NEET', 'JEE', 'KCET', 'Boards', 'Multiple'].filter(value => value !== 'NEET' || !['PCMC', 'PCME'].includes(values.interestedStream)).map(value => [value, value === 'Boards' ? 'PU Boards' : value])
  return <form onSubmit={submit} className="space-y-4" aria-label={buttonLabels[mode]} aria-busy={status === 'loading'}>
    <fieldset disabled={status === 'loading'} className="min-w-0 space-y-4">
      <legend className="sr-only">Student and programme details</legend>
      {field('studentName', 'Student Name', { required: true, autoComplete: 'name', placeholder: "Enter student's full name" })}
      {field('parentName', 'Parent / Guardian Name', { autoComplete: 'section-parent name', placeholder: "Enter parent's full name" })}
      {field('phone', 'Mobile Number', { required: true, type: 'tel', autoComplete: 'tel', placeholder: '10-digit mobile number or +91' })}
      {mode === 'visit' ? <>
        {field('interestedStream', 'Interested Stream', { choices: streams })}
        <div className="grid gap-4 sm:grid-cols-2">
          {field('preferredDate', 'Preferred Date', { type: 'date' })}
          {field('timeSlot', 'Preferred Time', { choices: [['', 'No preference'], ['morning', 'Morning'], ['afternoon', 'Afternoon'], ['evening', 'Evening']] })}
        </div>
        <p className="text-xs leading-relaxed text-brand-muted">Your preferred slot is a request. Our team will contact you to confirm the visit.</p>
      </> : <>
        {mode !== 'fee' && field('currentClass', 'Current Class', { choices: [['other', 'Other / Prefer to discuss'], ...['9', '10', '11', '12'].map(value => [value, `Class ${value}`])] })}
        <div className="grid gap-4 sm:grid-cols-2">
          {field('interestedStream', 'Interested Stream', { choices: streams })}
          {field('targetExam', 'Target Exam', { choices: exams })}
        </div>
      </>}
    </fieldset>
    {message && <div ref={summary} tabIndex={-1} role={status === 'error' ? 'alert' : 'status'} className="rounded-xl border border-brand-gold bg-brand-gold-light p-4 text-sm font-medium text-brand-navy">{message}</div>}
    <button type="submit" disabled={status === 'loading'} className="btn-gold w-full">
      <Icon name={status === 'success' ? 'check' : mode === 'visit' ? 'calendar' : 'arrow'} />
      {status === 'loading' ? 'Submitting…' : buttonLabels[mode]}
    </button>
    <p className="text-[11px] leading-relaxed text-brand-muted">By submitting, you agree to be contacted by VRR about your admissions enquiry.</p>
  </form>
}
