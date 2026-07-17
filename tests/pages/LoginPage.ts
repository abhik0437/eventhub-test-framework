import {Page, Locator} from "@playwright/test";
import {config} from "../config/config";


export class LoginPage {

    readonly emailInput : Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    private _page: Page;
    readonly failedLoginInfo: Locator;

    constructor(page: Page){
        this._page = page;
        this.emailInput = page.getByPlaceholder("you@email.com");
        this.passwordInput = page.locator("#password");
        this.loginButton = page.locator("#login-btn");
        this.failedLoginInfo = page.locator("p").filter({hasText: /Invalid Email Or Password/i});
    }

    private async goTo(){
        await this._page.goto(config.baseUrl+"/login");
    }

    async login(username: string, password: string){

        
        await this.goTo();

        //fill required info
        await this.emailInput.fill(username);
        await this.passwordInput.fill(password);

        //click on login
        await this.loginButton.click();



    }

    get page(){
        return this._page;
    }


}