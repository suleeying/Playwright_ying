import { test, expect } from '@playwright/test';
import { login,open_brand_and_outlet } from '../config'; // นำเข้า config ที่มีฟังก์ชัน login
const URL = 'https://staging-bluestat-cms.devfullteam.tech/login';
const EMAIL = 'suleemas.fua+55@fullteam.tech';
const PASSWORD = 'Ying964232';
const BRAND_ID = "607"; //ying_onboardingไม่มีเพดาน
const OUTLET_ID = "1607"; 
const category_name_outlet = 'Coffee'; // หมวดหมู่ที่ต้องการเลือก
const category_name_brand = 'หมวดหมู่แบรนด์';
const product_number = 3; //loop กี่รอบ
const product_name_start_number = 1;

test.describe('Login', () => {
  test('create product outlet', async ({ page }) => {
  await login(page, URL, EMAIL, PASSWORD);
  await open_brand_and_outlet(page, BRAND_ID, OUTLET_ID);
  await page.getByRole('link', { name: ' สาขาทั้งหมด' }).click();
  await page.getByRole('button', { name: '' }).click();
    for (let i = product_name_start_number; i < product_name_start_number + product_number; i++) {
        await page.waitForTimeout(3000);
        await page.getByRole('tab', { name: 'สินค้า', exact: true }).click();
        await page.getByText('สร้างสินค้าใหม่').click();
        await page.getByRole('menuitem', { name: 'plus สินค้าเดี่ยว' }).locator('a').click();
        await page.getByRole('checkbox', { name: 'POS' }).check();
        //เลือก option
        //   await page.locator('.ant-select-selection-overflow').first().click();
        //   await page.getByTitle('ท็อปปิ้ง').locator('div').click();
        await page.getByText('เพิ่มสินค้าสินค้าของ :POSDeliveryImage+Upload Imageรองรับไฟล์ .png .jpg .jpeg').click();
        await page.locator('.ant-select.form-control > .ant-select-selector > .ant-select-selection-overflow').click();
        await page.getByText('[หมวดหมู่สาขา] '+ category_name_outlet).click();
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
      });
    });

  test.describe('Login', () => {
    test('create product brand', async ({ page }) => {// Login
    await login(page, URL, EMAIL, PASSWORD);
    await open_brand_and_outlet(page, BRAND_ID, OUTLET_ID);
      for (let i = product_name_start_number; i < product_name_start_number + product_number; i++) {
          await page.waitForTimeout(3000);  
          await page.getByRole('link', { name: ' สินค้า', exact: true }).click();
          await page.getByText('สร้างสินค้าใหม่').click();
          await page.getByRole('link', { name: 'plus สินค้าเดี่ยว' }).click();
          await page.getByRole('checkbox', { name: 'POS' }).check();
          //เลือก option
          //   await page.locator('.ant-select-selection-overflow').first().click();
          //   await page.getByTitle('ท็อปปิ้ง').locator('div').click();
          await page.getByText('เพิ่มสินค้าสินค้าของ :POSDeliveryImage+Upload Imageรองรับไฟล์ .png .jpg .jpeg').click();
          await page.locator('.ant-select.form-control > .ant-select-selector > .ant-select-selection-overflow').click();
          await page.getByText('[หมวดหมู่แบรนด์] '+ category_name_brand).click();
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
    });
  });