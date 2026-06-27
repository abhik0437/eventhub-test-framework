import { LoginPage } from "./LoginPage";
import { Page } from "@playwright/test";

export class POManager{

    private page: Page;

    private _loginPage?: LoginPage

    constructor(page: Page){
        this.page=page;
    }

    
    get loginPage(){
        return this._loginPage??= new LoginPage(this.page);
        
    }
}