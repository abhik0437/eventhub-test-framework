import { test as base, Page } from "@playwright/test";
import { POManager } from "tests/pages/POManager";
import { LoginPage } from "tests/pages/LoginPage";
import { HomePage } from "tests/pages/HomePage";
import {config} from "../config/config";


type MyFixtures = {
    
    homePage: HomePage
};

export const test = base.extend<MyFixtures>({


    homePage: async({page}, use)=>{

        const pomanager = new POManager(page);

        await page.goto("/");

        await use(pomanager.homePage);

    }

});

