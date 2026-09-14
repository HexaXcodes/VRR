import { test, expect } from '@playwright/test'
import { faculty } from '../src/data/faculty'

for (const width of [375, 430, 768, 1024, 1440]) {
  test(`V2 interactions, motion and visual review at ${width}px`, async ({ page }) => {
    const errors = []
    page.on('pageerror', error => errors.push(error.message))
    page.on('console', entry => { if (entry.type() === 'error') errors.push(entry.text()) })
    await page.setViewportSize({ width, height: 900 })
    await page.goto('/')
    await page.evaluate(() => document.fonts.ready)
    await page.screenshot({ path: `test-results/v2-hero-viewport-${width}.png` })
    const network = page.locator('.career-network')
    const streams = page.getByRole('group', { name: 'Explore career pathways' })
    for (const [stream, expected] of [
      ['PCMB', ['Medicine', 'Biotechnology', 'Life Sciences', 'Research', 'Engineering']],
      ['PCMC', ['Computer Science', 'AI & Machine Learning', 'Data Science', 'Cybersecurity', 'Engineering']],
      ['PCME', ['Electronics', 'Semiconductors', 'Embedded Systems', 'Robotics', 'Engineering']],
    ]) {
      await streams.getByRole('button', { name: stream }).click()
      await expect(streams.getByRole('button', { name: stream })).toHaveAttribute('aria-pressed', 'true')
      await expect(network.locator('.career-node.is-connected')).toHaveCount(5)
      for (const name of expected) await expect(network.locator('.career-node.is-connected').filter({ hasText: name }).first()).toBeVisible()
    }
    await streams.getByRole('button', { name: 'PCMB' }).focus()
    await page.keyboard.press('Tab')
    await expect(streams.getByRole('button', { name: 'PCMC' })).toBeFocused()
    await expect(streams.getByRole('button', { name: 'PCMC' })).toHaveAttribute('aria-pressed', 'true')
    if (width >= 1024) {
      const panels = page.locator('.pathway-panel')
      await panels.nth(1).getByRole('button').focus()
      await expect.poll(async () => (await panels.nth(1).boundingBox()).width > (await panels.first().boundingBox()).width).toBe(true)
    }
    for (const selector of ['#home', '.why-section', '#pathways', '.career-section', '#learning-system', '#faculty', '#achievements', '#campus', '#admissions', '#fee-enquiry']) {
      const section = page.locator(selector)
      await section.scrollIntoViewIfNeeded()
      if (selector === '#learning-system' || selector === '#admissions') await expect(section.locator('.visual-journey')).toHaveClass(/journey-visible/)
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
      // Hide fixed overlays only in section-only review images; behavior checks use the real UI.
      const screenshotStyle = await page.addStyleTag({ content: '.vrr-navigation, .mobile-cta { visibility: hidden; } html { scroll-behavior: auto; }' })
      await section.screenshot({ path: `test-results/v2-${width}-${selector.replace(/[.#]/g, '')}.png`, animations: 'disabled' })
      await screenshotStyle.evaluate(el => el.remove())
    }
    if (width >= 1280) {
      await page.locator('#faculty').evaluate(el => el.scrollIntoView({ behavior: 'instant', block: 'start' }))
      await expect(page.getByRole('navigation', { name: 'Main navigation', exact: true }).getByRole('link', { name: 'Faculty' })).toHaveAttribute('aria-current', 'location')
    } else {
      await page.getByRole('button', { name: 'Open menu' }).click()
      await page.keyboard.press('Escape')
      await expect(page.getByRole('button', { name: 'Open menu' })).toBeFocused()
      await expect(page.getByRole('button', { name: 'Open menu' })).toHaveAttribute('aria-expanded', 'false')
    }
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await expect(page.locator('.hero-admissions-badge')).toHaveCSS('animation-name', 'none')
    await expect(page.locator('.hero-admissions-dot')).toHaveCSS('animation-name', 'none')
    await expect(page.locator('.marquee-track').first()).toHaveCSS('animation-name', 'none')
    await expect(page.locator('.visual-journey').first().locator('li').first()).toHaveCSS('animation-name', 'none')
    await expect(page.locator('.hero-image-frame > img')).toHaveCSS('transform', 'none')
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
    expect(errors).toEqual([])
  })
}

test('all faculty profiles retain factual content and focus restoration', async ({ page }) => {
  await page.goto('/')
  for (const person of faculty) {
    const trigger = page.getByRole('button', { name: `View profile of ${person.name}` })
    await trigger.click()
    const dialog = page.getByRole('dialog')
    await expect(dialog.getByRole('heading', { name: person.name, exact: true })).toBeVisible()
    await expect(dialog.getByText(person.qualifications, { exact: true })).toBeVisible()
    await expect(dialog.getByText(person.subject, { exact: true })).toBeVisible()
    await page.keyboard.press('Escape')
    await expect(dialog).toHaveCount(0)
    await expect(trigger).toBeFocused()
  }
})
