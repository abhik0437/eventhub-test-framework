import {Page, Locator} from "@playwright/test";


export default class BookingsPage{

    readonly mainHeading: Locator;
    readonly clearBookingsButton: Locator;
    readonly bookingsCards: Locator;
    private _page: Page;

    constructor(page:Page){

        this._page=page;
        this.mainHeading=page.locator("h1");
        this.clearBookingsButton=page.getByRole("button", {name: "Clear all bookings"});
        this.bookingsCards=page.getByTestId("booking-card");

    }

    get page(){
        return this._page;
    }



}