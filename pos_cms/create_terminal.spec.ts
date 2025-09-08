import { test, expect } from '@playwright/test';
import { login,open_brand_and_outlet } from '../config';
const URL = 'https://staging-bluestat-cms.devfullteam.tech/login';
const EMAIL = 'suleemas.fua+55@fullteam.tech';
const PASSWORD = 'Ying964232';
const BRAND_ID = "A607"; //ying_BS_onboardไม่มีเพดาน
const OUTLET_ID = "1607"; //1607

test.describe('Login', () => {
  test('create and delete terminal', async ({ page }) => {
  await login(page, URL, EMAIL, PASSWORD);
  await open_brand_and_outlet(page, BRAND_ID, OUTLET_ID);
  await page.getByText('POS ทั้งหมด').click();
  await page.waitForTimeout(2000);

  //เช็คว่า column 'Terminal ID' แสดงอยู่หรือไม่
  const terminalIdColumn = page.getByText('Terminal ID');// ใช้ getByText เพื่อค้นหา column 'Terminal ID'
  if (await terminalIdColumn.isVisible()) {// ถ้า column 'Terminal ID' แสดงอยู่
    console.log('Terminal ID column is visible');
    const serialno = await page.locator('#row-0 > div').nth(4).innerText();
    const activecode = await page.locator('#row-0 > div').nth(5).innerText();
    if (serialno == activecode) {// ตรวจสอบว่า Serial No และ Active Code ตรงกันหรือไม่
      console.log('Serial No and Active Code match:', serialno);// ถ้าตรงกันก็แสดง serial no เอาไปให้ได้     
    } else {// ถ้า Serial No และ Active Code ไม่ตรงกัน ก็ลบ terminal
      await page.waitForTimeout(2000); 
      await page.getByRole('button', { name: '' }).click();
      await page.getByRole('button', { name: 'confirm' }).click();
      console.log('ลบ terminal สำเร็จ');
      await page.waitForTimeout(2000);  
      // สร้าง terminal ต่อหลังลบสำเร็จ
      await page.getByRole('link', { name: 'สร้าง' }).click();
      await page.locator('#outletId').selectOption(OUTLET_ID);
      await page.getByRole('textbox', { name: 'Activate Code : ชื่อเครื่อง' }).click();
      await page.getByRole('textbox', { name: 'Activate Code : ชื่อเครื่อง' }).fill('test');
      await page.locator('span').filter({ hasText: 'POS BDG' }).locator('i').click();
      await page.waitForTimeout(2000);
      await page.getByRole('button', { name: 'บันทึก' }).click();
      await page.waitForTimeout(2000);
      const newserialno = await page.locator('#row-0 > div').nth(4).innerText();
      console.log('สร้าง terminal สำเร็จ '+'Serial No:', newserialno);
    }
  } else {
    // กรณีไม่มี terminal ให้สร้างใหม่เลย
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