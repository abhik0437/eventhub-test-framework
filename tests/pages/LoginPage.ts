import {Page, Locator} from "@playwright/test";


export class LoginPage {

    readonly emailInput : Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    private page: Page;

    constructor(page: Page){
        this.page = page;
        this.emailInput = page.getByPlaceholder("you@email.com");
        this.passwordInput = page.locator("#password");
        this.loginButton = page.locator("#login-btn");
    }

    async goTo(){
        await this.page.goto("/login");
    }

    async login(username: string, password: string){

        //fill required info
        
        await this.emailInput.fill(username);
        await this.passwordInput.fill(password);

        //click on login
        await this.loginButton.click();



    }
}