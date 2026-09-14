import { useId } from 'react'
import { useTranslation } from 'react-i18next'

export default function LanguageSelector() {
  const { t, i18n } = useTranslation()
  const id = useId()
  return <div className="language-selector">
    <label htmlFor={id} className="sr-only">{t('nav.language')}</label>
    <select id={id} value={i18n.resolvedLanguage} onChange={event => i18n.changeLanguage(event.target.value)}>
      <option value="en" lang="en">English</option>
      <option value="kn" lang="kn">ಕನ್ನಡ</option>
      <option value="hi" lang="hi">हिन्दी</option>
    </select>
  </div>
}
