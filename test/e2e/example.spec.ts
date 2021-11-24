import { test, expect } from '@playwright/test'

test('should have title "Movies" and search element', async ({ page }) => {
  // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
  await page.goto('/')
  
  await expect(page.locator('.title')).toContainText('Movies')

  // Find an element with the id 'search-bar'
  await expect(page.locator('#search-bar')).toContainText('Search')
})

test('film-detail should have back-button', async ({ page }) => {
  await page.goto('/film/tt0372784')

  // Find an element with id 'back-button' to be visible
  await expect(page.locator('#back-button')).toBeVisible()

  // Find an element with id 'back-button' and click on it
  await page.locator('#back-button').click()
  await page.goto('/')
  await expect(page.locator('.title')).toContainText('Movies')
})