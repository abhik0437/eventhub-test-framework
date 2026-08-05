import { test, expect } from "@playwright/test";
import { config } from "tests/config/config";

test.describe("New event booking journey", () => {

    test("Verify new booking is made successfully and show up under My bookings", async ({ page }) => {

        await test.step("login to the application", async () => {

            await page.goto("/login");

            await page.getByLabel("Email").fill(config.email);

            await page.getByLabel("Password").fill(config.password);

            await page.locator("#login-btn").click();

            await page.waitForLoadState("networkidle");
        });

        await test.step("navigate to events page", async () => {

            await page.getByRole("link", { name: 'Events' }).first().click();
        });

        await test.step("click on Book Now button for the Test Event data card", async () => {

            const testEventDataCard=page.locator("article[data-testid='event-card']").filter({has: page.locator('h3:has-text("Test Event")')});

            await expect(testEventDataCard).toBeVisible();

            await testEventDataCard.locator("a:has-text('Book Now')").click();
    });

    await test.step('Verify Test Event details are displayed. Fill & confirm booking', async()=>{

        await expect(page.locator("h1")).toHaveText("Test Event");

        await page.locator("#customerName").fill("Abhinav");

        await page.locator("#customer-email").fill("abhi@test.com");

        await page.locator("#phone").fill("9876543210");

        await page.locator("#confirm-booking").click();

        await expect(page.locator("h3", {hasText: 'Booking Confirmed!'})).toBeVisible();



    });

    await test.step("Navigate to My Bookings page and confirm the booking is visible", async()=>{

        const bookingRef=await page.locator("span+span:has-text('T-')").textContent();

        await page.locator("button:has-text('View My Bookings')").click();

        await page.waitForLoadState("networkidle");
        
        const testEventbookingCard = page.getByTestId("booking-card").filter({has: page.locator("h3", {hasText: "Test Event"})}).first();

        await expect(testEventbookingCard).toBeVisible();

        await expect(testEventbookingCard.locator("span", {hasText: bookingRef!})).toBeVisible();


    })
    });


})