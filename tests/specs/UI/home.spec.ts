import { expect } from "@playwright/test";
import { test } from "../../fixtures/base.fixture";
import { config } from "tests/config/config";
import { homedir } from "node:os";


test.describe("Home Page - Eventhub", () => {


    test.describe("@smoke @homepage @ui basic page test", () => {

        test("homepage displays all the sections appropriately", async ({ homePage }) => {

            await homePage.page.waitForLoadState("networkidle");

            //ensure title in navbar is visible



            await expect(homePage.navbar.locator('span').filter({ hasText: "EventHub" })).toBeVisible();


            //=======================hero section validations=========================================

            //verify heading is visible

            await expect(homePage.heroSection.locator('h1')).toContainText("Discover & Book");

            //verify browse events & my bookings links are present 

            await expect(homePage.heroSection.locator("span:has-text('Browse Events')")).toBeVisible();

            await expect(homePage.heroSection.getByRole("link", { name: 'My Bookings', disabled: false })).toBeVisible();

            //=============================Featured Events Section===========================================

            //verify Featured Events Heading is visible

            await expect(homePage.featuredEvents.getByRole("heading", { level: 2 })).toHaveText("Featured Events");

            //verify first event card is visible

            await expect(homePage.featuredEvents.locator("#event-card").last()).toBeVisible();

            //=============================Footer Section===============================================

            //verify the text "Ready to experience something new" is present

            await expect(homePage.footerSection.getByRole("heading", { level: 2 })).toHaveText(/Ready to experience something new?/i);



        })



    }

    );


    test.describe("@ui @homepage @navigation Navbar UI & functionality valdations", () => {


        test("Clicking on Home should open/reload Home page", async ({ homePage }) => {

            await homePage.navbar.locator("a[data-testid='nav-home']").click();

            await expect(homePage.page).toHaveURL("/");
        });

        test("Should navigate to events page when clicking on 'Events'", async ({ homePage }) => {

            await homePage.navbar.locator("#nav-events").click();

            await expect(homePage.page.locator("h1")).toHaveText("Upcoming Events");
        });

        test("Clicking on My bookings should open bookings page", async ({ homePage }) => {

            await homePage.navbar.locator("#nav-bookings").click();

            await expect(homePage.page.getByRole("heading", { level: 1 })).toHaveText("My Bookings");

        });

        test("Clicking on API Docs should open swagger API", async ({ homePage }) => {

            const [apiPage] = await Promise.all([homePage.page.context().waitForEvent("page"), await homePage.navbar.getByRole("link", { name: "API Docs" }).click()]);

            await apiPage.waitForLoadState("networkidle");

            await expect(apiPage.locator("h1")).toContainText("EventHub API");

        });

        test("Clicking on Role button (Admin) should open dropdown", async ({ homePage }) => {

            await homePage.navbar.getByRole("button", { name: "Admin" }).click();

            await expect(homePage.navbar.getByRole("link", { name: "Manage Events" })).toBeVisible();

            await expect(homePage.navbar.locator("a:has-text('Manage Bookings')")).toBeVisible();

        });

        test("Logged-in user's email should be displayed in Navbar", async ({ homePage }) => {

            await expect(homePage.navbar.locator("span[data-testid='user-email-display']")).toContainText(config.email);

        });

        test("Logout button should be present and lead to login page upon click", async ({ homePage }) => {

            await homePage.navbar.locator("[data-testid='logout-btn']").click();

            await expect(homePage.page).toHaveURL("/login");

        })


    });

    test.describe("@ui @homepage @cta Hero section validations", () => {


        test("Browse Events button must be present and lead to events page", async ({ homePage }) => {


            await expect(homePage.browseEventsButton).toBeVisible();

            await homePage.browseEventsButton.click();

            await homePage.page.waitForLoadState("networkidle");

            await expect(homePage.page).toHaveURL("/events");
        });

        test("My bookings button should be present and lead to bookings page on click", async ({ homePage }) => {

            await expect(homePage.myBookingsButton).toBeVisible();

            await homePage.myBookingsButton.click();

            await expect(homePage.page).toHaveURL("/bookings");

        })
    });

    test.describe("@ui @homepage @featuredEvents section validation", () => {


        test("The section should display event cards with necessary UI elements", async ({ homePage }) => {

            const firstCard = homePage.featuredEvents.first();

            await expect(firstCard).toBeVisible();

            //verify event card has featured tag

            await expect(firstCard.locator("span:has-text('featured')")).toBeVisible();

            //verify heading is present

            await expect(firstCard.getByRole("heading", { level: 3 })).toBeVisible();

            //verify book now button is present and on clicking leads to events form

            const bookNowBtn = firstCard.locator("#book-now-btn");

            await expect(bookNowBtn).toBeVisible();

            await bookNowBtn.click();

            await expect(homePage.page).toHaveURL(new URLPattern({ pathname: "/events/*" }));

        })
    });

    test.describe("@ui @homepage @footer section validations", () => {


        test("The section should display a heading", async ({ homePage }) => {

            await expect(homePage.footerSection.getByRole("heading", { level: 2 })).toContainText("Ready to experience");

        });

        test("Explore all Events button should be present and navigate to events page", async ({ homePage }) => {

            const exploreEventsButton = homePage.footerSection.getByRole("button", { name: "Explore All Events" });

            await expect(exploreEventsButton).toBeVisible();

            await exploreEventsButton.click();

            await expect(homePage.page).toHaveURL("/events");




        })




    });


    test.describe("@APImocking validations", () => {

        test("New mocked event should be displayed in UI appropriately", async ({ homePage }) => {


            let sampleEvent = {
                        "title": "Sample Event 1",
                        "description": "A sample event",
                        "category": "Festival",
                        "venue": "Novotel",
                        "city": "Hyderabad",
                        "eventDate": "2026-07-07T09:00:00.000Z",
                        "price": 5000,
                        "totalSeats": 500,
                        "imageUrl": "https://example.com/banner.jpg",
                        "availableSeats": 500,
                        "isStatic":true,
                        "userId": null,
                        "createdAt": "2026-07-07T12:30:37.659Z",
                        "updatedAt": "2026-07-07T12:30:37.659Z"

                    };

            

            await homePage.page.route("**/api/events*", async route => {

                const existingEventsResponse = await route.fetch();

                const existingEvents = await existingEventsResponse.json();

                const newBody = {
                    
                    success: true,
                    data: [
                    ...existingEvents.data,
                    sampleEvent
                ]};

                await route.fulfill({
                    body: JSON.stringify(newBody)
                });

            });


              //validating the event creation in UI

              const createdEventCard = homePage.featuredEvents.last();

              // validate that the event card has Festival tag

              await expect(createdEventCard.locator("div:first-child>div:nth-child(2)>span")).toHaveText(sampleEvent.category);

              //validate title is displayed accordingly

              await expect(createdEventCard.locator(">div:last-child>a:nth-of-type(1)")).toHaveText(sampleEvent.title);

              //validate date and location are displayed accordingly

              await expect(createdEventCard.locator("div:last-child>div:nth-of-type(1)>div:first-child>span")).toHaveText("Tue, 7 Jul");

              await expect(createdEventCard.locator("div:last-child>div:nth-of-type(1)>div:last-child>span")).toHaveText(`${sampleEvent.venue}, ${sampleEvent.city}`);

              //validate price and seat count is displayed accordingly

              await expect(createdEventCard.locator("div:last-child>div:nth-of-type(2)>div:first-child>p")).toContainText(`\$${sampleEvent.price}`.substring(0,2));

              await expect(createdEventCard.locator("div:last-child>div:nth-of-type(2)>div:first-child>span")).toContainText(`${sampleEvent.availableSeats}`);





            })



        })
    })