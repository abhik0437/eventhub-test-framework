import { LoginPage } from "./LoginPage";
import { HomePage } from "./HomePage";
import { Page } from "@playwright/test";

export class POManager{

    private _page: Page;

    private _loginPage?: LoginPage;

    private _homePage?: HomePage;

    constructor(page: Page){
        this._page=page;
    }

    
    get loginPage(){
        return this._loginPage??= new LoginPage(this._page);
        
    }

    get homePage(){
        return this._homePage??= new HomePage(this._page);
    }

}