import { test, expect } from "@playwright/test";
import { login, open_brand_and_outlet } from "../config";
const URL = "https://staging-bluestat-cms.devfullteam.tech/login";
const EMAIL = "suleemas.fua+55@fullteam.tech";
const PASSWORD = "Ying964232";
const BRAND_ID = "607"; //ying_onboardingไม่มีเพดาน
const OUTLET_ID = "1607"; 

test.describe("Login", () => {
  test("create promotion on top ลด x บาท", async ({ page }) => {
    const promotion_name = "โปรโมชันลด ";
    const discount = "10";// จำนวนทีส่วนลดที่ได้รับ
    await login(page, URL, EMAIL, PASSWORD);
    await open_brand_and_outlet(page, BRAND_ID, OUTLET_ID);
    await page.getByRole("link", { name: " สาขาทั้งหมด" }).click();
    await page.getByRole("button", { name: "" }).click();
    await page.getByRole('tab', { name: 'โปรโมชันเสริม', exact: true }).click();
    await page.getByRole('button', { name: 'โปรโมชันเสริม' }).click();
    await page.locator('input[name="name"]').click();
    await page.locator('input[name="name"]').fill(promotion_name + discount + " บาท");
    await page.locator('textarea[name="description"]').click();
    await page.locator('textarea[name="description"]').fill(promotion_name);
    await page.getByRole('checkbox', { name: 'เลือกทุกวัน' }).check();
    await page.locator('.ant-picker').first().click();
    await page.waitForTimeout(3000);
    await page.getByRole('button').filter({ hasText: /^$/ }).nth(1).click();
    await page.getByRole('cell', { name: '13' }).locator('div').click();
    await page.getByRole('button', { name: 'Ok' }).click();
    await page.getByRole('textbox', { name: 'Select date' }).click();
    await page.waitForTimeout(3000);
    await page.getByRole('button').filter({ hasText: /^$/ }).nth(4).click();
    await page.getByRole('cell', { name: '31' }).locator('div').click();
    await page.getByRole('button', { name: 'Ok' }).click();
    await page.getByRole('button', { name: 'ถัดไป right' }).click();
    //หน้าเงื่อนไข
    await page.locator('span').filter({ hasText: 'ส่วนลดเป็นจำนวนเงิน' }).locator('i').click();
    await page.getByRole('textbox', { name: '0' }).click();
    await page.getByRole('textbox', { name: '0' }).fill(discount);
    await page.getByRole('button', { name: 'บันทึก' }).click();
    console.log("สร้างโปรเสริมสำเร็จ " + promotion_name + "ลด" + discount + "บาท");
  });
});

test.describe("Login", () => {
  test("create promotion on top ลด x %", async ({ page }) => {
    const promotion_name = "โปรโมชันลด ";
    const discount = "10";// จำนวนทีส่วนลดที่ได้รับ
    await login(page, URL, EMAIL, PASSWORD);
    await open_brand_and_outlet(page, BRAND_ID, OUTLET_ID);
    await page.getByRole("link", { name: " สาขาทั้งหมด" }).click();
    await page.getByRole("button", { name: "" }).click();
    await page.getByRole('tab', { name: 'โปรโมชันเสริม', exact: true }).click();
    await page.getByRole('button', { name: 'โปรโมชันเสริม' }).click();
    await page.locator('input[name="name"]').click();
    await page.locator('input[name="name"]').fill(promotion_name + discount + " %");
    await page.locator('textarea[name="description"]').click();
    await page.locator('textarea[name="description"]').fill(promotion_name);
    await page.getByRole('checkbox', { name: 'เลือกทุกวัน' }).check();
    await page.locator('.ant-picker').first().click();
    await page.waitForTimeout(3000);
    await page.getByRole('button').filter({ hasText: /^$/ }).nth(1).click();
    await page.getByRole('cell', { name: '13' }).locator('div').click();
    await page.getByRole('button', { name: 'Ok' }).click();
    await page.getByRole('textbox', { name: 'Select date' }).click();
    await page.waitForTimeout(3000);
    await page.getByRole('button').filter({ hasText: /^$/ }).nth(4).click();
    await page.getByRole('cell', { name: '31' }).locator('div').click();
    await page.getByRole('button', { name: 'Ok' }).click();
    await page.getByRole('button', { name: 'ถัดไป right' }).click();
    //หน้าเงื่อนไข
    await page.locator('span').filter({ hasText: 'ส่วนลดเป็นเปอร์เซ็นต์' }).locator('i').click();
    await page.getByRole('textbox', { name: '0' }).click();
    await page.getByRole('textbox', { name: '0' }).fill(discount);
    await page.getByText('ไม่จำกัด').click();
    await page.getByText('ไม่จำกัด').nth(1).click();
    await page.getByRole('button', { name: 'บันทึก' }).click();
    console.log("สร้างโปรเสริมสำเร็จ " + promotion_name + "ลด" + discount + "%");
  });
});

test.describe("Login", () => {
  test("create promotion on top กำหนดเองแบบจำนวนเงิน", async ({ page }) => {
    const promotion_name = "กำหนดเองแบบจำนวนเงิน";
    await login(page, URL, EMAIL, PASSWORD);
    await open_brand_and_outlet(page, BRAND_ID, OUTLET_ID);
    await page.getByRole("link", { name: " สาขาทั้งหมด" }).click();
    await page.getByRole("button", { name: "" }).click();
    await page.getByRole('tab', { name: 'โปรโมชันเสริม', exact: true }).click();
    await page.getByRole('button', { name: 'โปรโมชันเสริม' }).click();
    await page.locator('input[name="name"]').click();
    await page.locator('input[name="name"]').fill(promotion_name);
    await page.locator('textarea[name="description"]').click();
    await page.locator('textarea[name="description"]').fill(promotion_name);
    await page.getByRole('checkbox', { name: 'เลือกทุกวัน' }).check();
    await page.locator('.ant-picker').first().click();
    await page.waitForTimeout(3000);
    await page.getByRole('button').filter({ hasText: /^$/ }).nth(1).click();
    await page.getByRole('cell', { name: '13' }).locator('div').click();
    await page.getByRole('button', { name: 'Ok' }).click();
    await page.getByRole('textbox', { name: 'Select date' }).click();
    await page.waitForTimeout(3000);
    await page.getByRole('button').filter({ hasText: /^$/ }).nth(4).click();
    await page.getByRole('cell', { name: '31' }).locator('div').click();
    await page.getByRole('button', { name: 'Ok' }).click();
    await page.getByRole('button', { name: 'ถัดไป right' }).click();
    //หน้าเงื่อนไข
    await page.locator('span').filter({ hasText: 'ส่วนลดกำหนดเองแบบจำนวนเงิน' }).locator('i').click();
    await page.getByRole('button', { name: 'บันทึก' }).click();
    console.log("สร้างโปรเสริมสำเร็จ " + promotion_name);
  });
});

test.describe("Login", () => {
  test("create promotion on top แถมสินค้า", async ({ page }) => {
    const promotion_name = "แถมสินค้า ";
    const category_name = 'Coffee'; // กำหนดหมวดหมู่ที่ต้องการใช้ในโปรโมชัน
    await login(page, URL, EMAIL, PASSWORD);
    await open_brand_and_outlet(page, BRAND_ID, OUTLET_ID);
    await page.getByRole("link", { name: " สาขาทั้งหมด" }).click();
    await page.getByRole("button", { name: "" }).click();
    await page.getByRole('tab', { name: 'โปรโมชันเสริม', exact: true }).click();
    await page.getByRole('button', { name: 'โปรโมชันเสริม' }).click();
    await page.locator('input[name="name"]').click();
    await page.locator('input[name="name"]').fill(promotion_name + " หมวดหมู่ " + category_name);
    await page.locator('textarea[name="description"]').click();
    await page.locator('textarea[name="description"]').fill(promotion_name);
    await page.getByRole('checkbox', { name: 'เลือกทุกวัน' }).check();
    await page.locator('.ant-picker').first().click();
    await page.waitForTimeout(3000);
    await page.getByRole('button').filter({ hasText: /^$/ }).nth(1).click();
    await page.getByRole('cell', { name: '13' }).locator('div').click();
    await page.getByRole('button', { name: 'Ok' }).click();
    await page.getByRole('textbox', { name: 'Select date' }).click();
    await page.waitForTimeout(3000);
    await page.getByRole('button').filter({ hasText: /^$/ }).nth(4).click();
    await page.getByRole('cell', { name: '31' }).locator('div').click();
    await page.getByRole('button', { name: 'Ok' }).click();
    await page.getByRole('button', { name: 'ถัดไป right' }).click();
    //หน้าเงื่อนไข
    await page.locator('span').filter({ hasText: 'แถมสินค้า' }).locator('i').click();
    await page.locator('.ant-select-selection-overflow').click();
    await page.getByText('[หมวดหมู่สาขา] ' + category_name ).click();
    await page.getByRole('button', { name: 'บันทึก' }).click();
    console.log("สร้างโปรเสริมสำเร็จ " + promotion_name);
  });
});