import { test as base, Page } from "@playwright/test";
import { POManager } from "tests/pages/POManager";
import { LoginPage } from "tests/pages/LoginPage";
import { HomePage } from "tests/pages/HomePage";
import {config} from "../config/config";


type MyFixtures = {
    loginPage: LoginPage,
    loggedInPage: Page,
    homePage: HomePage
};

export const test = base.extend<MyFixtures>({

    loginPage: async ({ page }, use) => {

        const pomanager = new POManager(page);

        await use(pomanager.loginPage);
    },

    loggedInPage: async({loginPage}, use)=>{

        await loginPage.login(config.email, config.password);
        await use(loginPage.page);


    },

    homePage: async({loggedInPage}, use)=>{

        const pomanager = new POManager(loggedInPage);

        await use(pomanager.homePage);

    }

});

