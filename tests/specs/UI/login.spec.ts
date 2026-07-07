import {expect} from "@playwright/test";
import {test} from "../../fixtures/base.fixture";
import { config } from "../../config/config";

import { POManager } from "tests/pages/POManager";

test("successful login into application", async ({loginPage})=>{

    //initiate login

    await loginPage.login(config.email, config.password);


    //verify homepage is loaded

    await expect(loginPage.page).toHaveURL(process.env.BASE_URL!);


}),

test("failed login attempt", async({loginPage})=>{

    //try login with incorrect credentials

    await loginPage.login("abc@test.com", "123456");

    // verify dialog box with message: Invalid Email or Password appears

    await expect(loginPage.failedLoginInfo).toBeVisible();


})

