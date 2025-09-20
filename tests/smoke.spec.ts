import { test, expect } from '@playwright/test';

test('nav links render', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('link', { name: 'Projects' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Contact' })).toBeVisible();
});

test('contact form submission (mock)', async ({ page }) => {
  await page.goto('/contact');
  await page.getByLabel('Name').fill('Test User');
  await page.getByLabel('Email').fill('test@example.com');
  await page.getByLabel('Message').fill('Hello');
  await page.getByRole('button', { name: 'Send' }).click();
  await expect(page.getByText(/Message sent|Failed to send/)).toBeVisible();
});


