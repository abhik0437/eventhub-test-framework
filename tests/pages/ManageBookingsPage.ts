import {Locator, Page} from "@playwright/test";

export default class ManageBookingsPage{

    readonly heading: Locator;
    readonly totalBookingsCount: Locator;
    readonly statusDropdown: Locator;
    readonly allBookings: Locator;
    readonly noBookingsMessage: Locator;
    readonly _page: Page;
    


    constructor(page:Page){
        this._page=page;
        this.heading=page.locator("h1");
        this.totalBookingsCount=page.locator("h1+p");
        this.statusDropdown=page.locator("select");
        this.allBookings=page.locator("table>tbody tr");
        this.noBookingsMessage=page.locator("h3:has-text('No bookings found')");

    }

    get page(){
        return this._page;
    }
}