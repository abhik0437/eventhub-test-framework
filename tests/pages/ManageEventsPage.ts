import {Locator, Page} from "@playwright/test";

export default class ManageEventsPage{

    readonly heading: Locator;
    readonly sixEventsBox: Locator;
    readonly titleInput: Locator;
    readonly descriptionInput: Locator;
    readonly categoryDropdown: Locator;
    readonly cityInput: Locator;
    readonly venueInput: Locator;
    readonly dateTimeInput: Locator;
    readonly priceInput: Locator;
    readonly totalSeatsInput: Locator;
    readonly imageUrlInput: Locator;
    readonly addButton: Locator;
    readonly allEventsHeaderContainer: Locator;
    readonly allEventsRows: Locator;
    readonly updateEventButton: Locator;
    readonly deleteEventButton: Locator;
    readonly _page: Page;

    constructor(page: Page){

        this._page=page;
        this.heading=page.locator("h2:has-text('New Event')");
        this.sixEventsBox=page.locator("div:has(> h2:has-text('New Event'))>div:nth-child(2)");
        this.titleInput=page.locator("#event-title-input");
        this.descriptionInput=page.getByPlaceholder("Describe the event…");
        this.categoryDropdown=page.locator("#category");
        this.cityInput=page.locator("#city");
        this.venueInput=page.locator("#venue");
        this.dateTimeInput=page.locator("#event-date-\\&-time");
        this.priceInput= page.getByPlaceholder("0.00");
        this.totalSeatsInput=page.locator("#total-seats");
        this.imageUrlInput=page.locator("#image-url-(optional)");
        this.addButton=page.getByTestId("add-event-btn");
        this.allEventsHeaderContainer=page.locator("div>section:last-of-type>div>div:first-of-type");
        this.allEventsRows=page.locator("div>section:last-of-type>div>div:last-of-type>table tr");
        this.updateEventButton=page.locator("button", {hasText:"Update Event"});
        this.deleteEventButton=page.getByTestId("confirm-dialog-yes");


    }

    get page(){
        return this._page;
    }


}

