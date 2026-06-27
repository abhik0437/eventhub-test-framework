import {expect} from "@playwright/test";
import {test} from "../fixtures/base.fixture";

import { POManager } from "@pages/POManager";

test("successful login into application", async ({loggedInPage})=>{


    //verify homepage is loaded

    await expect(loggedInPage).toHaveURL(process.env.BASE_URL!);


})

