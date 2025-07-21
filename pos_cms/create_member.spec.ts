import { test, expect } from '@playwright/test';
const URL = 'https://staging-bluestat-cms.devfullteam.tech/login';
const EMAIL = 'suleemas.fua+55@fullteam.tech';
const PASSWORD = 'Ying964232';
const BRAND_ID = "607"; //ying_BS_onboardไม่มีเพดาน
const OUTLET_ID = "1607"; //1607

async function login(page: any) {
await page.goto(URL, { timeout: 10000 });
await page.locator('#email').fill(EMAIL);
await page.locator('#password').fill(PASSWORD);
await page.getByRole('button', { name: 'ลงชื่อเข้าใช้' }).click();
await page.waitForLoadState('networkidle');
}

test.describe('Login', () => {
  test('create and terminal', async ({ page }) => {
  await login(page);
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(5000);
  await page.getByText('ผู้ใช้งานสูงสุด').first().click();
  await page.getByPlaceholder('ค้นหาแบรนด์..').click();
  await page.getByPlaceholder('ค้นหาแบรนด์..').fill(BRAND_ID);
  await page.getByText(BRAND_ID).click();
  await page.getByText('เปิด').click();
  await page.getByText('POS ทั้งหมด').click();
  await page.waitForTimeout(3000);

})
})