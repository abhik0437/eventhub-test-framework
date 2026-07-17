import {test, expect} from "@playwright/test";
import { config } from "../../config/config";

import { POManager } from "tests/pages/POManager";

test.describe("@login validations", ()=>{

    test.use({storageState: undefined});


test("@smoke successful login into application", async ({page})=>{

    //initiate login

    const poManager  = new POManager(page);

    const loginPage  = poManager.loginPage;

    await loginPage.login(config.email, config.password);


    //verify homepage is loaded

    await expect(loginPage.page).toHaveURL(process.env.BASE_URL!);


}),

test("@regression failed login attempt", async({page})=>{

    const poManager  = new POManager(page);

    const loginPage  = poManager.loginPage;

    //try login with incorrect credentials

    await loginPage.login("abc@test.com", "123456");

    // verify dialog box with message: Invalid Email or Password appears

    await expect(loginPage.failedLoginInfo).toBeVisible();


})


})


