import {test} from "../../fixtures/base.fixture";
import {expect} from "@playwright/test";
import { config } from "tests/config/config";

test.describe("Events page Validations Suite", ()=>{

test.describe ("@smoke @UI tests", ()=>{

     test("Heading with text 'Upcoming Events' must be visible", async({eventsPage})=>{

        await expect (eventsPage.heading).toBeVisible();



     });

     test("the first event card should be visible", async({eventsPage})=>{

        const firstEventCard = eventsPage.eventCards.first();

        await expect(firstEventCard).toBeVisible();
     })

});

test.describe("@regression tests", ()=>{

   test("search box must be present and filter events matching the passed pattern", async({eventsPage})=>{

    expect(eventsPage.searchBox).toBeVisible();

    await eventsPage.searchBox.pressSequentially("Dilli");

    const dilliEventCard = eventsPage.eventCards.first();

    expect(dilliEventCard.locator("h3")).toHaveText("Dilli Diwali Mela");
   });

   test("category filter should result in events matching the selected category", async({eventsPage})=>{


      await eventsPage.catergoryFilter.selectOption('Conference');

      const worldSummitEventCard = eventsPage.eventCards.first();

      await expect(worldSummitEventCard.locator("h3")).toContainText("World Tech Summit");

      await eventsPage.catergoryFilter.selectOption('Concert');

      const hollywoodNightsEventCard = eventsPage.eventCards.first();

      await expect(hollywoodNightsEventCard.locator("h3")).toContainText("Hollywood Monsoon Night");


   });

   test("city filter should result in events occurring in the selected city", async ({eventsPage})=>{

      await eventsPage.citiesFilter.selectOption("Delhi");

      const DilliEventCard = eventsPage.eventCards.first();

      await expect(DilliEventCard.locator("h3")).toContainText("Dilli Diwali Mela");
   });

   test("Clear filters option should revert event lists to display all events", async({eventsPage})=>{

      //select any filter: eg. pick a city 

      await eventsPage.citiesFilter.selectOption("Delhi");

      await expect(eventsPage.eventCards).toHaveCount(1);

      //reset the filter with clear filter option

      await eventsPage.clearFiltersBtn.click();

      await eventsPage.page.waitForLoadState("networkidle");

      expect(await eventsPage.eventCards.count()).toBeGreaterThan(1);

   });

   test("Add new event button should navigate to add new event page", async ({eventsPage})=>{

      await eventsPage.addNewEventBtn.click();

      await expect(eventsPage.page).toHaveURL("/admin/events");

      await eventsPage.page.waitForLoadState("networkidle");

      await expect(eventsPage.page.locator("h2").first()).toContainText("New Event");

   })



});

test.describe("@regression @APImocking tests", ()=>{


   test("No events found should be displayed when no active events present",async({homePage})=>{

      await homePage.page.route(`${config.apiUrl}/events*`, async route=>{

         const mockResponse = JSON.stringify({
            success: true,
            data: []
         });

         await route.fulfill({
            body: mockResponse
         })
      });

      await homePage.navbar.locator("a:has-text('Events')").click();

      await expect(homePage.page.locator("h3:has-text('No events found')")).toBeVisible();





   })
})

})