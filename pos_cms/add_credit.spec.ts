import { test, expect } from "@playwright/test";
import { login, open_brand_and_outlet } from '../config';
const URL = "https://staging-bluestat-cms.devfullteam.tech/login";
const EMAIL = "suleemas.fua+55@fullteam.tech";
const PASSWORD = "Ying964232";
const BRAND_ID = "607";
const OUTLET_ID = "1607";
const Add_Credit = "1000";
const Withdraw_Credit = "100";

test.describe("Login", () => {
  test("add credit", async ({ page }) => {
    await login(page, URL, EMAIL, PASSWORD);
    await open_brand_and_outlet(page, BRAND_ID, OUTLET_ID);
    await page.getByRole("link", { name: " สาขาทั้งหมด" }).click();
    await page.getByRole("button", { name: "" }).click();
    await page.getByRole("tab", { name: "จัดการเครดิต" }).click();
    await page.getByText("เติม/ถอน เครดิต").click();
    await page.getByRole("spinbutton").click();
    await page.getByRole("spinbutton").fill(Add_Credit);
    await page.getByRole("textbox").click();
    await page.getByRole("textbox").fill("add");
    await page.getByRole("button", { name: "บันทึก" }).click();
    console.log('เติมสำเร็จ ' + Add_Credit + ' เครดิต');
  });
});

test.describe("Login", () => {
  test("withdraw credit", async ({ page }) => {
    await login(page, URL, EMAIL, PASSWORD);
    await open_brand_and_outlet(page, BRAND_ID, OUTLET_ID);
    await page.getByRole("link", { name: " สาขาทั้งหมด" }).click();
    await page.getByRole("button", { name: "" }).click();
    await page.getByRole("tab", { name: "จัดการเครดิต" }).click();
    await page.getByText("เติม/ถอน เครดิต").click();
    await page.locator("span").filter({ hasText: "ถอนเครดิต" }).locator("i").click();
    await page.getByRole("spinbutton").click();
    await page.getByRole("spinbutton").fill(Withdraw_Credit);
    await page.getByRole("textbox").click();
    await page.getByRole("textbox").fill("withdraw");
    await page.getByRole("button", { name: "บันทึก" }).click();
    console.log('ถอนสำเร็จ ' + Withdraw_Credit + ' เครดิต');
  });
});