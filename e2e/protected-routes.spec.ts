import { test, expect } from '@playwright/test';

// All routes below are protected by Clerk middleware (auth().protect()).
// An unauthenticated request must be redirected to the sign-in page.
const PROTECTED_ROUTES = [
  '/leaderboard',
  '/events',
  '/friends',
  '/notifications',
  '/dashboard',
  '/settings',
  '/my-posts',
  '/activity',
  '/videos',
  '/news',
];

test.describe('Protected Route Redirects', () => {
  for (const route of PROTECTED_ROUTES) {
    test(`${route} redirects unauthenticated users to sign-in`, async ({ page }) => {
      await page.goto(route);

      // Clerk middleware calls auth().protect(), which redirects to /sign-in.
      // The final URL may include a redirect_url query parameter.
      await expect(page).toHaveURL(/\/sign-in/, { timeout: 15000 });
    });
  }

  test('root "/" does NOT redirect unauthenticated users (it is public)', async ({ page }) => {
    await page.goto('/');
    // The landing page should be shown, not a redirect to sign-in
    await expect(page).not.toHaveURL(/\/sign-in/);
    await expect(page.locator('text="Make Your Campus"').first()).toBeVisible({ timeout: 15000 });
  });

  test('/sign-in is accessible without authentication', async ({ page }) => {
    await page.goto('/sign-in');
    await expect(page).not.toHaveURL(/\/sign-in.*redirect/, { timeout: 5000 });
    // Page renders the Clerk sign-in component (or at minimum doesn't throw)
    await expect(page.locator('body')).toBeVisible();
  });

  test('/sign-up is accessible without authentication', async ({ page }) => {
    await page.goto('/sign-up');
    await expect(page).not.toHaveURL(/\/sign-in/);
    await expect(page.locator('body')).toBeVisible();
  });
});
