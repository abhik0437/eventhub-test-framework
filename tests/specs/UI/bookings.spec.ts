import BookingsPage from "@pages/BookingsPage";
import {test} from "../../fixtures/base.fixture";
import {expect} from "@playwright/test";
import { config } from "tests/config/config";
import bookingResponse from "../../test-data/bookingsResponse.json";


test.describe("@bookingsPage @UI @regression tests", ()=>{


    test("Page should contain heading 'My Bookings'", async ({bookingsPage})=>{

        await expect(bookingsPage.mainHeading).toBeVisible();
    });

    test("Clicking on clear all bookings should remove all existing bookings", async({bookingsPage})=>{

        await expect(bookingsPage.clearBookingsButton).toBeVisible();

        bookingsPage.page.on('dialog', dialog=>dialog.accept());

        await bookingsPage.clearBookingsButton.click();

        await expect(bookingsPage.page.getByRole("heading", {level:3, name: "No bookings yet"})).toBeVisible();


    })

    test("@APImocking Verify UI of booking card", async({homePage})=>{

        await homePage.page.route(`${config.apiUrl}/bookings*`, async route=>{

            const responseBody = 
            
            await route.fulfill({
                body: JSON.stringify(bookingResponse)
            })
        });

        await homePage.page.goto("/bookings");

        //verify the count of booking cards displayed should match with count in test data

        const bookingCards = homePage.page.getByTestId("booking-card");

        await expect(bookingCards).toHaveCount(6);

        //verify the second booking element has all the necessary UI

        //get second event details from bookingsResponse array

        const secondEventDetails=bookingResponse.data[1];


        //booking ref validation

        const secondBookingCard = bookingCards.nth(1);

        await expect(secondBookingCard.locator(".booking-ref")).toHaveText(secondEventDetails.bookingRef);

        //event title validation

        await expect(secondBookingCard.locator("h3")).toHaveText(secondEventDetails.event.title);

        //event date, location & booking date validation

        const eventDetailsDiv = secondBookingCard.locator("div:nth-of-type(1)>div:nth-of-type(1)>div:nth-child(3)");

        //verify event date
        
        const eventDate = new Date(secondEventDetails.event.eventDate);
        const formattedEventDate = eventDate.toLocaleDateString("en-GB", { day: 'numeric', month: 'short', year: 'numeric' } );
        
        await expect(eventDetailsDiv.locator("span:nth-child(1)")).toContainText(formattedEventDate);

        //verify location
        
        await expect(eventDetailsDiv.locator("span:nth-child(3)")).toContainText(secondEventDetails.event.city);

        //verify booking date
        
        const bookingDate = new Date(secondEventDetails.createdAt);
        const formattedBookingDate = bookingDate.toLocaleDateString("en-GB", { day: '2-digit', month: 'short', year: 'numeric' } );

        
        await expect(eventDetailsDiv.locator("span:nth-child(4)")).toContainText(formattedBookingDate);

        //verify price
        
        const eventPriceDetails = secondBookingCard.locator("div:nth-of-type(1)>div:nth-child(2)>p:nth-child(1)");

        await expect(eventPriceDetails).toContainText(secondEventDetails.totalPrice);



        




    })
})