import { test, expect } from "@playwright/test";
const URL = "https://staging-bluestat-cms.devfullteam.tech/login";
const EMAIL = "suleemas.fua+55@fullteam.tech";
const PASSWORD = "Ying964232";
const BRAND_ID = "297"; //ying_BS_onboarding//297
const OUTLET_ID = "1471"; //ying_BS_onboarding//1471
const Add_Credit = "1000";
const Withdraw_Credit = "100";

async function login(page: any) {
  await page.goto(URL, { timeout: 10000 });
  await page.locator("#email").fill(EMAIL);
  await page.locator("#password").fill(PASSWORD);
  await page.getByRole("button", { name: "ลงชื่อเข้าใช้" }).click();
  await page.waitForLoadState("networkidle");
}

test.describe("Login", () => {
  test("add credit", async ({ page }) => {
    await login(page);
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
    await page.getByRole("tab", { name: "จัดการเครดิต" }).click();
    await page.getByText("เติม/ถอน เครดิต").click();
    await page.getByRole("spinbutton").click();
    await page.getByRole("spinbutton").fill(Add_Credit);
    await page.getByRole("textbox").click();
    await page.getByRole("textbox").fill("add");
    await page.getByRole("button", { name: "บันทึก" }).click();
  });
});