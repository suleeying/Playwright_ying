import { test, expect } from "@playwright/test";
test.describe("Login", () => {
  test("should search on Google", async ({ page }) => {
    await page.goto ("https://demoqa.com/automation-practice-form");
await page.getByRole('textbox', { name: 'First Name' }).click();
await page.getByRole('textbox', { name: 'First Name' }).fill('test');
await page.getByRole('textbox', { name: 'Last Name' }).click();
await page.getByRole('textbox', { name: 'Last Name' }).fill('test');
await page.getByRole('textbox', { name: 'name@example.com' }).click();
await page.getByRole('textbox', { name: 'name@example.com' }).fill('test@gmail.com');

  });
});