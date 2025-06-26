import { test, expect } from '@playwright/test';
const URL = 'https://staging-bluestat-cms.devfullteam.tech/login';
const EMAIL = 'suleemas.fua+55@fullteam.tech';
const PASSWORD = 'Ying964232';
const BRAND = '420';



test('create terminal', async ({ page }) => {
  await page.goto(URL,{ timeout: 10000 });
  await page.locator('#email').fill(EMAIL);
  await page.locator('#password').fill(PASSWORD);
  await page.getByRole('button', { name: 'ลงชื่อเข้าใช้' }).click();
  await page.waitForTimeout(10000);
  // รอให้หน้าโหลดเสร็จและใช้ selector ที่แม่นยำมากขึ้น
  await page.waitForLoadState('networkidle');
  // ลองใช้ first() เพื่อเลือก element แรกที่เจอ
  await page.getByText('ผู้ใช้งานสูงสุด').first().click();
  await page.locator('ค้นหาแบรนด์..').click();
  await page.locator('ค้นหาแบรนด์..').fill('420');
  await page.getByText('420').click();
  await page.getByText('เปิด').click();
  await page.getByText('POS ทั้งหมด').click();

  // เช็คว่าเจอ "เครื่องหลัก (Host)" หรือไม่
  const hostElement = page.getByText('เครื่องหลัก (Host)');
  const isHostVisible = await hostElement.isVisible();

  if (!isHostVisible) {
    // ถ้าไม่เจอให้คลิก "สร้าง"
    await page.getByText('สร้าง').click();
    console.log('ไม่เจอ เครื่องหลัก (Host) - คลิก สร้าง');
  } else {
    await page.waitForTimeout(2000);
    // ดึงค่า serial no และ activation code (ปรับ selector ตามหน้าจริง)
    const serialNo = await page.locator('[data-testid="serial-no"]').textContent() || 
                     await page.locator('input[placeholder*="Serial"]').inputValue() ||
                     await page.locator('//label[contains(text(),"Serial")]/following-sibling::input').inputValue();
    
    const activationCode = await page.locator('[data-testid="activation-code"]').textContent() ||
                          await page.locator('input[placeholder*="Activation"]').inputValue() ||
                          await page.locator('//label[contains(text(),"Activation")]/following-sibling::input').inputValue();
    
    console.log('Serial No:', serialNo);
    console.log('Activation Code:', activationCode);
    
    if (serialNo === activationCode) {
      // ถ้าเหมือนกันให้หยุดการทำงาน
      console.log('Serial No และ Activation Code เหมือนกัน - หยุดการทำงาน');
      return; // หยุดการทำงาน
    } else {
      // ถ้าไม่เหมือนกันให้ลบ
      console.log('Serial No และ Activation Code ไม่เหมือนกัน - กำลังลบ');
      await page.getByText('ลบ').click();
      // ยืนยันการลบ (ถ้ามี confirm dialog)
      // await page.getByText('ยืนยัน').click();
    }
  }
})