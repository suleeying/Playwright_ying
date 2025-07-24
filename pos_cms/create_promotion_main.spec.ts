import { test, expect } from "@playwright/test";
import { login, open_brand_and_outlet } from "../config"; // นำเข้า config ที่มีฟังก์ชัน login
const URL = "https://staging-bluestat-cms.devfullteam.tech/login";
const EMAIL = "suleemas.fua+55@fullteam.tech";
const PASSWORD = "Ying964232";
const BRAND_ID = "607"; //ying_onboardingไม่มีเพดาน
const OUTLET_ID = "1607"; 

test.describe("Login", () => {
  test("create main promotion 10 แถม 1", async ({ page }) => {
    const promotion_name = "โปรโมชันลด ";
    const quantity = "10";// จำนวนที่ต้องซื้อเพื่อรับโปรโมชั่น
    const free_gift = "1";// จำนวนของแถมที่ได้รับ
    const category = '[หมวดหมู่สาขา]'; // [หมวดหมู่แบรนด์] หรือ [หมวดหมู่สาขา]
    const category_name = 'Coffee'; // กำหนดหมวดหมู่ที่ต้องการใช้ในโปรโมชัน
    await login(page, URL, EMAIL, PASSWORD);
    await open_brand_and_outlet(page, BRAND_ID, OUTLET_ID);
    await page.getByRole("link", { name: " สาขาทั้งหมด" }).click();
    await page.getByRole("button", { name: "" }).click();
    await page.getByRole('tab', { name: 'โปรโมชัน', exact: true }).click();
    await page.getByRole('button', { name: 'สร้างแคมเปญ' }).click();
    await page.locator('input[name="name"]').click();
    await page.locator('input[name="name"]').fill(promotion_name + " ซื้อครบ " + quantity + " แถม " + free_gift + " เมื่อซื้อสินค้าหมวดหมู่ " + category_name);
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
    await page.locator('span').filter({ hasText: 'เข้าร่วมทุกกลุ่ม' }).locator('i').click();
    await page.getByRole('button', { name: 'บันทึก' }).click();
    //หน้าเงื่อนไข
    await page.locator('label').filter({ hasText: 'หมวดหมู่' }).locator('i').click();
    await page.locator('.ant-select-selection-overflow').click();
    await page.locator('#rc_select_6').fill(category+' ' + category_name);
    await page.locator('#rc_select_6').press('Enter');
    await page.locator('span').filter({ hasText: 'ซื้อสินค้าให้ครบจำนวนชิ้น' }).locator('i').click();
    await page.getByRole('tabpanel', { name: 'โปรโมชัน' }).getByPlaceholder('0').click();
    await page.getByRole('tabpanel', { name: 'โปรโมชัน' }).getByPlaceholder('0').fill(quantity);
    await page.locator('span').filter({ hasText: 'ซื้อ x แถม c (แถมราคาน้อยสุด)' }).locator('i').click();
    await page.getByRole('tabpanel', { name: 'โปรโมชัน' }).getByPlaceholder('0.00').click();
    await page.getByRole('tabpanel', { name: 'โปรโมชัน' }).getByPlaceholder('0.00').fill(free_gift);
    await page.getByText('จำกัด', { exact: true }).click();
    await page.getByText('ไม่จำกัด', { exact: true }).click();
    await page.getByRole('button', { name: 'บันทึก' }).click();
    console.log("สร้างโปรหลักสำเร็จ " + 'ซื้อ' + quantity +'ชิ้น'+' แถม' + free_gift +'ชิ้น'+ " ซืิ้อสินค้าหมวดหมู่ "+ category_name);
  });
});

test.describe("Login", () => {
  test("create main promotion ลด บาท", async ({ page }) => {
    const promotion_name = "โปรโมชันลด ";
    const price = "100";// จำนวนที่ต้องซื้อเพื่อรับโปรโมชั่น
    const discount = "10";// จำนวนทีส่วนลดที่ได้รับ
    const category = '[หมวดหมู่สาขา]'; // [หมวดหมู่แบรนด์] หรือ [หมวดหมู่สาขา]
    const category_name = 'Coffee'; // กำหนดหมวดหมู่ที่ต้องการใช้ในโปรโมชัน
    await login(page, URL, EMAIL, PASSWORD);
    await open_brand_and_outlet(page, BRAND_ID, OUTLET_ID);
    await page.getByRole("link", { name: " สาขาทั้งหมด" }).click();
    await page.getByRole("button", { name: "" }).click();
    await page.getByRole('tab', { name: 'โปรโมชัน', exact: true }).click();
    await page.getByRole('button', { name: 'สร้างแคมเปญ' }).click();
    await page.locator('input[name="name"]').click();
    await page.locator('input[name="name"]').fill(promotion_name + " ซื้อครบ " + price + " บาท ลด " + discount + " บาท" + " เมื่อซื้อสินค้าหมวดหมู่ " + category_name);
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
    await page.locator('span').filter({ hasText: 'เข้าร่วมทุกกลุ่ม' }).locator('i').click();
    await page.getByRole('button', { name: 'บันทึก' }).click();
    //หน้าเงื่อนไข
    await page.locator('label').filter({ hasText: 'หมวดหมู่' }).locator('i').click();
    await page.locator('.ant-select-selection-overflow').click();
    await page.locator('#rc_select_6').fill(category+' ' + category_name);
    await page.locator('#rc_select_6').press('Enter');
    await page.locator('span').filter({ hasText: 'ซื้อสินค้าให้ครบตามยอดซื้อ' }).locator('i').click();
    await page.getByRole('tabpanel', { name: 'โปรโมชัน' }).getByPlaceholder('0').click();
    await page.getByRole('tabpanel', { name: 'โปรโมชัน' }).getByPlaceholder('0').fill(price);
    await page.locator('span').filter({ hasText: 'ส่วนลดแบบจำนวนเงิน' }).locator('i').click();
    await page.locator('input[name="reward_quantity"]').click();
    await page.locator('input[name="reward_quantity"]').fill(discount);
    await page.getByText('จำกัด', { exact: true }).click();
    await page.getByText('ไม่จำกัด', { exact: true }).click();
    await page.getByRole('button', { name: 'บันทึก' }).click();
    console.log("สร้างโปรหลักสำเร็จ " + 'ซื้อ' + price +'ลด' + discount +'บาท'+ " ซืิ้อสินค้าหมวดหมู่ "+ category_name);
  });
});

test.describe("Login", () => {
  test("create main promotion ลด %", async ({ page }) => {
    const promotion_name = "โปรโมชันลด ";
    const price = "100";// จำนวนที่ต้องซื้อเพื่อรับโปรโมชั่น
    const discount = "10";// 
    const category = '[หมวดหมู่สาขา]'; // [หมวดหมู่แบรนด์] หรือ [หมวดหมู่สาขา]
    const category_name = 'Coffee'; // กำหนดหมวดหมู่ที่ต้องการใช้ในโปรโมชัน
    await login(page, URL, EMAIL, PASSWORD);
    await open_brand_and_outlet(page, BRAND_ID, OUTLET_ID);
    await page.getByRole("link", { name: " สาขาทั้งหมด" }).click();
    await page.getByRole("button", { name: "" }).click();
    await page.getByRole('tab', { name: 'โปรโมชัน', exact: true }).click();
    await page.getByRole('button', { name: 'สร้างแคมเปญ' }).click();
    await page.locator('input[name="name"]').click();
    await page.locator('input[name="name"]').fill(promotion_name + " ซื้อครบ " + price + " บาท ลด " + discount + " %" + " เมื่อซื้อสินค้าหมวดหมู่ " + category_name);
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
    await page.locator('span').filter({ hasText: 'เข้าร่วมทุกกลุ่ม' }).locator('i').click();
    await page.getByRole('button', { name: 'บันทึก' }).click();
    //หน้าเงื่อนไข
    await page.locator('label').filter({ hasText: 'หมวดหมู่' }).locator('i').click();
    await page.locator('.ant-select-selection-overflow').click();
    await page.locator('#rc_select_6').fill(category+' ' + category_name);
    await page.locator('#rc_select_6').press('Enter');
    await page.locator('span').filter({ hasText: 'ซื้อสินค้าให้ครบตามยอดซื้อ' }).locator('i').click();
    await page.getByRole('tabpanel', { name: 'โปรโมชัน' }).getByPlaceholder('0').click();
    await page.getByRole('tabpanel', { name: 'โปรโมชัน' }).getByPlaceholder('0').fill(price);
    await page.locator('span').filter({ hasText: 'ส่วนลดแบบเปอร์เซ็นต์' }).locator('i').click();
    await page.locator('input[name="reward_quantity"]').click();
    await page.locator('input[name="reward_quantity"]').fill(discount);
    await page.getByText('จำกัด', { exact: true }).click();
    await page.getByText('ไม่จำกัด', { exact: true }).click();
    await page.getByRole('button', { name: 'บันทึก' }).click();
    console.log("สร้างโปรหลักสำเร็จ " + 'ซื้อ' + price +'ลด' + discount +'%'+ " ซืิ้อสินค้าหมวดหมู่ "+ category_name);
  });
});