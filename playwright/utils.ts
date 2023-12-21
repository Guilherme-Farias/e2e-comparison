import { test as base } from '@playwright/test';
import type { Page } from '@playwright/test';

export const test = base.extend<{
  login: (user: { email: string; password: string }) => Promise<Page>;
}>({
  login: [
    async ({ page }, use) => {
      return use(async ({ email, password }) => {
        await page.goto('/tcc');
        await page.locator('input[name="email"]').fill(email);
        await page.locator('input[name="password"]').fill(password);
        await page.getByRole('button', { name: /^entrar$/i }).click();
        return page;
      });
    },
    { auto: true },
  ],
});

export const { expect } = test;
