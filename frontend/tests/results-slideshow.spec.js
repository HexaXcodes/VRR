import { test, expect } from '@playwright/test'

test.describe('Alumni results slideshow', () => {
  test('displays 5 alumni photos with student results in order and loops infinitely every 2 seconds', async ({ page }) => {
    await page.goto('/')
    const achievements = page.locator('#achievements')
    await achievements.scrollIntoViewIfNeeded()

    const frame = page.locator('.results-frame')
    await expect(frame).toBeVisible()

    const directImg = frame.locator('> img')
    const badge = frame.locator('.results-badge')

    // Slide 1: JEE 98 percentile (Pratham Raj Urs)
    await expect(directImg).toHaveAttribute('src', '/images/results/alumni-jee-98-percentile.jpg')
    await expect(directImg).toHaveAttribute('alt', /JEE.*98.*percentile/i)
    await expect(badge).toContainText('JEE 98 Percentile')

    // Slide 2: 10th ICSE 96%
    await page.waitForTimeout(2200)
    await expect(directImg).toHaveAttribute('src', '/images/results/alumni-10th-icse-96-percent.jpg')
    await expect(directImg).toHaveAttribute('alt', /10th.*ICSE.*96/i)
    await expect(badge).toContainText('10th ICSE 96%')

    // Slide 3: KCET 6547 rank
    await page.waitForTimeout(2000)
    await expect(directImg).toHaveAttribute('src', '/images/results/alumni-kcet-6547-rank.jpg')
    await expect(directImg).toHaveAttribute('alt', /KCET.*6547/i)
    await expect(badge).toContainText('KCET Rank 6547')

    // Slide 4: 10th CBSE 99.12%
    await page.waitForTimeout(2000)
    await expect(directImg).toHaveAttribute('src', '/images/results/alumni-10th-cbse-99-percent.jpg')
    await expect(directImg).toHaveAttribute('alt', /10th.*CBSE.*99/i)
    await expect(badge).toContainText('10th CBSE 99.12%')

    // Slide 5: 12th PU 98% and 99% in 10th CBSE
    await page.waitForTimeout(2000)
    await expect(directImg).toHaveAttribute('src', '/images/results/alumni-12th-pu-98-10th-cbse-99.jpg')
    await expect(directImg).toHaveAttribute('alt', /98.*12th.*PU.*99.*10th.*CBSE/i)
    await expect(badge).toContainText('12th PU 98% • 10th CBSE 99%')

    // Infinite loop back to Slide 1
    await page.waitForTimeout(2000)
    await expect(directImg).toHaveAttribute('src', '/images/results/alumni-jee-98-percentile.jpg')
    await expect(badge).toContainText('JEE 98 Percentile')
  })

  test('preserves surrounding alumni headings and introductory text', async ({ page }) => {
    await page.goto('/')
    const achievements = page.locator('#achievements')
    await achievements.scrollIntoViewIfNeeded()

    // Surrounding headings & links
    await expect(achievements.getByText('Selected VRR Alumni • 2nd PUC 2025')).toBeVisible()
    await expect(achievements.getByRole('heading', { name: 'Academic Achievement' })).toBeVisible()
    await expect(achievements.getByRole('heading', { name: 'Strong Academic Foundation' })).toBeVisible()
    await expect(achievements.getByRole('link', { name: /Explore our learning system/i })).toBeVisible()
  })

  test('respects prefers-reduced-motion by pausing auto-advance and disabling motion', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto('/')

    const achievements = page.locator('#achievements')
    await achievements.scrollIntoViewIfNeeded()

    const directImg = page.locator('.results-frame > img')
    await expect(directImg).toHaveAttribute('src', '/images/results/alumni-jee-98-percentile.jpg')

    // Should stay on slide 1
    await page.waitForTimeout(2500)
    await expect(directImg).toHaveAttribute('src', '/images/results/alumni-jee-98-percentile.jpg')
    await expect(directImg).toHaveCSS('animation-name', 'none')
  })

  test('falls back gracefully to placeholder if all result images fail to load', async ({ page }) => {
    await page.route('**/images/results/**', route => route.abort())

    await page.goto('/')
    const achievements = page.locator('#achievements')
    await achievements.scrollIntoViewIfNeeded()

    await expect(page.locator('.results-placeholder')).toBeVisible()
    await expect(page.getByText('2025 Alumni Results')).toBeVisible()
  })

  test('responsive layout and no horizontal overflow on mobile and desktop', async ({ page }) => {
    for (const width of [375, 430, 768, 1024, 1440]) {
      await page.setViewportSize({ width, height: 900 })
      await page.goto('/')
      await page.evaluate(() => document.fonts.ready)

      const section = page.locator('#achievements')
      await section.scrollIntoViewIfNeeded()
      await expect(section).toBeVisible()

      // Ensure no horizontal overflow
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)

      // Ensure frame height is stable
      const frameBox = await page.locator('.results-frame').boundingBox()
      expect(frameBox.height).toBeGreaterThanOrEqual(360)
    }
  })
})
