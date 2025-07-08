import { test, expect } from '@playwright/test';
const URL = 'https://staging-bluestat-cms.devfullteam.tech/login';
const EMAIL = 'suleemas.fua+55@fullteam.tech';
const PASSWORD = 'Ying964232';
const BRAND_ID = '557';//ying_currency3 420//297
const OUTLET_ID = '1600'; //test_currency3 1474//1471
// Login utility function
async function login(page: any) {
await page.goto(URL, { timeout: 10000 });
await page.locator('#email').fill(EMAIL);
await page.locator('#password').fill(PASSWORD);
await page.getByRole('button', { name: 'ลงชื่อเข้าใช้' }).click();
await page.waitForLoadState('networkidle');
}

test.describe('Login', () => {
  test('create terminal', async ({ page }) => {// Login
  await login(page);
  await page.waitForLoadState('networkidle');// รอให้หน้าโหลดเสร็จและใช้ selector ที่แม่นยำมากขึ้น
  await page.waitForTimeout(5000);
  await page.getByText('ผู้ใช้งานสูงสุด').first().click();
  await page.getByPlaceholder('ค้นหาแบรนด์..').click();
  await page.getByPlaceholder('ค้นหาแบรนด์..').fill(BRAND_ID);
  await page.getByText(BRAND_ID).click();
  await page.getByText('เปิด').click();
  await page.getByText('POS ทั้งหมด').click();
  await page.waitForTimeout(3000); // รอให้หน้าโหลดเสร็จ
  await page.getByRole('link', { name: 'สร้าง' }).click();
  await page.locator('#outletId').selectOption(OUTLET_ID);
  await page.getByRole('textbox', { name: 'Activate Code : ชื่อเครื่อง' }).click();
  await page.getByRole('textbox', { name: 'Activate Code : ชื่อเครื่อง' }).fill('test');
  await page.locator('span').filter({ hasText: 'POS BDG' }).locator('i').click();
  await page.waitForTimeout(2000);
  await page.getByRole('button', { name: 'บันทึก' }).click();
  console.log('สร้าง terminal สำเร็จ');  
  })
})

test.describe('Login', () => {
  test('delete terminal', async ({ page }) => {// Login
  await login(page);
  await page.waitForLoadState('networkidle');// รอให้หน้าโหลดเสร็จและใช้ selector ที่แม่นยำมากขึ้น
  await page.waitForTimeout(5000);
  await page.getByText('ผู้ใช้งานสูงสุด').first().click();// ลองใช้ first() เพื่อเลือก element แรกที่เจอ
  await page.getByPlaceholder('ค้นหาแบรนด์..').click();
  await page.getByPlaceholder('ค้นหาแบรนด์..').fill(BRAND_ID);
  await page.getByText(BRAND_ID).click();
  await page.getByText('เปิด').click();
  await page.getByText('POS ทั้งหมด').click();
  await page.waitForTimeout(3000); // รอให้หน้าโหลดเสร็จ
  await page.getByRole('button', { name: '' }).click();
  await page.getByRole('button', { name: 'confirm' }).click();
  console.log('ลบ terminal สำเร็จ');  
})
})