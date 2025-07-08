import { test, expect } from '@playwright/test';
const URL = 'https://staging-bluestat-cms.devfullteam.tech/login';
const EMAIL = 'suleemas.fua+55@fullteam.tech';
const PASSWORD = 'Ying964232';
const BRAND_ID = '420';//ying_currency3 420//297
const OUTLET_ID = '1474'; //test_currency3 1474//1471
const PRODUCT_NAME = 'test' + new Date().toISOString().replace(/[-:Z]/g, '');

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
  await page.getByText('ผู้ใช้งานสูงสุด').first().click();// ลองใช้ first() เพื่อเลือก element แรกที่เจอ
  await page.waitForTimeout(5000); // รอให้หน้าโหลดเสร็จ
  await page.getByPlaceholder('ค้นหาแบรนด์..').click();
  await page.getByPlaceholder('ค้นหาแบรนด์..').fill(BRAND_ID);
  await page.getByText(BRAND_ID).click();
  await page.getByText('เปิด').click();
  await page.getByRole('link', { name: ' สาขาทั้งหมด' }).click();
  await page.getByRole('button', { name: '' }).click();
  await page.getByRole('tab', { name: 'สินค้า', exact: true }).click();
  await page.getByText('สร้างสินค้าใหม่').click();
  await page.getByRole('menuitem', { name: 'plus สินค้าเดี่ยว' }).locator('a').click();
  await page.getByRole('checkbox', { name: 'POS' }).check();
  await page.locator('.ant-select-selection-overflow').first().click();
  await page.getByTitle('ท็อปปิ้ง').locator('div').click();
  await page.getByText('จัดการสาขาจัดการสาขาสาขาทั้งหมดข้อมูลสาขาบันทึกแก้ไขแก้ไขข้อมูลสาขาหมวดหมู่สินค้').click();
  await page.locator('.ant-select.form-control > .ant-select-selector > .ant-select-selection-overflow').click();
  await page.getByText('[หมวดหมู่สาขา] อาหารจานเดียว').click();
  await page.getByRole('textbox', { name: 'ชื่อ ( ภาษาไทย ) *' }).click();
  await page.getByRole('textbox', { name: 'ชื่อ ( ภาษาไทย ) *' }).fill(PRODUCT_NAME);
  await page.getByRole('textbox', { name: 'ชื่อ ( English ) *' }).click();
  await page.getByRole('textbox', { name: 'ชื่อ ( English ) *' }).fill(PRODUCT_NAME);
  await page.getByRole('textbox', { name: 'ชื่อ ( English ) *' }).press('Tab');
  await page.getByRole('textbox', { name: 'รายละเอียด ( ภาษาไทย ) *' }).fill(PRODUCT_NAME);
  await page.getByRole('textbox', { name: 'รายละเอียด ( ภาษาไทย ) *' }).press('Tab');
  await page.getByRole('textbox', { name: 'รายละเอียด ( English ) *' }).fill(PRODUCT_NAME);
  await page.locator('input[name="price"]').click();
  await page.locator('input[name="price"]').fill('50');
  await page.getByRole('button', { name: 'บันทึก' }).nth(1).click();

  })
})