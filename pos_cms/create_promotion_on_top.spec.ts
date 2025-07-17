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
async function brand_and_outlet (page: any) {
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
    await page.getByRole('tab', { name: 'โปรโมชันเสริม', exact: true }).click();
}

test.describe("Login", () => {
  test("create promotion on top ลด x บาท", async ({ page }) => {
    const promotion_name = "โปรโมชันลด ";
    const discount = "10";// จำนวนทีส่วนลดที่ได้รับ
    await login(page);
    await brand_and_outlet(page);
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
    await login(page);
    await brand_and_outlet(page);
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
    await login(page);
    await brand_and_outlet(page);
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
    await login(page);
    await brand_and_outlet(page);
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