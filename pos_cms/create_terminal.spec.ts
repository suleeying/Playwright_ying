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
  test('create and delete terminal', async ({ page }) => {
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

  //เช็คว่า column 'Terminal ID' แสดงอยู่หรือไม่
  const terminalIdColumn = page.getByText('Terminal ID');
  if (await terminalIdColumn.isVisible()) {// ถ้า column 'Terminal ID' แสดงอยู่
    console.log('Terminal ID column is visible');//
    const serialno = await page.locator('#row-0 > div').nth(4).innerText();
    const activecode = await page.locator('#row-0 > div').nth(5).innerText();
    if (serialno == activecode) {
      console.log('Serial No and Active Code match:', serialno);      
    } else {
      await page.waitForTimeout(3000); 
      await page.getByRole('button', { name: '' }).click();
      await page.getByRole('button', { name: 'confirm' }).click();
      console.log('ลบ terminal สำเร็จ');  
    }
  } else {
    await page.getByRole('link', { name: 'สร้าง' }).click();
    await page.locator('#outletId').selectOption(OUTLET_ID);
    await page.getByRole('textbox', { name: 'Activate Code : ชื่อเครื่อง' }).click();
    await page.getByRole('textbox', { name: 'Activate Code : ชื่อเครื่อง' }).fill('test');
    await page.locator('span').filter({ hasText: 'POS BDG' }).locator('i').click();
    await page.waitForTimeout(2000);
    await page.getByRole('button', { name: 'บันทึก' }).click();
    await page.waitForTimeout(2000);
    // ดึงค่า Serial No จาก cell ในแถวแรก (สมมติ Serial No อยู่ column 4)
    const newserialno = await page.locator('#row-0 > div').nth(4).innerText();
    console.log('สร้าง terminal สำเร็จ '+'Serial No:', newserialno);
  }
})
})