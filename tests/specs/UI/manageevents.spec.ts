import { test } from "@fixtures/base.fixture";
import { expect } from "@playwright/test";

test.describe("@regression @UI admin > manage events validations", () => {


    test("verify heading 'New Event' is present", async ({ manageEventsPage }) => {

        await expect(manageEventsPage.heading).toContainText("New Event");
    })

    test("verify information box related to 'max 6 events' is present", async ({ manageEventsPage }) => {

        await expect(manageEventsPage.sixEventsBox).toContainText("6 events");

    })

    test("create new event should create event successfully and display under All Events section", async ({ manageEventsPage }) => {

        await test.step("fill the event form", async () => {

            await manageEventsPage.titleInput.fill("Test Event");

            await manageEventsPage.descriptionInput.fill("Some Test Event Details");

            await manageEventsPage.categoryDropdown.selectOption('Sports');

            await manageEventsPage.cityInput.fill("Bengaluru");

            await manageEventsPage.venueInput.fill("Test Venue");

            await manageEventsPage.dateTimeInput.fill("2026-09-26T23:00");

            await manageEventsPage.priceInput.fill("400");

            await manageEventsPage.totalSeatsInput.fill("4");

            await manageEventsPage.addButton.click();

        })



        await test.step("verify the event is displayed under All Events section", async () => {

            await expect(manageEventsPage.page.locator("p:has-text('Event created!')")).toBeVisible();

            await expect(manageEventsPage.allEventsRows.locator("td:first-of-type").filter({ hasText: "Test Event" })).toBeVisible();

        })



    })

    test("verify edit button next to created test event functions as expected", async ({ manageEventsPage }) => {

        await test.step("find the right edit button and click on it", async () => {

            const editButton = manageEventsPage.allEventsRows.filter({ hasText: 'Test Event' }).getByRole("button", { name: 'Edit' });

            await editButton.click();

        })

        await test.step("edit the title of event and click on Update Event Button", async () => {

            await manageEventsPage.titleInput.fill("Test Event X");

            await expect(manageEventsPage.updateEventButton).toBeVisible();

            await manageEventsPage.updateEventButton.click();

            await expect(manageEventsPage.page.locator("p:has-text('Event updated!')")).toBeVisible();



        })

        await test.step("verify the edited event has right title under the All Events page", async () => {

            await expect(manageEventsPage.allEventsRows.locator("td:first-of-type").filter({ hasText: "Test Event X" })).toBeVisible();
        })







    });

    test("verify delete button next to created test event functions as expected", async({manageEventsPage})=>{

        await test.step("find the right delete button and click on it", async () => {

            const deleteButton = manageEventsPage.allEventsRows.filter({ hasText: 'Test Event X' }).getByRole("button", { name: 'Delete' });

            await deleteButton.click();

            await manageEventsPage.deleteEventButton.click();

        });

        await test.step("verify the deleted event is no longer visible under the All Events page", async () => {

            await expect(manageEventsPage.page.locator("p:has-text('Event deleted')")).toBeVisible();

            await expect(manageEventsPage.allEventsRows.locator("td:first-of-type").filter({ hasText: "Test Event X" })).toBeHidden();
        })




    })
})