import { expect, test } from '@playwright/test';

const staticRoutes = [
  { path: '/', heading: 'Test. Teach. Lead.' },
  { path: '/about', heading: 'About Me' },
  { path: '/blog', heading: 'Blog' },
  { path: '/blog/tags', heading: 'Blog Tags' },
  { path: '/blog/categories', heading: 'Blog Categories' },
  { path: '/projects', heading: 'Projects' },
  { path: '/speaking', heading: 'Speaking Engagements' },
];

test.describe('site smoke tests', () => {
  for (const route of staticRoutes) {
    test(`renders ${route.path}`, async ({ page }) => {
      const response = await page.goto(route.path);
      expect(response?.ok()).toBeTruthy();

      await expect(page.locator('header.site-header')).toHaveCount(1);
      await expect(page.locator('footer.site-footer')).toHaveCount(1);
      await expect(page.getByRole('heading', { name: route.heading })).toBeVisible();
    });
  }

  test('blog detail page opens from list', async ({ page }) => {
    const response = await page.goto('/blog');
    expect(response?.ok()).toBeTruthy();

    const firstPostLink = page.locator('.title-link').first();
    await expect(firstPostLink).toBeVisible();
    await firstPostLink.click();

    await expect(page).toHaveURL(/\/blog\//);
    await expect(page.locator('.blog-post-container')).toHaveCount(1);
    await expect(page.locator('.post-header .post-title')).toHaveCount(1);
    await expect(page.locator('.post-header .post-title')).toBeVisible();
  });

  test('project detail page opens from list', async ({ page }) => {
    const response = await page.goto('/projects');
    expect(response?.ok()).toBeTruthy();

    const firstProjectLink = page.locator('.card-link').first();
    await expect(firstProjectLink).toBeVisible();
    await firstProjectLink.click();

    await expect(page).toHaveURL(/\/projects\//);
    await expect(page.locator('.project-post-container')).toHaveCount(1);
    await expect(page.locator('h1').first()).toBeVisible();
  });

  test('tag detail page opens from blog taxonomy link', async ({ page }) => {
    const response = await page.goto('/blog');
    expect(response?.ok()).toBeTruthy();

    const firstTagLink = page.locator('.tag-pill').first();
    await expect(firstTagLink).toBeVisible();
    await firstTagLink.click();

    await expect(page).toHaveURL(/\/blog\/tags\//);
    await expect(page.getByRole('heading', { name: /Tag:/ })).toBeVisible();
  });
});
