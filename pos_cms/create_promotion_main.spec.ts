import { test, expect } from "@playwright/test";
const URL = "https://staging-bluestat-cms.devfullteam.tech/login";
const EMAIL = "suleemas.fua+55@fullteam.tech";
const PASSWORD = "Ying964232";
const BRAND_ID = "605"; //ying_BS_onboarding//297

async function login(page: any) {
  await page.goto(URL, { timeout: 10000 });
  await page.locator("#email").fill(EMAIL);
  await page.locator("#password").fill(PASSWORD);
  await page.getByRole("button", { name: "ลงชื่อเข้าใช้" }).click();
  await page.waitForLoadState("networkidle");
}
async function open_brand_and_outlet (page: any) {
    await page.waitForLoadState("networkidle"); // รอให้หน้าโหลดเสร็จและใช้ selector ที่แม่นยำมากขึ้น
    await page.waitForTimeout(5000);
    await page.getByText("ผู้ใช้งานสูงสุด").first().click(); // ลองใช้ first() เพื่อเลือก element แรกที่เจอ
    await page.getByPlaceholder("ค้นหาแบรนด์..").click();
    await page.getByPlaceholder("ค้นหาแบรนด์..").fill(BRAND_ID);
    await page.getByText(BRAND_ID).click();
    await page.getByText("เปิด").click();
    await page.waitForTimeout(3000);
    await page.getByRole("link", { name: " สาขาทั้งหมด" }).click();
    await page.getByRole("button", { name: "" }).click();
}

test.describe("Login", () => {
  test("create main promotion 10 แถม 1", async ({ page }) => {
    const promotion_name = "โปรโมชันลด ";
    const quantity = "10";// จำนวนที่ต้องซื้อเพื่อรับโปรโมชั่น
    const free_gift = "1";// จำนวนของแถมที่ได้รับ
    const category_name = 'Coffee'; // กำหนดหมวดหมู่ที่ต้องการใช้ในโปรโมชัน
    await login(page);
    await open_brand_and_outlet(page);
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
    await page.getByText('[หมวดหมู่สาขา] '+category_name).click();
    await page.locator('span').filter({ hasText: 'ซื้อสินค้าให้ครบจำนวนชิ้น' }).locator('i').click();
    await page.getByRole('tabpanel', { name: 'โปรโมชัน' }).getByPlaceholder('0').click();
    await page.getByRole('tabpanel', { name: 'โปรโมชัน' }).getByPlaceholder('0').fill(quantity);
    await page.locator('span').filter({ hasText: 'ซื้อ x แถม c (แถมราคาน้อยสุด)' }).locator('i').click();
    await page.getByRole('tabpanel', { name: 'โปรโมชัน' }).getByPlaceholder('0.00').click();
    await page.getByRole('tabpanel', { name: 'โปรโมชัน' }).getByPlaceholder('0.00').fill(free_gift);
    await page.getByText('จำกัด', { exact: true }).click();
    await page.getByText('ไม่จำกัด', { exact: true }).click();
    await page.getByRole('button', { name: 'บันทึก' }).click();
    console.log("สร้างโปรหลักสำเร็จ " + promotion_name + "ซืิ้อสินค้าหมวดหมู่ "+ category_name);
  });
});

test.describe("Login", () => {
  test("create main promotion ลด บาท", async ({ page }) => {
    const promotion_name = "โปรโมชันลด ";
    const price = "100";// จำนวนที่ต้องซื้อเพื่อรับโปรโมชั่น
    const discount = "10";// จำนวนทีส่วนลดที่ได้รับ
    const category_name = 'Coffee'; // กำหนดหมวดหมู่ที่ต้องการใช้ในโปรโมชัน
    await login(page);
    await open_brand_and_outlet(page);
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
    await page.getByText('[หมวดหมู่สาขา] '+category_name).click();
    await page.locator('span').filter({ hasText: 'ซื้อสินค้าให้ครบตามยอดซื้อ' }).locator('i').click();
    await page.getByRole('tabpanel', { name: 'โปรโมชัน' }).getByPlaceholder('0').click();
    await page.getByRole('tabpanel', { name: 'โปรโมชัน' }).getByPlaceholder('0').fill(price);
    await page.locator('span').filter({ hasText: 'ส่วนลดแบบจำนวนเงิน' }).locator('i').click();
    await page.locator('input[name="reward_quantity"]').click();
    await page.locator('input[name="reward_quantity"]').fill(discount);
    await page.getByText('จำกัด').click();
    await page.getByText('ไม่จำกัด').click();
    await page.getByRole('button', { name: 'บันทึก' }).click();
    console.log("สร้างโปรหลักสำเร็จ " + promotion_name + "ซืิ้อสินค้าหมวดหมู่ "+ category_name);
  });
});

test.describe("Login", () => {
  test("create main promotion ลด %", async ({ page }) => {
    const promotion_name = "โปรโมชันลด ";
    const price = "100";// จำนวนที่ต้องซื้อเพื่อรับโปรโมชั่น
    const discount = "10";// จำนวนทีส่วนลดที่ได้รับ
    const category_name = 'Coffee'; // กำหนดหมวดหมู่ที่ต้องการใช้ในโปรโมชัน
    await login(page);
    await open_brand_and_outlet(page);
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
    await page.getByText('[หมวดหมู่สาขา] '+category_name).click();
    await page.locator('span').filter({ hasText: 'ซื้อสินค้าให้ครบตามยอดซื้อ' }).locator('i').click();
    await page.getByRole('tabpanel', { name: 'โปรโมชัน' }).getByPlaceholder('0').click();
    await page.getByRole('tabpanel', { name: 'โปรโมชัน' }).getByPlaceholder('0').fill(price);
    await page.locator('span').filter({ hasText: 'ส่วนลดแบบเปอร์เซ็นต์' }).locator('i').click();
    await page.locator('input[name="reward_quantity"]').click();
    await page.locator('input[name="reward_quantity"]').fill(discount);
    await page.getByText('จำกัด').click();
    await page.getByText('ไม่จำกัด').click();
    await page.getByRole('button', { name: 'บันทึก' }).click();
    console.log("สร้างโปรหลักสำเร็จ " + promotion_name + "ซืิ้อสินค้าหมวดหมู่ "+ category_name);
  });
});