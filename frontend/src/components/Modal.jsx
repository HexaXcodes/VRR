import { useTranslation } from 'react-i18next'
import { useEffect, useId, useRef } from 'react'
import { createPortal } from 'react-dom'
import Icon from './Icon'

export default function Modal({ title, onClose, children, className = '', trapFocus = false }) {
  const { t } = useTranslation()

  const dialogRef = useRef(null)
  const titleId = useId()
  useEffect(() => {
    const dialog = dialogRef.current
    const trigger = document.activeElement
    const previousOverflow = document.body.style.overflow
    dialog.showModal()
    document.body.style.overflow = 'hidden'
    return () => {
      dialog.close()
      document.body.style.overflow = previousOverflow
      if (trigger instanceof HTMLElement && trigger.isConnected) trigger.focus({ preventScroll: true })
    }
  }, [])
  return createPortal(
    <dialog ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby={titleId}
      className={`admissions-dialog ${className}`}
      onKeyDown={event => {
        if (!trapFocus || event.key !== 'Tab') return
        const focusable = [...event.currentTarget.querySelectorAll('button:not(:disabled), a[href], input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex="0"]')].filter(element => element.getClientRects().length)
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus() }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus() }
      }}
      onCancel={event => { event.preventDefault(); onClose() }}
      onClick={event => {
        if (event.target !== event.currentTarget) return
        const rect = event.currentTarget.getBoundingClientRect()
        if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) onClose()
      }}>
      <div className="flex items-start justify-between gap-4 border-b border-brand-border pb-5">
        <h2 id={titleId} className="font-serif text-2xl font-semibold text-brand-navy sm:text-3xl">{title}</h2>
        <button type="button" onClick={onClose} aria-label={t('modal.closeDialog')} className="shrink-0 rounded-full border border-brand-border p-2.5 hover:bg-brand-neutral"><Icon name="close" /></button>
      </div>
      <div className="pt-6">{children}</div>
    </dialog>, document.body,
  )
}
