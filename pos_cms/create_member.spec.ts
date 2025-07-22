import { test, expect } from "@playwright/test";
const URL = "https://staging-bluestat-cms.devfullteam.tech/login";
const EMAIL = "suleemas.fua+55@fullteam.tech";
const PASSWORD = "Ying964232";
const BRAND_ID = "605"; //ying_BS_onboarding//297
const word = String.fromCharCode(Math.floor(Math.random() * 26) + 65);
const name = 'ying'+word; 
const topup = '100'; // จำนวนคะแนนที่ต้องการเติม
// const phone = '+66 868 884 272'

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
  test("create member outlet", async ({ page }) => {
    await login(page);
    await open_brand_and_outlet(page);
    await page.getByRole('tab', { name: 'รายชื่อสมาชิก' }).click();
    await page.getByText('เพิ่มรายชื่อสมาชิก').click();
    await page.locator('#member_type').selectOption('GENERAL');
    await page.locator('#first_name').click();
    await page.locator('#first_name').fill(name);
    await page.locator('#last_name').click();
    await page.locator('#last_name').fill('test');
    await page.waitForTimeout(3000);
    await page.getByRole('textbox', { name: 'เลือกวันที่' }).click();
    await page.waitForTimeout(3000);
    await page.getByRole('button').filter({ hasText: /^$/ }).nth(1).click();
    await page.getByRole('cell', { name: '13' }).locator('div').click();
    await page.getByRole('textbox', { name: '1 (702) 123-' }).click();
    const digits = Math.floor(Math.random() * 90000000) + 1;
    await page.getByRole('textbox', { name: '1 (702) 123-' }).fill('+668' + digits);
    await page.locator('span').filter({ hasText: 'หญิง' }).locator('i').click();
    await page.getByRole('button', { name: 'บันทึก' }).click();
    console.log('สร้างสมาชิกสำเร็จ: ' + name);
    //เติมคะแนน
    await page.waitForTimeout(3000);
    await page.getByRole('row', { name }).getByRole('button', { name: '' }).click();
    await page.getByRole('button', { name: 'setting ปรับคะแนน' }).click();
    await page.getByText('เพิ่มคะแนน').click();
    await page.getByRole('spinbutton').click();
    await page.getByRole('spinbutton').fill(topup);
    await page.locator('textarea[name="reason"]').click();
    await page.locator('textarea[name="reason"]').fill('test');
    await page.getByRole('button', { name: 'บันทึก' }).click();
    console.log('เติมคะแนนสำเร็จ: ' + topup + ' คะแนน');
  })
})
    