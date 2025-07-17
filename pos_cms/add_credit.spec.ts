import { test, expect } from "@playwright/test";
const URL = "https://staging-bluestat-cms.devfullteam.tech/login";
const EMAIL = "suleemas.fua+55@fullteam.tech";
const PASSWORD = "Ying964232";
const BRAND_ID = "605"; //ying_BS_onboarding//297
const OUTLET_ID = "1604"; //ying_BS_onboarding//1471
const Add_Credit = "1000";
const Withdraw_Credit = "100";

async function login(page: any) {
  await page.goto(URL, { timeout: 10000 });
  await page.locator("#email").fill(EMAIL);
  await page.locator("#password").fill(PASSWORD);
  await page.getByRole("button", { name: "ลงชื่อเข้าใช้" }).click();
  await page.waitForLoadState("networkidle");
}
async function open_brand_and_outlet(page: any) {
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
  test("add credit", async ({ page }) => {
    await login(page);
    await open_brand_and_outlet(page);
    await page.getByRole("tab", { name: "จัดการเครดิต" }).click();
    await page.getByText("เติม/ถอน เครดิต").click();
    await page.getByRole("spinbutton").click();
    await page.getByRole("spinbutton").fill(Add_Credit);
    await page.getByRole("textbox").click();
    await page.getByRole("textbox").fill("add");
    await page.getByRole("button", { name: "บันทึก" }).click();
    console.log('เติมสำเร็จ '+ Add_Credit+' เครดิต');
  });
});

test.describe("Login", () => {
  test("withdraw credit", async ({ page }) => {
    await login(page);
    await open_brand_and_outlet(page);
    await page.getByRole("tab", { name: "จัดการเครดิต" }).click();
    await page.getByText("เติม/ถอน เครดิต").click();
    await page.locator("span").filter({ hasText: "ถอนเครดิต" }).locator("i").click();
    await page.getByRole("spinbutton").click();
    await page.getByRole("spinbutton").fill(Withdraw_Credit);
    await page.getByRole("textbox").click();
    await page.getByRole("textbox").fill("withdraw");
    await page.getByRole("button", { name: "บันทึก" }).click();
    console.log('ถอนสำเร็จ '+ Withdraw_Credit+' เครดิต');
  });
});
