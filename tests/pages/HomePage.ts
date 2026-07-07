import { Page, Locator } from "@playwright/test";

export class HomePage{

    private _page: Page;
    readonly navbar: Locator;
    readonly heroSection: Locator;
    readonly featuredEventsSection: Locator;
    readonly eventCards: Locator;
    readonly footerSection: Locator;
    readonly browseEventsButton: Locator;
    readonly myBookingsButton: Locator;
    readonly featuredEvents: Locator;

    get page(){
        return this._page;
    }

    constructor(page: Page){
        this._page=page;
        this.navbar= this.page.getByRole('navigation');
        this.heroSection=this.page.locator("div").filter({has: page.locator("h1")});
        this.featuredEventsSection=this.page.locator("section").filter({has: page.getByRole("heading", {level: 2, name: 'Featured Events'})});
        this.eventCards = this.page.locator("article[data-testid='event-card']");
        this.footerSection = this.page.locator("section", {has: page.getByRole("link", {name: 'Explore All Events'})});
        this.browseEventsButton= this.heroSection.getByRole("link", {name: "Browse Events"});
        this.myBookingsButton = this.heroSection.locator("button:has-text('My Bookings')");
        this.featuredEvents = this.featuredEventsSection.locator("article[data-testid='event-card']");
    }

    

    
}