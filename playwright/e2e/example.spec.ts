import { test, expect } from '../utils';
import { ENV } from '../../env';

test('has title', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('img', { name: 'Logo Flowup' })).toBeVisible();
  await page.locator('input[name="email"]').fill(ENV.ADMIN_EMAIL);
  await page.locator('input[name="password"]').fill(ENV.ADMIN_PASSWORD);
});
