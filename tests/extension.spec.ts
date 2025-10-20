import { test, expect, chromium } from '@playwright/test';
import path from 'node:path';

const dist = path.resolve(__dirname, '..', 'dist');

test('carrega extensão e navega no example.com', async () => {
  const context = await chromium.launchPersistentContext('', {
    headless: true,
    args: [
      `--disable-extensions-except=${dist}`,
      `--load-extension=${dist}`
    ]
  });
  const page = await context.newPage();
  await page.goto('https://example.com');
  await expect(page).toHaveTitle(/Example Domain/i);
  await context.close();
});
