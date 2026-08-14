import { expect, test } from '@playwright/test';

// JavaScript is disabled for this context: the form must work as a native
// HTML POST against the server, with no client-side submission logic.
test.use({ javaScriptEnabled: false });

test('action accepts valid form data without client-side JavaScript', async ({
  page,
}) => {
  await page.goto('/action-probe');
  await page.locator('#value').fill('hello');
  await page.getByRole('button', { name: 'Submit' }).click();

  await expect(page.getByTestId('success')).toHaveText('Received: hello');
});

test('action rejects invalid form data without client-side JavaScript', async ({
  page,
}) => {
  await page.goto('/action-probe');
  await page.getByRole('button', { name: 'Submit' }).click();

  await expect(page.getByTestId('input-error')).toBeVisible();
  await expect(page.getByTestId('success')).toHaveCount(0);
});
