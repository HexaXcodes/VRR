import { useTranslation } from 'react-i18next'
import { useEffect, useId, useRef, useState } from 'react'
import { submitLead, submitFeeStructureRequest, submitCampusVisitRequest, submitCounsellingRequest } from '../../services/api'
import Icon from '../Icon'

const services = { fee: submitFeeStructureRequest, visit: submitCampusVisitRequest, counselling: submitCounsellingRequest, admission: submitLead }

const emptyValues = { studentName: '', parentName: '', phone: '', currentClass: 'other', interestedStream: 'Undecided', targetExam: 'Undecided', preferredDate: '', timeSlot: '' }

export default function LeadForm({ mode = 'fee', initialStream = 'Undecided', preferredCampus }) {
  const { t, i18n } = useTranslation()

  const buttonLabels = { fee: t('forms.getFeeStructure'), visit: t('forms.requestCampusVisit'), counselling: t('forms.requestCounselling'), admission: t('forms.submitAdmissionEnquiry') }
  const [values, setValues] = useState({ ...emptyValues, interestedStream: initialStream })
  const [status, setStatus] = useState('idle')
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState('')
  const prefix = useId()
  const controller = useRef(null)
  const summary = useRef(null)
  useEffect(() => () => controller.current?.abort(), [])
  const change = event => {
    event.target.setCustomValidity?.('')
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
    if (values.studentName.trim().length < 2) invalid.studentName = 'forms.enterAtLeast2Characters'
    if (!/^(?:\+91|91)?[6-9]\d{9}$/.test(values.phone.replace(/[\s()-]/g, ''))) invalid.phone = 'forms.enterAValidIndianMobileNumber'
    if (Object.keys(invalid).length) {
      setErrors(invalid); setStatus('error'); setMessage('forms.pleaseCheckTheHighlightedFields')
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
      setMessage('forms.thanksOurAdmissionsTeamWillContact')
      setValues({ ...emptyValues, interestedStream: initialStream })
      requestAnimationFrame(() => summary.current?.focus())
    } catch (error) {
      if (pending.signal.aborted) return
      const fieldErrors = Object.fromEntries((error.errors || []).map(item => [item.field?.replace('campusVisit.', ''), { field: item.field, text: item.message }]))
      setErrors(fieldErrors); setStatus('error')
      setMessage({ text: error.message, status: error.status })
      requestAnimationFrame(() => summary.current?.focus())
    } finally {
      controller.current = null
    }
  }
  const feedback = value => {
    if (typeof value === 'string') return t(value)
    if (value?.text?.startsWith('Enter a valid Indian mobile number')) return t('forms.enterAValidIndianMobileNumber')
    if (value?.field) return i18n.resolvedLanguage === 'en' && value.text !== 'Invalid value' ? value.text : t('messages.invalidField')
    if (value?.status === 429) return t('messages.rateLimit')
    if (value?.status === 400 || value?.status === 422) return t('messages.validation')
    if (value?.text?.includes('timed out')) return t('messages.timeout')
    return t('messages.network')
  }
  const optionLabel = value => ({ Undecided: t('common.undecided'), Boards: t('common.boards'), Multiple: t('common.multiple') })[value] || value
  const field = (name, label, options = {}) => {
    const id = `${prefix}-${name}`
    const common = { id, name, value: values[name], onChange: change, className: 'form-control', 'aria-invalid': !!errors[name], 'aria-describedby': errors[name] ? `${id}-error` : undefined }
    return <div className="min-w-0">
      <label className="mb-1.5 block text-xs font-bold text-brand-navy" htmlFor={id}>{label}{options.required ? ' *' : ''}</label>
      {options.choices ? <select {...common}>{options.choices.map(([value, text]) => <option key={value} value={value}>{text}</option>)}</select>
        : <input {...common} onInvalid={event => event.target.setCustomValidity(t(name === 'studentName' ? 'forms.enterAtLeast2Characters' : name === 'phone' ? 'forms.enterAValidIndianMobileNumber' : 'messages.invalidField'))} type={options.type || 'text'} autoComplete={options.autoComplete} required={options.required} minLength={name === 'studentName' ? 2 : undefined} maxLength={name === 'phone' ? 25 : 100} placeholder={options.placeholder} />}
      {errors[name] && <p id={`${id}-error`} className="mt-1 text-xs font-semibold text-brand-navy">{feedback(errors[name])}</p>}
    </div>
  }
  const streams = ['Undecided', 'PCMB', 'PCMC', 'PCME'].map(value => [value, optionLabel(value)])
  const exams = ['Undecided', 'NEET', 'JEE', 'KCET', 'Boards', 'Multiple'].filter(value => value !== 'NEET' || !['PCMC', 'PCME'].includes(values.interestedStream)).map(value => [value, optionLabel(value)])
  return <form onSubmit={submit} className="space-y-4" aria-label={buttonLabels[mode]} aria-busy={status === 'loading'}>
    <fieldset disabled={status === 'loading'} className="min-w-0 space-y-4">
      <legend className="sr-only">{t('forms.studentAndProgrammeDetails')}</legend>
      {field('studentName', t('forms.studentName'), { required: true, autoComplete: 'name', placeholder: t('forms.enterStudentSFullName') })}
      {field('parentName', t('forms.parentGuardianName'), { autoComplete: 'section-parent name', placeholder: t('forms.enterParentSFullName') })}
      {field('phone', t('forms.mobileNumber'), { required: true, type: 'tel', autoComplete: 'tel', placeholder: t('forms.mobilePlaceholder') })}
      {mode === 'visit' ? <>
        {field('interestedStream', t('forms.interestedStream'), { choices: streams })}
        <div className="grid gap-4 sm:grid-cols-2">
          {field('preferredDate', t('forms.preferredDate'), { type: 'date' })}
          {field('timeSlot', t('forms.preferredTime'), { choices: [['', t('forms.noPreference')], ['morning', t('forms.morning')], ['afternoon', t('forms.afternoon')], ['evening', t('forms.evening')]] })}
        </div>
        <p className="text-xs leading-relaxed text-brand-muted">{t('forms.yourPreferredSlotIsARequest')}</p>
      </> : <>
        {mode !== 'fee' && field('currentClass', t('forms.currentClass'), { choices: [['other', t('forms.otherPreferToDiscuss')], ...['9', '10', '11', '12'].map(value => [value, t('forms.classLabel', { value })])] })}
        <div className="grid gap-4 sm:grid-cols-2">
          {field('interestedStream', t('forms.interestedStream'), { choices: streams })}
          {field('targetExam', t('forms.targetExam'), { choices: exams })}
        </div>
      </>}
    </fieldset>
    {message && <div ref={summary} tabIndex={-1} role={status === 'error' ? 'alert' : 'status'} className="rounded-xl border border-brand-gold bg-brand-gold-light p-4 text-sm font-medium text-brand-navy">{feedback(message)}</div>}
    <button type="submit" disabled={status === 'loading'} className="btn-gold w-full">
      <Icon name={status === 'success' ? 'check' : mode === 'visit' ? 'calendar' : 'arrow'} />
      {status === 'loading' ? t('forms.submitting') : buttonLabels[mode]}
    </button>
    <p className="text-[11px] leading-relaxed text-brand-muted">{t('forms.bySubmittingYouAgreeToBe')}</p>
  </form>
}
