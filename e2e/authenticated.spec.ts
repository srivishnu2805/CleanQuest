import { test, expect, type Page } from '@playwright/test';

const CLERK_USERNAME = process.env.E2E_CLERK_USER_USERNAME || 'test_user';
const CLERK_PASSWORD = process.env.E2E_CLERK_USER_PASSWORD || 'password123!';
const HAS_E2E_CREDENTIALS =
  Boolean(process.env.E2E_CLERK_USER_USERNAME) &&
  Boolean(process.env.E2E_CLERK_USER_PASSWORD);

const DEFAULT_TIMEOUT = 15000;

// Reusable login helper
const login = async (page: Page) => {
  await page.goto('/sign-in');
  await page.waitForSelector('input[name="identifier"]');
  await page.fill('input[name="identifier"]', CLERK_USERNAME);
  await page.click('button:has-text("Continue")');
  await page.waitForSelector('input[name="password"]');
  await page.fill('input[name="password"]', CLERK_PASSWORD);
  await page.click('button:has-text("Continue")');
  // Wait for redirect to the root page after successful login
  await page.waitForURL(/^http:\/\/localhost:\d+\/?$/);
};

test.describe('Authenticated Page Features', () => {
  test.beforeEach(async ({ page }, testInfo) => {
    if (!HAS_E2E_CREDENTIALS && process.env.CI) testInfo.skip();
    await login(page);
  });

  // --- d. Dashboard ---
  test('d. Dashboard page shows "Impact Dashboard" heading', async ({ page }) => {
    await page.goto('/dashboard');
    await expect(page.locator('text="Impact Dashboard"')).toBeVisible({ timeout: DEFAULT_TIMEOUT });
  });

  test('d. Dashboard page shows stat cards (Total Posts, Comments, Impact Points, Day Streak)', async ({ page }) => {
    await page.goto('/dashboard');
    await expect(page.locator('text="Total Posts"')).toBeVisible({ timeout: DEFAULT_TIMEOUT });
    await expect(page.locator('text="Comments"')).toBeVisible({ timeout: DEFAULT_TIMEOUT });
    await expect(page.locator('text="Impact Points"')).toBeVisible({ timeout: DEFAULT_TIMEOUT });
    await expect(page.locator('text="Day Streak"')).toBeVisible({ timeout: DEFAULT_TIMEOUT });
  });

  test('d. Dashboard page shows Achievement Badges section', async ({ page }) => {
    await page.goto('/dashboard');
    await expect(page.locator('text="Achievement Badges"')).toBeVisible({ timeout: DEFAULT_TIMEOUT });
  });

  test('d. Dashboard page shows Your Impact Summary section', async ({ page }) => {
    await page.goto('/dashboard');
    await expect(page.locator('text="Your Impact Summary"')).toBeVisible({ timeout: DEFAULT_TIMEOUT });
  });

  // --- e. Leaderboard ---
  test('e. Leaderboard page shows Top Contributors heading', async ({ page }) => {
    await page.goto('/leaderboard');
    await expect(page.locator('text="Top Contributors"')).toBeVisible({ timeout: DEFAULT_TIMEOUT });
  });

  test('e. Leaderboard page shows Rank, User and Impact Points columns', async ({ page }) => {
    await page.goto('/leaderboard');
    await expect(page.locator('th:has-text("Rank")')).toBeVisible({ timeout: DEFAULT_TIMEOUT });
    await expect(page.locator('th:has-text("User")')).toBeVisible({ timeout: DEFAULT_TIMEOUT });
    await expect(page.locator('th:has-text("Impact Points")')).toBeVisible({ timeout: DEFAULT_TIMEOUT });
  });

  // --- f. Events ---
  test('f. Events page shows "Campus Events" heading', async ({ page }) => {
    await page.goto('/events');
    await expect(page.locator('text="Campus Events"')).toBeVisible({ timeout: DEFAULT_TIMEOUT });
  });

  test('f. Events page shows either event cards or the empty-state message', async ({ page }) => {
    await page.goto('/events');
    const hasEvents = await page.locator('[data-testid="event-card"]').count();
    if (hasEvents === 0) {
      // Empty state: "No upcoming events. Check back soon!"
      await expect(
        page.locator('text="No upcoming events. Check back soon!"')
      ).toBeVisible({ timeout: DEFAULT_TIMEOUT });
    }
  });

  // --- g. Notifications ---
  test('g. Notifications page shows "Notifications" heading', async ({ page }) => {
    await page.goto('/notifications');
    await expect(page.locator('h1:has-text("Notifications")')).toBeVisible({ timeout: DEFAULT_TIMEOUT });
  });

  test('g. Notifications page shows notifications or empty-state message', async ({ page }) => {
    await page.goto('/notifications');
    const hasNotifications = await page.locator('.notification-item').count();
    if (hasNotifications === 0) {
      await expect(page.locator('text="No new notifications yet."')).toBeVisible({ timeout: DEFAULT_TIMEOUT });
    }
  });

  // --- h. Friends / Discover People ---
  test('h. Friends page shows "Discover People" heading', async ({ page }) => {
    await page.goto('/friends');
    await expect(page.locator('h1:has-text("Discover People")')).toBeVisible({ timeout: DEFAULT_TIMEOUT });
  });

  // --- i. Settings ---
  test('i. Settings page shows "Account Settings" heading', async ({ page }) => {
    await page.goto('/settings');
    await expect(page.locator('h1:has-text("Account Settings")')).toBeVisible({ timeout: DEFAULT_TIMEOUT });
  });

  test('i. Settings page has Display Name, Bio, School and Work fields', async ({ page }) => {
    await page.goto('/settings');
    await expect(page.locator('input[name="displayName"]')).toBeVisible({ timeout: DEFAULT_TIMEOUT });
    await expect(page.locator('textarea[name="description"]')).toBeVisible({ timeout: DEFAULT_TIMEOUT });
    await expect(page.locator('input[name="school"]')).toBeVisible({ timeout: DEFAULT_TIMEOUT });
    await expect(page.locator('input[name="work"]')).toBeVisible({ timeout: DEFAULT_TIMEOUT });
  });

  test('i. Settings page has Save Changes button', async ({ page }) => {
    await page.goto('/settings');
    await expect(page.locator('button:has-text("Save Changes")')).toBeVisible({ timeout: DEFAULT_TIMEOUT });
  });

  // --- j. Home feed interaction: like a post ---
  test('j. Liking a post optimistically toggles the like button', async ({ page }) => {
    await page.goto('/');

    // Wait for the feed to load
    const likeButton = page.locator('button[aria-label="Like post"]').first();
    const unlikeButton = page.locator('button[aria-label="Unlike post"]').first();

    // Determine initial state
    const initiallyLiked = (await unlikeButton.count()) > 0;

    if (!initiallyLiked) {
      // Post is not liked; click to like it
      await likeButton.first().click();
      // After click, button should show "Unlike post"
      await expect(page.locator('button[aria-label="Unlike post"]').first()).toBeVisible({ timeout: 5000 });
    } else {
      // Post is already liked; click to unlike it
      await unlikeButton.first().click();
      // After click, button should show "Like post"
      await expect(page.locator('button[aria-label="Like post"]').first()).toBeVisible({ timeout: 5000 });
    }
  });

  // --- k. Home feed interaction: save a post ---
  test('k. Saving a post optimistically toggles the save button', async ({ page }) => {
    await page.goto('/');

    // Wait for the feed to load and find the save/unsave buttons
    const saveButton = page.locator('button[aria-label="Save post"]').first();
    const unsaveButton = page.locator('button[aria-label="Unsave post"]').first();

    const initiallyUnsaved = (await saveButton.count()) > 0;

    if (initiallyUnsaved) {
      await saveButton.click();
      await expect(page.locator('button[aria-label="Unsave post"]').first()).toBeVisible({ timeout: 5000 });
    } else {
      await unsaveButton.first().click();
      await expect(page.locator('button[aria-label="Save post"]').first()).toBeVisible({ timeout: 5000 });
    }
  });

  // --- l. Home feed: Add Post trigger opens modal ---
  test('l. Add Post trigger opens the Create Post modal', async ({ page }) => {
    await page.goto('/');
    await page.click('text="Add a post"');
    await expect(page.locator('text="Create new post"')).toBeVisible({ timeout: 10000 });
  });

  // --- m. Navbar profile link ---
  test('m. Authenticated user sees a profile link in the navbar', async ({ page }) => {
    await page.goto('/');
    const profileLink = page.locator('a[href^="/profile/"]');
    await expect(profileLink.first()).toBeVisible({ timeout: DEFAULT_TIMEOUT });
  });
});
