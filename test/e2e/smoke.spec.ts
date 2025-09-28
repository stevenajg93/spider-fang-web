import { test, expect } from "@playwright/test"

test.describe("Spider Fang Web Services - Smoke Tests", () => {
  test("should load homepage", async ({ page }) => {
    await page.goto("/")

    // Check main heading
    await expect(page.getByRole("heading", { name: /web that bites back/i })).toBeVisible()

    // Check demo notice
    await expect(page.getByText(/demo mode/i)).toBeVisible()

    // Check navigation
    await expect(page.getByRole("link", { name: /services/i })).toBeVisible()
    await expect(page.getByRole("button", { name: /book consultation/i })).toBeVisible()
  })

  test("should open booking dialog", async ({ page }) => {
    await page.goto("/")

    // Click book consultation button
    await page
      .getByRole("button", { name: /book consultation/i })
      .first()
      .click()

    // Check dialog opened
    await expect(page.getByRole("dialog")).toBeVisible()
    await expect(page.getByText(/book your consultation/i)).toBeVisible()

    // Check form fields
    await expect(page.getByLabel(/name/i)).toBeVisible()
    await expect(page.getByLabel(/email/i)).toBeVisible()
  })

  test("should navigate to services and demo checkout", async ({ page }) => {
    await page.goto("/services")

    // Check services page loaded
    await expect(page.getByRole("heading", { name: /choose your package/i })).toBeVisible()

    // Click buy button for Strike package
    await page.getByRole("button", { name: /buy strike/i }).click()

    // Should redirect to success page with demo parameter
    await expect(page).toHaveURL(/\/services\/success\?demo=stripe/)
    await expect(page.getByText(/purchase confirmed/i)).toBeVisible()
  })

  test("should open chat widget", async ({ page }) => {
    await page.goto("/")

    // Click chat widget button
    await page.getByRole("button", { name: /chat/i }).click()

    // Check chat widget opened
    await expect(page.getByText(/how can we help/i)).toBeVisible()

    // Check quick action buttons
    await expect(page.getByRole("button", { name: /book consultation/i })).toBeVisible()
    await expect(page.getByRole("button", { name: /compare packages/i })).toBeVisible()
  })

  test("should access admin dashboard", async ({ page }) => {
    await page.goto("/admin")

    // Check admin page loaded
    await expect(page.getByRole("heading", { name: /admin dashboard/i })).toBeVisible()

    // Check tabs
    await expect(page.getByRole("tab", { name: /leads/i })).toBeVisible()
    await expect(page.getByRole("tab", { name: /analytics/i })).toBeVisible()
  })
})
