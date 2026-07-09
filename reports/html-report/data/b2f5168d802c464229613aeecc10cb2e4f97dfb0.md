# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: UI\home.spec.ts >> Home Page - Eventhub >> @smoke @homepage @ui basic page test >> homepage displays all the sections appropriately
- Location: tests\specs\UI\home.spec.ts:12:13

# Error details

```
Error: expect(locator).toHaveText(expected) failed

Locator: locator('section').filter({ has: getByRole('heading', { name: 'Featured Events', level: 2 }) }).locator('article[data-testid=\'event-card\']').getByRole('heading', { level: 2 })
Expected: "Featured Events"
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toHaveText" with timeout 5000ms
  - waiting for locator('section').filter({ has: getByRole('heading', { name: 'Featured Events', level: 2 }) }).locator('article[data-testid=\'event-card\']').getByRole('heading', { level: 2 })

```

```yaml
- navigation:
  - link "EventHub":
    - /url: /
    - img
    - text: EventHub
  - link "Home":
    - /url: /
  - link "Events":
    - /url: /events
  - link "My Bookings":
    - /url: /bookings
  - link "API Docs":
    - /url: https://api.eventhub.rahulshettyacademy.com/api/docs
  - button "Admin":
    - text: Admin
    - img
  - text: abhinavk0938@gmail.com
  - button "Logout"
- main:
  - heading "Discover & Book Amazing Events" [level=1]
  - paragraph: From tech conferences to live concerts, sports events to cultural festivals — find experiences that inspire you.
  - link "Browse Events →":
    - /url: /events
  - link "My Bookings":
    - /url: /bookings
    - button "My Bookings"
  - heading "Featured Events" [level=2]
  - paragraph: Hand-picked upcoming events just for you
  - link "View all →":
    - /url: /events
  - article:
    - img "Dilli Diwali Mela"
    - text: Festival Featured
    - link "Dilli Diwali Mela":
      - /url: /events/3
      - heading "Dilli Diwali Mela" [level=3]
    - img
    - text: Tue, 20 Oct
    - img
    - text: Pragati Maidan Exhibition Grounds, Delhi
    - paragraph: $300
    - text: 1 seat left!
    - link "Book Now":
      - /url: /events/3
  - article:
    - img "Hollywood Monsoon Night — Los Angeles"
    - text: Concert Featured
    - link "Hollywood Monsoon Night — Los Angeles":
      - /url: /events/2
      - heading "Hollywood Monsoon Night — Los Angeles" [level=3]
    - img
    - text: Sun, 12 Jul
    - img
    - text: Dome, NSCI SVP Stadium, Worli, Los Angeles
    - paragraph: $2,500
    - text: 8 seats left!
    - link "Book Now":
      - /url: /events/2
  - article:
    - img "World Tech Summit"
    - text: Conference Featured
    - link "World Tech Summit":
      - /url: /events/1
      - heading "World Tech Summit" [level=3]
    - img
    - text: Sat, 18 Apr
    - img
    - text: Hyderabad, Hitech city, Hyderabad
    - paragraph: $1,500
    - text: 8 seats left!
    - link "Book Now":
      - /url: /events/1
  - article:
    - img
    - text: Conference
    - link "Test Event 1781503098165":
      - /url: /events/57441
      - heading "Test Event 1781503098165" [level=3]
    - img
    - text: Fri, 9 Oct
    - img
    - text: The Lalit, sarjapur, Bangalore
    - paragraph: $100
    - text: 20 seats available
    - link "Book Now":
      - /url: /events/57441
  - heading "Ready to experience something new?" [level=2]
  - paragraph: Browse thousands of events across India. Book tickets in seconds.
  - link "Explore All Events":
    - /url: /events
    - button "Explore All Events"
- contentinfo:
  - heading "Rahul Shetty Academy" [level=3]
  - paragraph: India's leading QA automation training academy — empowering engineers to build real-world testing skills.
  - heading "Popular Courses" [level=3]
  - list:
    - listitem:
      - link "Selenium WebDriver with Java":
        - /url: https://rahulshettyacademy.com
    - listitem:
      - link "Playwright with JavaScript":
        - /url: https://rahulshettyacademy.com
    - listitem:
      - link "RestAssured API Testing":
        - /url: https://rahulshettyacademy.com
    - listitem:
      - link "Cypress End-to-End Testing":
        - /url: https://rahulshettyacademy.com
    - listitem:
      - link "Appium Mobile Testing":
        - /url: https://rahulshettyacademy.com
  - heading "QA Job Hiring Platform" [level=3]
  - paragraph: Get hired faster — take skill assessments trusted by top QA employers worldwide.
  - link "techsmarthire.com →":
    - /url: https://techsmarthire.com
  - heading "EventHub Practice App" [level=3]
  - list:
    - listitem:
      - link "Browse Events":
        - /url: /events
    - listitem:
      - link "My Bookings":
        - /url: /bookings
    - listitem:
      - link "Manage Events":
        - /url: /admin/events
    - listitem:
      - link "API Documentation":
        - /url: https://api.eventhub.rahulshettyacademy.com/api/docs
  - paragraph: © 2026 Rahul Shetty Academy. All rights reserved.
  - link "rahulshettyacademy.com →":
    - /url: https://rahulshettyacademy.com
  - link "techsmarthire.com →":
    - /url: https://techsmarthire.com
- alert
```

# Test source

```ts
  1   | import { expect } from "@playwright/test";
  2   | import { test } from "../../fixtures/base.fixture";
  3   | import { config } from "tests/config/config";
  4   | import { homedir } from "node:os";
  5   | 
  6   | 
  7   | test.describe("Home Page - Eventhub", () => {
  8   | 
  9   | 
  10  |     test.describe("@smoke @homepage @ui basic page test", () => {
  11  | 
  12  |         test("homepage displays all the sections appropriately", async ({ homePage }) => {
  13  | 
  14  |             await homePage.page.waitForLoadState("networkidle");
  15  | 
  16  |             //ensure title in navbar is visible
  17  | 
  18  | 
  19  | 
  20  |             await expect(homePage.navbar.locator('span').filter({ hasText: "EventHub" })).toBeVisible();
  21  | 
  22  | 
  23  |             //=======================hero section validations=========================================
  24  | 
  25  |             //verify heading is visible
  26  | 
  27  |             await expect(homePage.heroSection.locator('h1')).toContainText("Discover & Book");
  28  | 
  29  |             //verify browse events & my bookings links are present 
  30  | 
  31  |             await expect(homePage.heroSection.locator("span:has-text('Browse Events')")).toBeVisible();
  32  | 
  33  |             await expect(homePage.heroSection.getByRole("link", { name: 'My Bookings', disabled: false })).toBeVisible();
  34  | 
  35  |             //=============================Featured Events Section===========================================
  36  | 
  37  |             //verify Featured Events Heading is visible
  38  | 
> 39  |             await expect(homePage.featuredEvents.getByRole("heading", { level: 2 })).toHaveText("Featured Events");
      |                                                                                      ^ Error: expect(locator).toHaveText(expected) failed
  40  | 
  41  |             //verify first event card is visible
  42  | 
  43  |             await expect(homePage.featuredEvents.locator("#event-card").last()).toBeVisible();
  44  | 
  45  |             //=============================Footer Section===============================================
  46  | 
  47  |             //verify the text "Ready to experience something new" is present
  48  | 
  49  |             await expect(homePage.footerSection.getByRole("heading", { level: 2 })).toHaveText(/Ready to experience something new?/i);
  50  | 
  51  | 
  52  | 
  53  |         })
  54  | 
  55  | 
  56  | 
  57  |     }
  58  | 
  59  |     );
  60  | 
  61  | 
  62  |     test.describe("@ui @sanity @homepage @navigation Navbar UI & functionality valdations", () => {
  63  | 
  64  | 
  65  |         test("Clicking on Home should open/reload Home page", async ({ homePage }) => {
  66  | 
  67  |             await homePage.navbar.locator("a[data-testid='nav-home']").click();
  68  | 
  69  |             await expect(homePage.page).toHaveURL("/");
  70  |         });
  71  | 
  72  |         test("Should navigate to events page when clicking on 'Events'", async ({ homePage }) => {
  73  | 
  74  |             await homePage.navbar.locator("#nav-events").click();
  75  | 
  76  |             await expect(homePage.page.locator("h1")).toHaveText("Upcoming Events");
  77  |         });
  78  | 
  79  |         test("Clicking on My bookings should open bookings page", async ({ homePage }) => {
  80  | 
  81  |             await homePage.navbar.locator("#nav-bookings").click();
  82  | 
  83  |             await expect(homePage.page.getByRole("heading", { level: 1 })).toHaveText("My Bookings");
  84  | 
  85  |         });
  86  | 
  87  |         test("Clicking on API Docs should open swagger API", async ({ homePage }) => {
  88  | 
  89  |             const [apiPage] = await Promise.all([homePage.page.context().waitForEvent("page"), await homePage.navbar.getByRole("link", { name: "API Docs" }).click()]);
  90  | 
  91  |             await apiPage.waitForLoadState("networkidle");
  92  | 
  93  |             await expect(apiPage.locator("h1")).toContainText("EventHub API");
  94  | 
  95  |         });
  96  | 
  97  |         test("Clicking on Role button (Admin) should open dropdown", async ({ homePage }) => {
  98  | 
  99  |             await homePage.navbar.getByRole("button", { name: "Admin" }).click();
  100 | 
  101 |             await expect(homePage.navbar.getByRole("link", { name: "Manage Events" })).toBeVisible();
  102 | 
  103 |             await expect(homePage.navbar.locator("a:has-text('Manage Bookings')")).toBeVisible();
  104 | 
  105 |         });
  106 | 
  107 |         test("Logged-in user's email should be displayed in Navbar", async ({ homePage }) => {
  108 | 
  109 |             await expect(homePage.navbar.locator("span[data-testid='user-email-display']")).toContainText(config.email);
  110 | 
  111 |         });
  112 | 
  113 |         test("Logout button should be present and lead to login page upon click", async ({ homePage }) => {
  114 | 
  115 |             await homePage.navbar.locator("[data-testid='logout-btn']").click();
  116 | 
  117 |             await expect(homePage.page).toHaveURL("/login");
  118 | 
  119 |         })
  120 | 
  121 | 
  122 |     });
  123 | 
  124 |     test.describe("@ui @sanity @homepage @cta Hero section validations", () => {
  125 | 
  126 | 
  127 |         test("Browse Events button must be present and lead to events page", async ({ homePage }) => {
  128 | 
  129 | 
  130 |             await expect(homePage.browseEventsButton).toBeVisible();
  131 | 
  132 |             await homePage.browseEventsButton.click();
  133 | 
  134 |             await homePage.page.waitForLoadState("networkidle");
  135 | 
  136 |             await expect(homePage.page).toHaveURL("/events");
  137 |         });
  138 | 
  139 |         test("My bookings button should be present and lead to bookings page on click", async ({ homePage }) => {
```