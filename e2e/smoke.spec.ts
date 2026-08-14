import { expect, test } from '@playwright/test';

test('home page loads from the production build', async ({ page }) => {
  const response = await page.goto('/');

  expect(response?.ok()).toBe(true);
  await expect(page.locator('h1')).toBeVisible();
});
