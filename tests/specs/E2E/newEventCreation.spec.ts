import {test, expect} from "@playwright/test";
import { config } from "tests/config/config";

test.describe("New event creation journey experience", ()=>{

    test.use({storageState: undefined});

    test("login and create new event @E2E", async({page})=>{

        await test.step("sign in with the valid user details", async()=>{

            await page.goto("/login");

            await page.getByLabel("Email").fill(config.email);

            await page.getByLabel("Password").fill(config.password);

            await page.locator("#login-btn").click();

            await page.waitForLoadState("networkidle");

            
        });

        await test.step("Go to Events page and click on add new event button", async()=>{

            await page.locator("span:has-text('Browse Events')").click();

            await page.locator("button:has-text('Add New Event')").click();

        })

        await test.step("fill all the required details and click on Add Event button", async()=>{

            await page.locator("#event-title-input").fill("Test Event");

            await page.getByPlaceholder("Describe the event…").fill("Test");

            await page.locator("#category").selectOption("Concert");

            await page.locator("#city").fill("Bengaluru");

            await page.locator("#venue").fill("The arena, BTM");

            await page.locator("#event-date-\\&-time").fill("2026-09-26T23:00");

            await page.getByPlaceholder("0.00").fill("300");

            await page.locator("#total-seats").fill("20");

            await page.getByTestId("add-event-btn").click();

            await expect(page.locator("p:has-text('Event created!')")).toBeVisible();


        });

        await test.step("verify the new event show up under the All Events section", async()=>{

            await expect(page.locator("table>tbody tr>td:has-text('Test Event')")).toBeVisible();
        })

        await test.step("go to Events page and verify a new event card got created with respective details", async()=>{

            await page.getByRole("link", {name: 'Events'}).first().click();

            await page.waitForLoadState("networkidle");

            await expect(page.getByTestId("event-card").locator("h3:has-text('Test Event')")).toBeVisible();

        })



    });





})