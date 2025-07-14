import { test, expect } from '@playwright/test';
const URL = 'https://staging-bluestat-cms.devfullteam.tech/login';
const EMAIL = 'suleemas.fua+55@fullteam.tech';
const PASSWORD = 'Ying964232';
const BRAND_ID = '420';//ying_currency3 420//297
// const OUTLET_ID = '1474'; //test_currency3 1474//1471
const category_name = 'อาหารจานเดียว';
const product_number = 3; //loop กี่รอบ
const product_name_start_number = 5;

async function login(page: any) {
await page.goto(URL, { timeout: 10000 });
await page.locator('#email').fill(EMAIL);
await page.locator('#password').fill(PASSWORD);
await page.getByRole('button', { name: 'ลงชื่อเข้าใช้' }).click();
await page.waitForLoadState('networkidle');
}

test.describe('Login', () => {
  test('create product outlet', async ({ page }) => {// Login
  await login(page);
  await page.waitForLoadState('networkidle');// รอให้หน้าโหลดเสร็จและใช้ selector ที่แม่นยำมากขึ้น
  await page.waitForTimeout(5000);
  await page.getByText('ผู้ใช้งานสูงสุด').first().click();// ลองใช้ first() เพื่อเลือก element แรกที่เจอ
  await page.getByPlaceholder('ค้นหาแบรนด์..').click();
  await page.getByPlaceholder('ค้นหาแบรนด์..').fill(BRAND_ID);
  await page.getByText(BRAND_ID).click();
  await page.getByText('เปิด').click();
  await page.waitForTimeout(3000);
  await page.getByRole('link', { name: ' สาขาทั้งหมด' }).click();
  await page.getByRole('button', { name: '' }).click();
  
    // สร้างสินค้าจาก สินค้า5 ถึง สินค้า8
    for (let i = product_name_start_number; i < product_name_start_number + product_number; i++) {
        await page.getByRole('tab', { name: 'สินค้า', exact: true }).click();
        await page.getByText('สร้างสินค้าใหม่').click();
        await page.getByRole('menuitem', { name: 'plus สินค้าเดี่ยว' }).locator('a').click();
        await page.getByRole('checkbox', { name: 'POS' }).check();
        //เลือก option
        //   await page.locator('.ant-select-selection-overflow').first().click();
        //   await page.getByTitle('ท็อปปิ้ง').locator('div').click();
        await page.getByText('เพิ่มสินค้าสินค้าของ :POSDeliveryImage+Upload Imageรองรับไฟล์ .png .jpg .jpeg').click();
        await page.locator('.ant-select.form-control > .ant-select-selector > .ant-select-selection-overflow').click();
        await page.getByText('[หมวดหมู่สาขา] '+ category_name).click();
        await page.getByRole('textbox', { name: 'ชื่อ ( ภาษาไทย ) *' }).click();
        await page.getByRole('textbox', { name: 'ชื่อ ( ภาษาไทย ) *' }).fill('สินค้า'+i);
        await page.getByRole('textbox', { name: 'ชื่อ ( English ) *' }).click();
        await page.getByRole('textbox', { name: 'ชื่อ ( English ) *' }).fill('สินค้า'+i);
        await page.getByRole('textbox', { name: 'รายละเอียด ( ภาษาไทย ) *' }).click();
        await page.getByRole('textbox', { name: 'รายละเอียด ( ภาษาไทย ) *' }).fill('สินค้า'+i);
        await page.getByRole('textbox', { name: 'รายละเอียด ( English ) *' }).click();
        await page.getByRole('textbox', { name: 'รายละเอียด ( English ) *' }).fill('สินค้า'+i);
        await page.locator('input[name="price"]').click();
        await page.locator('input[name="price"]').fill('50');
        await page.getByRole('button', { name: 'บันทึก' }).nth(1).click();
        await page.waitForLoadState('networkidle', { timeout: 60000 });// รอให้การบันทึกเสร็จสิ้น - ใช้ waitForLoadState แทน waitForTimeout
        await page.waitForTimeout(5000);
        console.log('สินค้า'+i+'สร้างสำเร็จ');
  }
  })

  test.describe('Login', () => {
    test('create product brand', async ({ page }) => {// Login
    await login(page);
    await page.waitForLoadState('networkidle');// รอให้หน้าโหลดเสร็จและใช้ selector ที่แม่นยำมากขึ้น
    await page.waitForTimeout(5000);
    await page.getByText('ผู้ใช้งานสูงสุด').first().click();// ลองใช้ first() เพื่อเลือก element แรกที่เจอ
    await page.getByPlaceholder('ค้นหาแบรนด์..').click();
    await page.getByPlaceholder('ค้นหาแบรนด์..').fill(BRAND_ID);
    await page.getByText(BRAND_ID).click();
    await page.getByText('เปิด').click();
    await page.waitForTimeout(3000);
      
      for (let i = product_name_start_number; i < product_name_start_number + product_number; i++) {
        await page.getByRole('link', { name: ' สินค้า', exact: true }).click();
          await page.getByText('สร้างสินค้าใหม่').click();
          await page.getByRole('link', { name: 'plus สินค้าเดี่ยว' }).click();
          await page.getByRole('checkbox', { name: 'POS' }).check();
          //เลือก option
          //   await page.locator('.ant-select-selection-overflow').first().click();
          //   await page.getByTitle('ท็อปปิ้ง').locator('div').click();
          await page.getByText('เพิ่มสินค้าสินค้าของ :POSDeliveryImage+Upload Imageรองรับไฟล์ .png .jpg .jpeg').click();
          await page.locator('.ant-select.form-control > .ant-select-selector > .ant-select-selection-overflow').click();
          await page.getByText('[หมวดหมู่แบรนด์] '+ category_name).click();
          await page.getByRole('textbox', { name: 'ชื่อ ( ภาษาไทย ) *' }).click();
          await page.getByRole('textbox', { name: 'ชื่อ ( ภาษาไทย ) *' }).fill('สินค้า'+i);
          await page.getByRole('textbox', { name: 'ชื่อ ( English ) *' }).click();
          await page.getByRole('textbox', { name: 'ชื่อ ( English ) *' }).fill('สินค้า'+i);
          await page.getByRole('textbox', { name: 'รายละเอียด ( ภาษาไทย ) *' }).click();
          await page.getByRole('textbox', { name: 'รายละเอียด ( ภาษาไทย ) *' }).fill('สินค้า'+i);
          await page.getByRole('textbox', { name: 'รายละเอียด ( English ) *' }).click();
          await page.getByRole('textbox', { name: 'รายละเอียด ( English ) *' }).fill('สินค้า'+i);
          await page.locator('input[name="price"]').click();
          await page.locator('input[name="price"]').fill('50');
          await page.getByRole('button', { name: 'บันทึก' }).nth(1).click();
          await page.waitForLoadState('networkidle', { timeout: 60000 });// รอให้การบันทึกเสร็จสิ้น - ใช้ waitForLoadState แทน waitForTimeout
          await page.waitForTimeout(5000);
          console.log('สินค้า'+i+'สร้างสำเร็จ');
    }
    })
})
})