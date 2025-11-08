import { test, expect } from '@playwright/test';

test('submit ticker and see result', async ({ page }) => {
  await page.goto('http://localhost:4200');
  await page.fill('#symbol', 'DIS');
  await page.click('button[type=submit]');
  await expect(page.getByText('Signal:')).toBeVisible();
});
