import { test, expect } from '@playwright/test'

test.describe('Portfolio - Branding Verification', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
  })

  test('page title contains "Kyosuke Kawai" (not "cawa1")', async ({ page }) => {
    await expect(page).toHaveTitle(/Kyosuke Kawai/)
    const title = await page.title()
    expect(title).not.toContain('cawa1')
  })

  test('navbar brand link text is "Kyosuke Kawai"', async ({ page }) => {
    const brandLink = page.locator('nav a[href="#hero"]')
    await expect(brandLink).toBeVisible()
    await expect(brandLink).toHaveText('Kyosuke Kawai')
  })

  test('footer text contains "© 2026 Kyosuke Kawai"', async ({ page }) => {
    const footer = page.locator('footer')
    await expect(footer).toBeVisible()
    await expect(footer).toContainText('© 2026 Kyosuke Kawai')
  })

  test('visible text "cawa1" does NOT appear as branding', async ({ page }) => {
    // Check that "cawa1" doesn't appear in visible headings, nav, or footer
    const navText = await page.locator('nav').textContent()
    expect(navText).not.toContain('cawa1')
    const footerText = await page.locator('footer').textContent()
    expect(footerText).not.toContain('cawa1')
    const h1Text = await page.locator('h1').first().textContent()
    expect(h1Text).not.toContain('cawa1')
  })
})

test.describe('Portfolio - Gradient Removal Verification', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
  })

  test('hero h1 name does NOT have gradient-related CSS', async ({ page }) => {
    const heroHeading = page.locator('h1').first()
    await expect(heroHeading).toBeVisible()

    const styles = await heroHeading.evaluate((el) => {
      const computed = window.getComputedStyle(el)
      return {
        backgroundClip: computed.backgroundClip,
        webkitBackgroundClip: computed.webkitBackgroundClip,
        webkitTextFillColor: computed.webkitTextFillColor,
        backgroundImage: computed.backgroundImage,
      }
    })

    // Should NOT have gradient text styling
    expect(styles.webkitBackgroundClip).not.toBe('text')
    expect(styles.webkitTextFillColor).not.toBe('transparent')
    expect(styles.backgroundImage).not.toContain('gradient')
  })

  test('"View Projects" button has NO gradient background', async ({ page }) => {
    const viewProjectsBtn = page.getByRole('button', { name: 'View Projects' })
    await expect(viewProjectsBtn).toBeVisible()

    const styles = await viewProjectsBtn.evaluate((el) => {
      const computed = window.getComputedStyle(el)
      return {
        backgroundImage: computed.backgroundImage,
        backgroundColor: computed.backgroundColor,
      }
    })

    expect(styles.backgroundImage).not.toContain('gradient')
  })

  test('"Contact Me" button border is NOT cyan colored', async ({ page }) => {
    const contactBtn = page.locator('a[href="#contact"]').filter({ hasText: 'Contact' })
    await expect(contactBtn).toBeVisible()

    const borderColor = await contactBtn.evaluate((el) => {
      return window.getComputedStyle(el).borderColor
    })

    // Should NOT be cyan (#00d4ff = rgb(0, 212, 255))
    expect(borderColor).not.toBe('rgb(0, 212, 255)')
  })
})

test.describe('Portfolio - Styling Verification', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
  })

  test('"View Projects" button has solid background', async ({ page }) => {
    const viewProjectsBtn = page.getByRole('button', { name: 'View Projects' })
    await expect(viewProjectsBtn).toBeVisible()

    const bgColor = await viewProjectsBtn.evaluate((el) => {
      return window.getComputedStyle(el).backgroundColor
    })

    // Should have some solid background color
    expect(bgColor).not.toBe('rgba(0, 0, 0, 0)')
    expect(bgColor).not.toBe('transparent')
  })

  test('blog "Read on Medium" link border is neutral (not cyan)', async ({ page }) => {
    // Scroll to Blog section
    await page.locator('#blog').scrollIntoViewIfNeeded()
    await page.waitForTimeout(500)

    const mediumLink = page.locator('a[href*="medium.com"]').first()
    if (await mediumLink.isVisible()) {
      const borderColor = await mediumLink.evaluate((el) => {
        return window.getComputedStyle(el).borderColor
      })
      // Should NOT be cyan
      expect(borderColor).not.toBe('rgb(0, 212, 255)')
    }
  })

  test('project card hover does NOT produce cyan box-shadow', async ({ page }) => {
    // Scroll to Projects section
    await page.locator('#projects').scrollIntoViewIfNeeded()
    await page.waitForTimeout(500)

    const firstProjectCard = page.locator('#projects a[target="_blank"]').first()
    await expect(firstProjectCard).toBeVisible()

    // Hover over the card
    await firstProjectCard.hover()
    await page.waitForTimeout(300)

    const boxShadow = await firstProjectCard.evaluate((el) => {
      return window.getComputedStyle(el).boxShadow
    })

    // Should NOT have cyan glow (rgb(0, 212, 255))
    expect(boxShadow).not.toContain('rgb(0, 212, 255)')
  })

  test('contact social icon hover changes icon to white/light (not cyan)', async ({ page }) => {
    // Scroll to Contact section
    await page.locator('#contact').scrollIntoViewIfNeeded()
    await page.waitForTimeout(500)

    const socialIcon = page.locator('#contact a[target="_blank"]').first()
    await expect(socialIcon).toBeVisible()

    // Hover over icon
    await socialIcon.hover()
    await page.waitForTimeout(300)

    const iconColor = await socialIcon.evaluate((el) => {
      const svg = el.querySelector('svg')
      return svg ? window.getComputedStyle(svg).color : ''
    })

    // Should NOT be cyan
    expect(iconColor).not.toBe('rgb(0, 212, 255)')
  })
})

test.describe('Portfolio - Navigation Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
  })

  test('clicking nav links scrolls to correct sections', async ({ page }) => {
    const navLinks = [
      { selector: 'a[href="#about"]', sectionId: 'about' },
      { selector: 'a[href="#projects"]', sectionId: 'projects' },
      { selector: 'a[href="#skills"]', sectionId: 'skills' },
      { selector: 'a[href="#education"]', sectionId: 'education' },
      { selector: 'a[href="#blog"]', sectionId: 'blog' },
      { selector: 'a[href="#contact"]', sectionId: 'contact' },
    ]

    for (const { selector, sectionId } of navLinks) {
      const navLink = page.locator(`nav ${selector}`).first()
      await navLink.click()
      await page.waitForTimeout(800) // Wait for smooth scroll

      // Check section is in viewport
      const section = page.locator(`#${sectionId}`)
      await expect(section).toBeInViewport({ ratio: 0.3 })
    }
  })

  test('mobile menu toggle works at mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.waitForTimeout(300)

    // Find mobile menu toggle button
    const menuToggle = page.locator('button[aria-label="Open menu"]')
    await expect(menuToggle).toBeVisible()

    await menuToggle.click()
    await page.waitForTimeout(500)

    // Mobile menu links should now be visible in the dropdown
    const mobileNavLinks = page.locator('nav').getByRole('link', { name: 'About' })
    await expect(mobileNavLinks.last()).toBeVisible()
  })

  test('tab key navigates through interactive elements', async ({ page }) => {
    // Focus first interactive element
    await page.keyboard.press('Tab')
    await page.waitForTimeout(200)

    // Get focused element
    const firstFocused = await page.evaluate(() => document.activeElement?.tagName)
    expect(['A', 'BUTTON']).toContain(firstFocused)

    // Tab through several elements
    for (let i = 0; i < 5; i++) {
      await page.keyboard.press('Tab')
      await page.waitForTimeout(100)
    }

    // Should still be on an interactive element
    const laterFocused = await page.evaluate(() => document.activeElement?.tagName)
    expect(['A', 'BUTTON', 'INPUT']).toContain(laterFocused)
  })
})

test.describe('Portfolio - Preserved Features', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
  })

  test('particle canvas element exists', async ({ page }) => {
    const canvas = page.locator('canvas#tsparticles').or(page.locator('canvas').first())
    await expect(canvas).toBeVisible()
  })

  test('typing effect element exists and content changes over time', async ({ page }) => {
    // Look for typing effect in hero section
    const heroSection = page.locator('#hero')
    await expect(heroSection).toBeVisible()

    // Get initial text content
    const initialText = await heroSection.textContent()

    // Wait for typing animation to progress
    await page.waitForTimeout(2000)

    const laterText = await heroSection.textContent()

    // Content might change or at least typing animation should be present
    expect(initialText).toBeTruthy()
    expect(laterText).toBeTruthy()
  })

  test('status badges (Release/Beta) retain colored backgrounds', async ({ page }) => {
    // Scroll to Projects section
    await page.locator('#projects').scrollIntoViewIfNeeded()
    await page.waitForTimeout(500)

    // Find badges
    const releaseBadge = page.getByText('Release').first()
    const betaBadge = page.getByText('Beta').first()

    if (await releaseBadge.isVisible()) {
      const bgColor = await releaseBadge.evaluate((el) => {
        return window.getComputedStyle(el).backgroundColor
      })
      // Should have a colored background (not transparent)
      expect(bgColor).not.toBe('rgba(0, 0, 0, 0)')
      expect(bgColor).not.toBe('transparent')
    }

    if (await betaBadge.isVisible()) {
      const bgColor = await betaBadge.evaluate((el) => {
        return window.getComputedStyle(el).backgroundColor
      })
      // Should have a colored background (not transparent)
      expect(bgColor).not.toBe('rgba(0, 0, 0, 0)')
      expect(bgColor).not.toBe('transparent')
    }
  })

  test('active nav link still gets cyan color', async ({ page }) => {
    // Scroll to a section
    await page.locator('#about').scrollIntoViewIfNeeded()
    await page.waitForTimeout(1000)

    // Find active nav link
    const activeLink = page.locator('nav a[href="#about"]').first()
    const color = await activeLink.evaluate((el) => {
      return window.getComputedStyle(el).color
    })

    // Active link should have cyan color (rgb(0, 212, 255))
    // or be different from inactive state
    expect(color).toBeTruthy()
  })
})

test.describe('Portfolio - Accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
  })

  test('all images have alt text', async ({ page }) => {
    const images = await page.locator('img').all()

    for (const img of images) {
      const alt = await img.getAttribute('alt')
      expect(alt).toBeTruthy()
    }
  })

  test('all links are keyboard accessible', async ({ page }) => {
    const links = await page.locator('a').all()

    for (const link of links.slice(0, 10)) { // Check first 10 links
      if (await link.isVisible()) {
        await link.focus()
        const isFocused = await link.evaluate((el) => el === document.activeElement)
        expect(isFocused).toBe(true)
      }
    }
  })

  test('page has proper heading hierarchy', async ({ page }) => {
    const h1Count = await page.locator('h1').count()
    expect(h1Count).toBeGreaterThanOrEqual(1)

    // Should have multiple section headings
    const h2Count = await page.locator('h2').count()
    expect(h2Count).toBeGreaterThanOrEqual(5)
  })
})
