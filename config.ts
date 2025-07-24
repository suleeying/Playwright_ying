// ประกาศฟังก์ชันแยก และ export
export async function login(page: any, URL: string, EMAIL: string, PASSWORD: string) {
  await page.goto(URL, { timeout: 10000 })
  await page.locator("#email").fill(EMAIL);
  await page.locator("#password").fill(PASSWORD);
  await page.getByRole("button", { name: "ลงชื่อเข้าใช้" }).click();
  await page.waitForLoadState("networkidle");
}

export async function open_brand_and_outlet(page: any, BRAND_ID: string, OUTLET_ID: string) {
  await page.waitForLoadState("networkidle");
  await page.waitForTimeout(5000);
  await page.getByText("ผู้ใช้งานสูงสุด").first().click();
  await page.getByPlaceholder("ค้นหาแบรนด์..").click();
  await page.getByPlaceholder("ค้นหาแบรนด์..").fill(BRAND_ID);
  await page.getByText(BRAND_ID).click();
  await page.getByText("เปิด").click();
  await page.waitForTimeout(3000);
  // await page.getByRole("link", { name: " สาขาทั้งหมด" }).click();
  // await page.getByRole("button", { name: "" }).click();
}