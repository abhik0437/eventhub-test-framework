import { LoginPage } from "./LoginPage";
import { HomePage } from "./HomePage";
import { Page } from "@playwright/test";
import EventsPage from "./EventsPage";

export class POManager{

    private _page: Page;

    private _loginPage?: LoginPage;

    private _homePage?: HomePage;

    private _eventsPage?: EventsPage;

    constructor(page: Page){
        this._page=page;
    }

    
    get loginPage(){
        return this._loginPage??= new LoginPage(this._page);
        
    }

    get homePage(){
        return this._homePage??= new HomePage(this._page);
    }

    get eventsPage(){
        return this._eventsPage??= new EventsPage(this._page);
    }

}