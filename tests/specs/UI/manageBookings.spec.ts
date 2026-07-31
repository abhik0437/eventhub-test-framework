import { test } from "@fixtures/base.fixture";
import { expect } from "@playwright/test";
import { config } from "tests/config/config";
import bookingsResponse from "../../test-data/bookingsResponse.json";

test.describe("@UI @Regression Admin > Manage Bookings validations", () => {

    test("Verify the heading 'Manage Bookings' is present", async ({ manageBookingsPage }) => {

        await expect(manageBookingsPage.heading).toBeVisible();
    });

    test("@APImocking The total bookings count specified below heading should match with actual count", async ({ homePage, manageBookingsPage }) => {


        await manageBookingsPage.page.route(`${config.apiUrl}/bookings*`, async route => {

            const responseBody = JSON.stringify(bookingsResponse);

            await route.fulfill({
                body: responseBody
            });
        });

        await manageBookingsPage.page.reload();

        await manageBookingsPage.page.waitForLoadState("networkidle");

        const totalBookingsCountText = await manageBookingsPage.totalBookingsCount.textContent();
        const totalBookingsCount = parseInt(totalBookingsCountText!.split(" ")[0]);

        await expect(manageBookingsPage.allBookings).toHaveCount(totalBookingsCount);

    });

    test("verify when filtering with 'Cancelled' status, no bookings get displayed", async ({ manageBookingsPage }) => {

        await manageBookingsPage.statusDropdown.selectOption("cancelled");

        await expect(manageBookingsPage.noBookingsMessage).toBeVisible();
    });

    test("@APImocking first booking details should be displayed appropriately", async ({ manageBookingsPage }) => {

        await test.step("Intercept response and send mock booking data as response", async () => {

            await manageBookingsPage.page.route(`${config.apiUrl}/bookings*`, async route => {

                const responseBody = JSON.stringify(bookingsResponse);

                await route.fulfill({
                    body: responseBody
                });
            });

            await manageBookingsPage.page.reload();

            await manageBookingsPage.page.waitForLoadState("networkidle");

        })

        await test.step("verify first booking element details", async () => {

            const firstBookingElement = manageBookingsPage.allBookings.first();

            const firstBookingDetails = JSON.parse(JSON.stringify(bookingsResponse)).data[0];

            await expect(firstBookingElement.locator("td:first-of-type")).toHaveText(firstBookingDetails.bookingRef);

            await expect(firstBookingElement.locator("td:nth-child(2)>p:first-of-type")).toHaveText(firstBookingDetails.customerName);

            await expect(firstBookingElement.locator("td:nth-child(2)>p:last-of-type")).toHaveText(firstBookingDetails.customerEmail);

            await expect(firstBookingElement.locator("td:nth-child(3)")).toContainText(firstBookingDetails.event.title);

            await expect(firstBookingElement.locator("td:nth-child(4)")).toContainText(firstBookingDetails.quantity.toString());

            await expect(firstBookingElement.locator("td:nth-child(5)")).toContainText(firstBookingDetails.totalPrice);

            const bookingDate = new Date(firstBookingDetails.createdAt);

            const formattedBookingDate = bookingDate.toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

            await expect(firstBookingElement.locator("td:nth-child(7)")).toContainText(formattedBookingDate);


        })




    });


    test("APImocking clicking on view button beside a booking should open up a modal displaying booking details", async ({ manageBookingsPage }) => {

        const singleBookingsResponse = JSON.parse(JSON.stringify(bookingsResponse));

        singleBookingsResponse.data = [singleBookingsResponse.data[0]];

        await test.step("Intercept response and send only single booking mock data as response", async () => {

            await manageBookingsPage.page.route(`${config.apiUrl}/bookings*`, async route => {

                const responseBody = JSON.stringify(singleBookingsResponse);

                await route.fulfill({
                    body: responseBody
                });
            });

            await manageBookingsPage.page.reload();

            await manageBookingsPage.page.waitForLoadState("networkidle");

        })

        await test.step("click on view button and verify modal details", async () => {

            await manageBookingsPage.allBookings.first().getByRole("button", { name: 'View' }).click();

            await expect(manageBookingsPage.page.locator("h2")).toContainText(singleBookingsResponse.data[0].bookingRef);




        })


    });


})