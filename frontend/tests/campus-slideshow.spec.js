import { test, expect } from '@playwright/test'

test.describe('Shanthi Niketan PU College campus gallery slideshow', () => {
  test('displays 6 local photos in order, advances every 2s, and loops infinitely', async ({ page }) => {
    await page.goto('/')
    const campus = page.locator('#campus')
    await campus.scrollIntoViewIfNeeded()

    const frame = campus.locator('.campus-slideshow-frame')
    await expect(frame).toBeVisible()

    // Slide 1: Classroom
    const img = frame.locator('.campus-slide-fade > img')
    await expect(img).toHaveAttribute('src', '/images/campus/shanthi-niketan-classroom.jpg')
    await expect(frame.getByText('Classroom')).toBeVisible()

    // Slide 2: Computer Lab
    await page.waitForTimeout(2000)
    await expect(img).toHaveAttribute('src', '/images/campus/shanthi-niketan-computer-lab.jpg')
    await expect(frame.getByText('Computer Lab')).toBeVisible()

    // Slide 3: Physics Lab
    await page.waitForTimeout(2000)
    await expect(img).toHaveAttribute('src', '/images/campus/shanthi-niketan-physics-biology-lab.jpg')
    await expect(frame.getByText('Physics Lab')).toBeVisible()

    // Slide 4: Chemistry Lab
    await page.waitForTimeout(2000)
    await expect(img).toHaveAttribute('src', '/images/campus/shanthi-niketan-chemistry-lab.jpg')
    await expect(frame.getByText('Chemistry Lab')).toBeVisible()

    // Slide 5: Biology Lab
    await page.waitForTimeout(2000)
    await expect(img).toHaveAttribute('src', '/images/campus/shanthi-niketan-biology-lab.jpg')
    await expect(frame.getByText('Biology Lab')).toBeVisible()

    // Slide 6: Campus
    await page.waitForTimeout(2000)
    await expect(img).toHaveAttribute('src', '/images/campus/shanthi-niketan-campus-building.jpg')
    await expect(frame.getByText('Campus', { exact: true })).toBeVisible()

    // Loop back to Slide 1
    await page.waitForTimeout(2000)
    await expect(img).toHaveAttribute('src', '/images/campus/shanthi-niketan-classroom.jpg')
  })

  test('preserves exact Shanthi Niketan PU College information, Confirm Location and visit action', async ({ page }) => {
    await page.goto('/')
    const campus = page.locator('#campus')
    await campus.scrollIntoViewIfNeeded()

    const shanthiArticle = campus.locator('article').first()
    await expect(shanthiArticle.getByRole('heading', { name: 'Shanthi Niketan PU College' })).toBeVisible()
    await expect(shanthiArticle.getByText('PU academic campus associated with the integrated programme.')).toBeVisible()
    await expect(shanthiArticle.getByRole('link', { name: /Confirm Location/i })).toBeVisible()

    // Book Campus Visit button opens modal prefilled for Shanthi Niketan
    await shanthiArticle.getByRole('button', { name: 'Book Campus Visit' }).click()
    const dialog = page.getByRole('dialog')
    await expect(dialog).toBeVisible()
    const form = dialog.locator('form')
    await form.getByLabel('Student Name').fill('Pooja Rao')
    await form.getByLabel('Mobile Number').fill('9876543210')
    const sent = page.waitForResponse(res => res.url().endsWith('/api/leads/campus-visit') && res.request().method() === 'POST')
    await form.getByRole('button', { name: 'Request Campus Visit' }).click()
    const response = await sent
    expect(response.status()).toBe(201)
    expect(response.request().postDataJSON()).toMatchObject({ preferredCampus: 'Shanthi Niketan' })
  })

  test('displays VRR Career Academy 5 local photos in order, advances every 2s, and loops infinitely', async ({ page }) => {
    await page.goto('/')
    const campus = page.locator('#campus')
    await campus.scrollIntoViewIfNeeded()

    // Switch to VRR Career Academy
    await campus.locator('article').last().click()
    const frame = campus.locator('#campus-panel-vrr .campus-slideshow-frame')
    await expect(frame).toBeVisible()

    // Slide 1: Campus Building
    const img = frame.locator('.campus-slide-fade > img')
    await expect(img).toHaveAttribute('src', '/images/campus/vrr-academy-building-facade.jpg')
    await expect(frame.getByText('Campus Building')).toBeVisible()

    // Slide 2: Classroom
    await page.waitForTimeout(2000)
    await expect(img).toHaveAttribute('src', '/images/campus/vrr-academy-classroom-lecture-hall.jpg')
    await expect(frame.getByText('Classroom')).toBeVisible()

    // Slide 3: Interactive Classroom
    await page.waitForTimeout(2000)
    await expect(img).toHaveAttribute('src', '/images/campus/vrr-academy-study-classroom.jpg')
    await expect(frame.getByText('Interactive Classroom')).toBeVisible()

    // Slide 4: Faculty Podium & Lecture Hall
    await page.waitForTimeout(2000)
    await expect(img).toHaveAttribute('src', '/images/campus/vrr-academy-podium-classroom.jpg')
    await expect(frame.getByText('Faculty Podium & Lecture Hall')).toBeVisible()

    // Slide 5: Entrance & Reception
    await page.waitForTimeout(2000)
    await expect(img).toHaveAttribute('src', '/images/campus/vrr-academy-entrance-reception.jpg')
    await expect(frame.getByText('Entrance & Reception')).toBeVisible()

    // Loop back to Slide 1
    await page.waitForTimeout(2000)
    await expect(img).toHaveAttribute('src', '/images/campus/vrr-academy-building-facade.jpg')
  })

  test('preserves exact VRR Career Academy information, View Location and visit action', async ({ page }) => {
    await page.goto('/')
    const campus = page.locator('#campus')
    await campus.scrollIntoViewIfNeeded()

    const vrrArticle = campus.locator('article').last()
    await expect(vrrArticle.getByRole('heading', { name: 'VRR Career Academy' })).toBeVisible()
    await expect(vrrArticle.getByText('Integrated academic and competitive-exam learning centre.')).toBeVisible()
    const viewLoc = vrrArticle.getByRole('link', { name: /View Location/i })
    await expect(viewLoc).toBeVisible()
    await expect(viewLoc).toHaveAttribute('href', /maps\.google\.com/)

    // Book Campus Visit button opens modal prefilled for VRR Academy
    await vrrArticle.getByRole('button', { name: 'Book Campus Visit' }).click()
    const dialog = page.getByRole('dialog')
    await expect(dialog).toBeVisible()
    const form = dialog.locator('form')
    await form.getByLabel('Student Name').fill('Aadvik Gowda')
    await form.getByLabel('Mobile Number').fill('9611747003')
    const sent = page.waitForResponse(res => res.url().endsWith('/api/leads/campus-visit') && res.request().method() === 'POST')
    await form.getByRole('button', { name: 'Request Campus Visit' }).click()
    const response = await sent
    expect(response.status()).toBe(201)
    expect(response.request().postDataJSON()).toMatchObject({ preferredCampus: 'VRR Academy' })
  })

  test('keeps Shanthi Niketan PU College gallery separate from VRR Career Academy gallery', async ({ page }) => {
    await page.goto('/')
    const campus = page.locator('#campus')
    await campus.scrollIntoViewIfNeeded()

    // Shanthi Niketan panel is active initially
    await expect(campus.locator('#campus-panel-shanthi')).toBeVisible()
    await expect(campus.locator('#campus-panel-vrr')).toHaveCount(0)

    // Clicking VRR Career Academy article switches to VRR slideshow panel
    await campus.locator('article').last().click()
    await expect(campus.locator('#campus-panel-vrr')).toBeVisible()
    await expect(campus.locator('#campus-panel-shanthi')).toHaveCount(0)

    // VRR slideshow displays VRR slide
    await expect(campus.locator('#campus-panel-vrr .campus-slideshow-frame')).toBeVisible()
    await expect(campus.locator('#campus-panel-vrr').getByText('Campus Building')).toBeVisible()

    // Clicking Shanthi Niketan article switches back to Shanthi Niketan slideshow
    await campus.locator('article').first().click()
    await expect(campus.locator('#campus-panel-shanthi')).toBeVisible()
    await expect(campus.locator('#campus-panel-vrr')).toHaveCount(0)
  })

  test('respects prefers-reduced-motion by pausing auto-advance and disabling animation', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto('/')
    const campus = page.locator('#campus')
    await campus.scrollIntoViewIfNeeded()

    const frame = campus.locator('.campus-slideshow-frame')
    const img = frame.locator('.campus-slide-fade > img')
    await expect(img).toHaveAttribute('src', '/images/campus/shanthi-niketan-classroom.jpg')

    // Remains on slide 1 past the 2s interval
    await page.waitForTimeout(2500)
    await expect(img).toHaveAttribute('src', '/images/campus/shanthi-niketan-classroom.jpg')
    await expect(frame.locator('.campus-slide-fade')).toHaveCSS('animation-name', 'none')
  })

  test('falls back gracefully to placeholder if all campus images fail to load', async ({ page }) => {
    await page.route('**/images/campus/**', route => route.abort())
    await page.goto('/')
    const campus = page.locator('#campus')
    await campus.scrollIntoViewIfNeeded()

    const frame = campus.locator('.campus-slideshow-frame')
    await expect(frame).toBeVisible()
    await expect(frame.locator('.campus-placeholder')).toBeVisible()
    await expect(frame.getByText('Photo coming soon')).toBeVisible()
  })

  test('responsive layout on mobile and desktop without layout shifts', async ({ page }) => {
    for (const width of [375, 768, 1440]) {
      await page.setViewportSize({ width, height: 900 })
      await page.goto('/')
      const campus = page.locator('#campus')
      await campus.scrollIntoViewIfNeeded()

      const frame = campus.locator('.campus-slideshow-frame')
      await expect(frame).toBeVisible()
      const box = await frame.boundingBox()
      expect(box.width).toBeGreaterThan(250)
      expect(box.height).toBeGreaterThanOrEqual(280)

      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
    }
  })

  test('pauses slideshow timer while tab is hidden and resumes automatically when visible', async ({ page }) => {
    await page.goto('/')
    const campus = page.locator('#campus')
    await campus.scrollIntoViewIfNeeded()

    const frame = campus.locator('.campus-slideshow-frame')
    const img = frame.locator('.campus-slide-fade > img')
    await expect(img).toHaveAttribute('src', '/images/campus/shanthi-niketan-classroom.jpg')

    // Advance to slide 2
    await page.waitForTimeout(2000)
    await expect(img).toHaveAttribute('src', '/images/campus/shanthi-niketan-computer-lab.jpg')

    // Simulate tab being hidden
    await page.evaluate(() => {
      Object.defineProperty(document, 'hidden', { value: true, writable: true, configurable: true })
      document.dispatchEvent(new Event('visibilitychange'))
    })

    // Wait 3 seconds while hidden - slide should NOT advance
    await page.waitForTimeout(3000)
    await expect(img).toHaveAttribute('src', '/images/campus/shanthi-niketan-computer-lab.jpg')

    // Simulate tab becoming visible again
    await page.evaluate(() => {
      Object.defineProperty(document, 'hidden', { value: false, writable: true, configurable: true })
      document.dispatchEvent(new Event('visibilitychange'))
    })

    // Timer resumes and advances to slide 3
    await page.waitForTimeout(2100)
    await expect(img).toHaveAttribute('src', '/images/campus/shanthi-niketan-physics-biology-lab.jpg')
  })

  test('supports accessible keyboard navigation and screen reader attributes on campus selector', async ({ page }) => {
    await page.goto('/')
    const campus = page.locator('#campus')
    await campus.scrollIntoViewIfNeeded()

    const tablist = campus.getByRole('tablist', { name: /Campus Selector/i })
    await expect(tablist).toBeVisible()

    const shanthiTab = tablist.getByRole('tab', { name: /Shanthi Niketan PU College/i })
    const vrrTab = tablist.getByRole('tab', { name: /VRR Career Academy/i })

    await expect(shanthiTab).toBeVisible()
    await expect(shanthiTab).toHaveAttribute('aria-selected', 'true')
    await expect(shanthiTab).toHaveAttribute('aria-controls', 'campus-panel-shanthi')

    await expect(vrrTab).toBeVisible()
    await expect(vrrTab).toHaveAttribute('aria-selected', 'false')
    await expect(vrrTab).toHaveAttribute('aria-controls', 'campus-panel-vrr')

    // Keyboard navigation with arrow keys: Focus Shanthi tab and press ArrowRight
    await shanthiTab.focus()
    await page.keyboard.press('ArrowRight')

    // Now VRR tab is selected and focused
    await expect(vrrTab).toBeFocused()
    await expect(vrrTab).toHaveAttribute('aria-selected', 'true')
    await expect(shanthiTab).toHaveAttribute('aria-selected', 'false')
    await expect(campus.locator('#campus-panel-vrr')).toBeVisible()
    await expect(campus.locator('#campus-panel-shanthi')).toHaveCount(0)

    // Press ArrowLeft to return to Shanthi Niketan
    await page.keyboard.press('ArrowLeft')
    await expect(shanthiTab).toBeFocused()
    await expect(shanthiTab).toHaveAttribute('aria-selected', 'true')
    await expect(campus.locator('#campus-panel-shanthi')).toBeVisible()
    await expect(campus.locator('#campus-panel-vrr')).toHaveCount(0)
  })
})
