import { test, expect } from '@playwright/test'
import { pathways } from '../src/data/pathways'

for (const width of [375, 1440]) {
  for (const pathway of Object.values(pathways)) {
    test(`${pathway.stream} pathway interaction at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 812 })
      await page.goto('/')
      const trigger = page.getByRole('button', { name: `Explore ${pathway.stream} Curriculum` })
      await trigger.focus()
      await page.keyboard.press('Enter')
      const dialog = page.getByRole('dialog')
      await expect(dialog).toBeVisible()
      await expect(dialog).toHaveAttribute('aria-modal', 'true')
      await expect(dialog.getByRole('heading', { level: 2 })).toContainText(pathway.title)
      await expect(dialog.getByRole('form')).toHaveCount(0)
      for (const heading of ['Subjects', 'Future Scope', 'Career Opportunities', 'Competitive Exams', 'Best For']) {
        await expect(dialog.getByRole('heading', { name: heading, exact: true })).toBeVisible()
      }
      const items = [...pathway.subjects, ...pathway.careers, ...pathway.exams]
      for (const item of new Set(items)) {
        await expect(dialog.getByRole('listitem').filter({ hasText: new RegExp(`^${item.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`) })).toHaveCount(items.filter(value => value === item).length)
      }
      expect(await page.evaluate(() => document.body.style.overflow)).toBe('hidden')
      const close = dialog.getByRole('button', { name: 'Close dialog' })
      const cta = dialog.getByRole('button', { name: 'Talk to an Academic Counsellor' })
      await expect(close).toBeFocused()
      await page.keyboard.press('Shift+Tab')
      await expect(cta).toBeFocused()
      await page.keyboard.press('Tab')
      await expect(close).toBeFocused()
      expect(await dialog.evaluate(el => {
        const rect = el.getBoundingClientRect()
        return rect.left >= 0 && rect.right <= innerWidth && rect.top >= 0 && rect.bottom <= innerHeight && el.scrollWidth <= el.clientWidth
      })).toBe(true)
      await page.keyboard.press('Escape')
      await expect(dialog).toHaveCount(0)
      await expect(trigger).toBeFocused()
      expect(await page.evaluate(() => document.body.style.overflow)).toBe('')
      await trigger.click()
      await page.mouse.click(2, 2)
      await expect(dialog).toHaveCount(0)
      await expect(trigger).toBeFocused()
      await trigger.click()
      await close.click()
      await expect(dialog).toHaveCount(0)
      await expect(trigger).toBeFocused()
      await trigger.click()
      await cta.click()
      await expect(dialog).toHaveCount(1)
      await expect(dialog.getByRole('form', { name: 'Request Counselling' })).toBeVisible()
      await expect(dialog.getByLabel('Interested Stream')).toHaveValue(pathway.stream)
      expect(await page.evaluate(() => document.body.style.overflow)).toBe('hidden')
      await page.keyboard.press('Escape')
      await expect(dialog).toHaveCount(0)
      await expect(trigger).toBeFocused()
      expect(await page.evaluate(() => document.body.style.overflow)).toBe('')
    })
  }
}
