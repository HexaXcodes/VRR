import { test, expect } from '@playwright/test'

test.describe('Hero image slideshow', () => {
  test('displays local image assets with accessible descriptions and loops infinitely every 2 seconds', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('.hero-image-frame')).toBeVisible()

    const frame = page.locator('.hero-image-frame')
    const directImg = frame.locator('> img')

    // First slide
    await expect(directImg).toHaveAttribute('src', '/images/vrr-academy-building.jpg')
    await expect(directImg).toHaveAttribute('alt', /VRR Career Academy.*building/i)

    // Verify badges are intact
    const badges = page.locator('.hero-academic-badges')
    await expect(badges).toBeVisible()
    await expect(badges.getByText('Chapter-wise Testing')).toBeVisible()
    await expect(badges.getByText('Expert Faculty')).toBeVisible()

    // Advances to second slide after 2 seconds
    await page.waitForTimeout(2200)
    await expect(directImg).toHaveAttribute('src', '/images/shanthi-nikethan-campus.jpg')
    await expect(directImg).toHaveAttribute('alt', /Shanthi Nikethan.*campus/i)

    // Advances to third slide after another 2 seconds
    await page.waitForTimeout(2000)
    await expect(directImg).toHaveAttribute('src', '/images/vrr-academy-entrance.jpg')
    await expect(directImg).toHaveAttribute('alt', /entrance/i)

    // Loops infinitely back to first slide
    await page.waitForTimeout(2000)
    await expect(directImg).toHaveAttribute('src', '/images/vrr-academy-building.jpg')
    await expect(directImg).toHaveAttribute('alt', /VRR Career Academy.*building/i)
  })

  test('preserves frame styling, gradient overlay, and pointer parallax interaction', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 })
    await page.goto('/')

    const frame = page.locator('.hero-image-frame')
    await expect(frame).toBeVisible()

    // Frame styling
    await expect(frame).toHaveCSS('border-top-left-radius', '100px')
    await expect(frame).toHaveCSS('border-top-right-radius', '14px')
    await expect(frame).toHaveCSS('overflow', 'hidden')

    // Gradient treatment
    const gradient = frame.locator('> .pointer-events-none.absolute.inset-0')
    await expect(gradient).toBeVisible()

    // Parallax mouse move
    const media = page.locator('.hero-media')
    const box = await media.boundingBox()
    await page.mouse.move(box.x + box.width * 0.8, box.y + box.height * 0.8)

    const imageX = await media.evaluate(el => el.style.getPropertyValue('--image-x'))
    const imageY = await media.evaluate(el => el.style.getPropertyValue('--image-y'))
    expect(parseFloat(imageX)).not.toBe(0)
    expect(parseFloat(imageY)).not.toBe(0)

    // Pointer leave cleans up variables
    await page.mouse.move(10, 10)
    const resetX = await media.evaluate(el => el.style.getPropertyValue('--image-x'))
    expect(resetX).toBe('')
  })

  test('respects prefers-reduced-motion by pausing auto-advance and disabling motion', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto('/')

    const directImg = page.locator('.hero-image-frame > img')
    await expect(directImg).toHaveAttribute('src', '/images/vrr-academy-building.jpg')

    // Should stay on first slide because auto-advance is paused
    await page.waitForTimeout(2500)
    await expect(directImg).toHaveAttribute('src', '/images/vrr-academy-building.jpg')

    // Reduced motion CSS
    await expect(directImg).toHaveCSS('transform', 'none')
  })

  test('falls back gracefully to placeholder copy and SVG if an image fails to load', async ({ page }) => {
    // Intercept image request and fail it
    await page.route('**/images/vrr-academy-building.jpg', route => route.abort())

    await page.goto('/')
    const frame = page.locator('.hero-image-frame')
    const directImg = frame.locator('> img')

    await expect(directImg).toHaveAttribute('src', '/images/campus-placeholder.svg')
    await expect(page.locator('.hero-placeholder-copy')).toBeVisible()
  })

  test('responsive layout on mobile and desktop without layout shifts', async ({ page }) => {
    for (const width of [375, 430, 768, 1024, 1440]) {
      await page.setViewportSize({ width, height: 900 })
      await page.goto('/')
      await page.evaluate(() => document.fonts.ready)

      const frame = page.locator('.hero-image-frame')
      await expect(frame).toBeVisible()

      // Ensure no horizontal overflow
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)

      // Ensure image fits container without layout shift
      const imgBox = await frame.locator('> img').boundingBox()
      expect(imgBox.width).toBeGreaterThan(0)
      expect(imgBox.height).toBeGreaterThan(0)
    }
  })
})
