import { test, expect } from '@playwright/test';

test.describe('Public Pages', () => {
  test('landing page shows hero heading', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('text="Make Your Campus"').first()).toBeVisible({ timeout: 15000 });
  });

  test('landing page shows "Cleaner Together" headline', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('text="Cleaner Together"').first()).toBeVisible({ timeout: 15000 });
  });

  test('landing page has "Start Your Quest" CTA link pointing to /sign-up', async ({ page }) => {
    await page.goto('/');
    const ctaLink = page.locator('a[href="/sign-up"]:has-text("Start Your Quest")');
    await expect(ctaLink.first()).toBeVisible({ timeout: 15000 });
  });

  test('landing page has "See How It Works" anchor link', async ({ page }) => {
    await page.goto('/');
    const anchor = page.locator('a[href="#features"]:has-text("See How It Works")');
    await expect(anchor).toBeVisible({ timeout: 15000 });
  });

  test('landing page shows stats section with counters', async ({ page }) => {
    await page.goto('/');
    // Three stat labels should be visible
    await expect(page.locator('text="Active Users"')).toBeVisible({ timeout: 15000 });
    await expect(page.locator('text="Impact Actions"')).toBeVisible({ timeout: 15000 });
    await expect(page.locator('text="CO₂ Offset"')).toBeVisible({ timeout: 15000 });
  });

  test('landing page features section has four feature cards', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('text="Track Impact"')).toBeVisible({ timeout: 15000 });
    await expect(page.locator('text="Compete & Earn"')).toBeVisible({ timeout: 15000 });
    await expect(page.locator('text="Build Community"')).toBeVisible({ timeout: 15000 });
    await expect(page.locator('text="Analytics Dashboard"')).toBeVisible({ timeout: 15000 });
  });

  test('landing page how it works section is present', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('text="Post Your Action"')).toBeVisible({ timeout: 15000 });
    await expect(page.locator('text="Earn Impact Points"')).toBeVisible({ timeout: 15000 });
    await expect(page.locator('text="Climb & Inspire"')).toBeVisible({ timeout: 15000 });
  });

  test('landing page bottom CTA section links to /sign-up', async ({ page }) => {
    await page.goto('/');
    const bottomCta = page.locator('a[href="/sign-up"]:has-text("Join CleanQuest Today")');
    await expect(bottomCta).toBeVisible({ timeout: 15000 });
  });

  test('landing page footer shows CleanQuest copyright', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('footer').filter({ hasText: 'CleanQuest' })).toBeVisible({ timeout: 15000 });
  });

  test('page title is CleanQuest', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/CleanQuest/, { timeout: 15000 });
  });

  test('sign-in page is accessible and contains a sign-in element', async ({ page }) => {
    await page.goto('/sign-in');
    // Clerk renders the sign-in widget; it should contain an identifier input or a heading
    await expect(
      page.locator('input[name="identifier"], [data-clerk-component="SignIn"], .cl-signIn-root').first()
    ).toBeVisible({ timeout: 20000 });
  });

  test('sign-up page is accessible', async ({ page }) => {
    await page.goto('/sign-up');
    // Clerk renders the sign-up widget
    await expect(
      page.locator('input[name="emailAddress"], input[name="identifier"], [data-clerk-component="SignUp"], .cl-signUp-root').first()
    ).toBeVisible({ timeout: 20000 });
  });

  test('404 page shows for unknown routes', async ({ page }) => {
    await page.goto('/this-route-does-not-exist-at-all-xyz');
    // Next.js not-found page should be shown
    await expect(page.locator('text="404"')).toBeVisible({ timeout: 15000 });
  });

  test('404 page has Back to Home link', async ({ page }) => {
    await page.goto('/this-route-does-not-exist-at-all-xyz');
    await expect(page.locator('a[href="/"]')).toBeVisible({ timeout: 15000 });
  });
});
