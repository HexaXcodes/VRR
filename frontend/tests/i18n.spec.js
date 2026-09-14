import { test, expect } from '@playwright/test'
import fs from 'node:fs'

const locales = Object.fromEntries(['en', 'kn', 'hi'].map(lang => [lang, JSON.parse(fs.readFileSync(new URL(`../src/i18n/locales/${lang}.json`, import.meta.url), 'utf8'))]))
const leafEntries = (object, prefix = '') => Object.entries(object).flatMap(([key, value]) => typeof value === 'object' ? leafEntries(value, `${prefix}${key}.`) : [[`${prefix}${key}`, value]])

test.beforeEach(async ({ context }) => {
  // Real API, separate quota from the English regression suite. Page-level
  // failure mocks still take precedence over this context-level forwarding.
  await context.route('**/api/leads**', route => route.continue({ url: route.request().url().replace(':5099/', ':5100/') }))
})

test('locale catalogs have matching keys, interpolation and canonical academic codes', () => {
  const english = leafEntries(locales.en)
  for (const lang of ['kn', 'hi']) {
    const translated = Object.fromEntries(leafEntries(locales[lang]))
    expect(Object.keys(translated).sort()).toEqual(english.map(([key]) => key).sort())
    for (const [key, value] of english) {
      expect(translated[key].trim(), key).not.toBe('')
      expect(translated[key].match(/{{\w+}}/g) || [], key).toEqual(value.match(/{{\w+}}/g) || [])
      for (const code of ['PCMB', 'PCMC', 'PCME', 'JEE', 'NEET', 'KCET']) {
        if (value.includes(code)) expect(translated[key], key).toContain(code)
      }
    }
  }
})

async function open(page) {
  await page.goto('/')
  await expect(page.locator('h1')).toBeVisible()
  await page.evaluate(() => document.fonts.ready)
}
async function selectLanguage(page, lang) {
  const menu = page.locator('[aria-controls="mobile-navigation"]')
  if (await menu.isVisible() && await menu.getAttribute('aria-expanded') !== 'true') await menu.click()
  const selector = page.locator('.language-selector select:visible')
  await selector.selectOption(lang)
  await expect(page.locator('html')).toHaveAttribute('lang', lang)
  if (await menu.isVisible()) await page.keyboard.press('Escape')
}
async function basics(form) {
  await form.locator('[name="studentName"]').fill('Multilingual Test Student')
  await form.locator('[name="parentName"]').fill('Test Parent')
  await form.locator('[name="phone"]').fill('9876543210')
}

for (const width of [375, 430, 768, 1024, 1440]) {
  for (const lang of ['en', 'kn', 'hi']) {
    test(`${lang} layout, translated content and console at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 })
      const errors = []
      page.on('pageerror', error => errors.push(error.message))
      page.on('console', entry => { if (entry.type() === 'error') errors.push(entry.text()) })
      await open(page)
      await selectLanguage(page, lang)
      const copy = locales[lang]
      await expect(page.locator('.hero-statement')).toHaveText(copy.hero.oneFocusedAcademicSystem)
      await expect(page.locator('#pathways h2')).toHaveText(copy.pathways.chooseYourPathway)
      await expect(page.locator('.why-panel-4 h3')).toHaveText(copy.whyVrr.studentCentredLearning)
      await expect(page.locator('#fee-enquiry label').first()).toHaveText(`${copy.forms.studentName} *`)
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
      const clipped = await page.locator('h1,h2,h3,.why-panel,.pathway-panel,.btn-gold,.btn-navy,.btn-outline').evaluateAll(nodes => nodes.filter(node => node.clientWidth && node.scrollWidth > node.clientWidth + 2).map(node => node.textContent))
      expect(clipped).toEqual([])
      if (lang !== 'en') expect(await page.locator('.hero-statement').evaluate(el => getComputedStyle(el).fontFamily)).toContain(lang === 'kn' ? 'Noto Sans Kannada' : 'Noto Sans Devanagari')
      const trigger = page.locator('.pathway-panel button').nth(1)
      await trigger.click()
      const dialog = page.getByRole('dialog')
      await expect(dialog.getByRole('heading', { level: 2 })).toContainText(copy.pathways.pcmc.title)
      expect(await dialog.evaluate(el => el.scrollWidth <= el.clientWidth + 1 && el.getBoundingClientRect().width <= innerWidth)).toBe(true)
      await page.keyboard.press('Escape')
      await expect(trigger).toBeFocused()
      await page.screenshot({ path: `test-results/i18n-${lang}-${width}.png`, fullPage: true })
      expect(errors).toEqual([])
    })
  }
}

for (const width of [375, 1440]) {
  test(`instant switching, keyboard selector and refresh persistence at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 })
    await open(page)
    await expect(page.locator('html')).toHaveAttribute('lang', 'en')
    await page.evaluate(() => { window.languageTestMarker = 'same-document' })
    await page.locator('#faq summary').first().click()
    const form = page.locator('#fee-enquiry form')
    await basics(form)
    for (const lang of ['kn', 'hi', 'en']) {
      await selectLanguage(page, lang)
      expect(await page.evaluate(() => window.languageTestMarker)).toBe('same-document')
      expect(await page.evaluate(() => localStorage.getItem('vrr-language'))).toBe(lang)
      await expect(form.locator('[name="studentName"]')).toHaveValue('Multilingual Test Student')
      await expect(page.locator('#faq details').first()).toHaveAttribute('open', '')
    }
    await selectLanguage(page, 'hi')
    await page.reload()
    await expect(page.locator('html')).toHaveAttribute('lang', 'hi')
    await expect(page.locator('.hero-statement')).toHaveText(locales.hi.hero.oneFocusedAcademicSystem)
    if (width < 1280) await page.locator('[aria-controls="mobile-navigation"]').click()
    const selector = page.locator('.language-selector select:visible')
    await selector.focus()
    await page.keyboard.press('ArrowUp')
    await page.keyboard.press('Enter')
    await expect(page.locator('html')).toHaveAttribute('lang', 'kn')
    await expect(selector).toBeFocused()
  })
}

for (const lang of ['kn', 'hi']) {
  test(`${lang} native validation, loading and server feedback are translated`, async ({ page }) => {
    await open(page)
    await selectLanguage(page, lang)
    const copy = locales[lang]
    const form = page.locator('#fee-enquiry form')
    await form.getByRole('button').click()
    expect(await form.locator('[name="studentName"]').evaluate(el => el.validationMessage)).toBe(copy.forms.enterAtLeast2Characters)
    await basics(form)
    let release
    await page.route('**/api/leads/fee-structure', async route => {
      await new Promise(resolve => { release = resolve })
      await route.fulfill({ status: 400, contentType: 'application/json', body: JSON.stringify({ message: 'Validation failed', errors: [{ field: 'phone', message: 'Enter a valid Indian mobile number' }] }) })
    })
    await form.getByRole('button').click()
    await expect(form.getByRole('button')).toHaveText(copy.forms.submitting)
    await expect(form.getByRole('button')).toBeDisabled()
    await expect.poll(() => !!release).toBe(true)
    release()
    await expect(form.getByRole('alert')).toHaveText(copy.messages.validation)
    await expect(form.getByText(copy.forms.enterAValidIndianMobileNumber, { exact: true })).toBeVisible()
    await page.unroute('**/api/leads/fee-structure')
    await page.route('**/api/leads/fee-structure', route => route.fulfill({ status: 429, contentType: 'application/json', body: JSON.stringify({ message: 'Too many requests; try again later' }) }))
    await form.getByRole('button').click()
    await expect(form.getByRole('alert')).toHaveText(copy.messages.rateLimit)
    await page.unroute('**/api/leads/fee-structure')
    await page.route('**/api/leads/fee-structure', route => route.abort())
    await form.getByRole('button').click()
    await expect(form.getByRole('alert')).toHaveText(copy.messages.network)
    await expect(form.locator('[name="studentName"]')).toHaveValue('Multilingual Test Student')
  })
  test(`${lang} all modal flows submit canonical values to the existing API`, async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 900 })
    await open(page)
    await selectLanguage(page, lang)
    const copy = locales[lang]
    for (const [index, stream] of ['PCMB', 'PCMC', 'PCME'].entries()) {
      await page.locator('.pathway-panel button').nth(index).click()
      const dialog = page.getByRole('dialog')
      await expect(dialog.getByRole('heading', { level: 2 })).toContainText(copy.pathways[stream.toLowerCase()].title)
      await expect(dialog.getByText(copy.pathways[stream.toLowerCase()].bestFor)).toBeVisible()
      await page.keyboard.press('Shift+Tab')
      await expect(dialog.getByRole('button').last()).toBeFocused()
      await page.keyboard.press('Tab')
      await expect(dialog.getByRole('button').first()).toBeFocused()
      await dialog.getByRole('button').last().click()
      await expect(dialog.getByRole('heading')).toHaveText(copy.counsellingModal.talkToAnAcademicCounsellor)
      await expect(dialog.locator('[name="interestedStream"]')).toHaveValue(stream)
      await expect(dialog.locator('option[value="NEET"]')).toHaveCount(stream === 'PCMB' ? 1 : 0)
      if (stream === 'PCMC') {
        await basics(dialog.getByRole('form'))
        await dialog.locator('[name="currentClass"]').selectOption('10')
        await dialog.locator('[name="targetExam"]').selectOption('JEE')
        const sent = page.waitForResponse(r => r.url().endsWith('/api/leads/counselling') && r.request().method() === 'POST')
        await dialog.getByRole('button', { name: copy.forms.requestCounselling }).click()
        const response = await sent
        expect(response.status()).toBe(201)
        expect(response.request().postDataJSON()).toMatchObject({ interestedStream: 'PCMC', targetExam: 'JEE', currentClass: '10', leadSource: 'website' })
        await expect(dialog.getByRole('status')).toHaveText(copy.forms.thanksOurAdmissionsTeamWillContact)
      }
      await page.keyboard.press('Escape')
    }
    await page.locator('#campus article').last().getByRole('button').click()
    let form = page.getByRole('dialog').getByRole('form')
    await basics(form)
    await form.locator('[name="preferredDate"]').fill('2027-02-15')
    await form.locator('[name="timeSlot"]').selectOption('afternoon')
    let sent = page.waitForResponse(r => r.url().endsWith('/api/leads/campus-visit') && r.request().method() === 'POST')
    await form.getByRole('button').click()
    let response = await sent
    expect(response.status()).toBe(201)
    expect(response.request().postDataJSON()).toMatchObject({ preferredCampus: 'VRR Academy', interestedStream: 'Undecided', campusVisit: { preferredDate: '2027-02-15', timeSlot: 'afternoon' } })
    await page.keyboard.press('Escape')
    await page.locator('#admissions button').click()
    form = page.getByRole('dialog').getByRole('form')
    await basics(form)
    sent = page.waitForResponse(r => r.url().endsWith('/api/leads') && r.request().method() === 'POST')
    await form.getByRole('button').click()
    response = await sent
    expect(response.status()).toBe(201)
    expect(response.request().postDataJSON()).toMatchObject({ requestType: 'admission', currentClass: 'other', interestedStream: 'Undecided', targetExam: 'Undecided' })
    await page.keyboard.press('Escape')
    form = page.locator('#fee-enquiry form')
    await basics(form)
    await form.locator('[name="interestedStream"]').selectOption('PCME')
    await form.locator('[name="targetExam"]').selectOption('Boards')
    sent = page.waitForResponse(r => r.url().endsWith('/api/leads/fee-structure') && r.request().method() === 'POST')
    await form.getByRole('button').click()
    response = await sent
    expect(response.status()).toBe(201)
    expect(response.request().postDataJSON()).toMatchObject({ interestedStream: 'PCME', targetExam: 'Boards' })
    await expect(form.getByRole('status')).toHaveText(copy.forms.thanksOurAdmissionsTeamWillContact)
    await page.locator('.faculty-card').first().click()
    await expect(page.getByRole('dialog').getByRole('heading')).toHaveText('Keerthi NV')
    await expect(page.getByRole('dialog').getByText(copy.common.physics, { exact: true })).toBeVisible()
    await expect(page.getByRole('dialog').getByText('B.E., M.Tech (VLSI)', { exact: true })).toBeVisible()
    await page.keyboard.press('Escape')
  })
  test(`${lang} About and Courses routes keep translated navigation and content`, async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 900 })
    await open(page)
    await selectLanguage(page, lang)
    await page.locator('footer a[href="/about"]').click()
    await expect(page.locator('h1')).toHaveText(locales[lang].about.aboutVrrCareerAcademy)
    await page.getByRole('button', { name: locales[lang].academicLeadership.readFullMessage }).first().click()
    await expect(page.getByText(locales[lang].academicLeadership.atVrrCareerAcademyOurMission.split('\n\n')[1], { exact: true })).toBeVisible()
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
    await page.locator('footer a[href="/courses"]').click()
    await expect(page.locator('h1')).toHaveText(locales[lang].courses.vrrCourses)
    await expect(page.getByText(locales[lang].courses.foundationCourses, { exact: true })).toBeVisible()
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
  })
}

test('translated feedback and open dialogs update without clearing user input', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await open(page)
  await page.locator('.pathway-panel button').first().click()
  await page.getByRole('dialog').getByRole('button').last().click()
  const form = page.getByRole('dialog').getByRole('form')
  await basics(form)
  await form.locator('[name="phone"]').fill('123')
  await form.getByRole('button').click()
  await expect(form.getByRole('alert')).toHaveText(locales.en.forms.pleaseCheckTheHighlightedFields)
  // A language change must rerender an already open dialog, without remounting its form.
  await page.evaluate(async () => (await import('/src/i18n/index.js')).default.changeLanguage('kn'))
  await expect(form.getByRole('alert')).toHaveText(locales.kn.forms.pleaseCheckTheHighlightedFields)
  await expect(form.locator('[name="studentName"]')).toHaveValue('Multilingual Test Student')
  await expect(form.locator('[name="interestedStream"]')).toHaveValue('PCMB')
  await expect(form.getByRole('alert')).toBeFocused()
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.keyboard.press('Escape')
  expect(await page.locator('.hero-admissions-badge').evaluate(el => getComputedStyle(el).animationName)).toBe('none')
  expect(await page.locator('.marquee-track').first().evaluate(el => getComputedStyle(el).animationName)).toBe('none')
})

test('English is the default regardless of browser locale or invalid stored preference', async ({ browser }) => {
  const context = await browser.newContext({ locale: 'hi-IN' })
  const page = await context.newPage()
  await page.goto('http://127.0.0.1:5174/')
  await expect(page.locator('html')).toHaveAttribute('lang', 'en')
  await page.evaluate(() => localStorage.setItem('vrr-language', 'unsupported'))
  await page.reload()
  await expect(page.locator('html')).toHaveAttribute('lang', 'en')
  await context.close()
})
