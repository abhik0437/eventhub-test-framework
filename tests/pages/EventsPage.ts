import {Page, Locator} from "@playwright/test";

export default class EventsPage{

    private _page: Page;
    readonly heading: Locator;
    readonly searchBox: Locator;
    readonly catergoryFilter: Locator;
    readonly citiesFilter: Locator;
    readonly eventCards: Locator;
    readonly addNewEventBtn: Locator;
    readonly clearFiltersBtn: Locator;

    constructor(page:Page){
        this._page=page;
        this.heading= page.getByRole("heading", {level: 1});
        this.searchBox=page.getByPlaceholder("Search events, venues…");
        this.catergoryFilter = page.locator("select").first();
        this.citiesFilter = page.locator("select").last();
        this.eventCards = page.locator("article[data-testid='event-card']");
        this.addNewEventBtn=page.getByRole("button", {name: "Add New Event"});
        this.clearFiltersBtn=page.getByRole("button", {name: "Clear Filters"});

    }

    async goToEvents(){
        await this._page.goto("/events");
    }

    get page(){
        return this._page;
    }

    


}