import { test as base, Page } from "@playwright/test";
import { LoginPage } from "@pages/LoginPage";

type LoginFixture = {
    loggedInPage: Page
};

export const test = base.extend<LoginFixture>({

    loggedInPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);

        //login with credentials
        await loginPage.goTo();

        await loginPage.login(process.env.GMAIL_USERNAME!, process.env.GMAIL_PASSWORD!);

        await use(page);
    }
});

