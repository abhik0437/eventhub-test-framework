import {chromium, request} from "@playwright/test";
import {config} from "./tests/config/config";
import {POManager} from "./tests/pages/POManager";

export default async function(){


    const browser = await chromium.launch();

    const webContext = await browser.newContext();


//     //fetch login token

//     let token;

//     const requestContext = await request.newContext();

//     const response = await requestContext.post(`${config.apiUrl}/auth/login`, {
//         data: {
//             "email": config.email,
//             "password": config.password
//         }
//     });

//     console.log(response);

//     if(!response.ok()){

//         throw new Error("API login failure");
        
//     }else{

//     const responseJSON = await response.json();
//     token = responseJSON.token;
// }

//     await webContext.addInitScript(value=> {
//         localStorage.setItem("eventhub_token", value);
//     },token);

//     const page = await webContext.newPage();

//     await page.goto(config.baseUrl+"/login");

//     await page.waitForLoadState("networkidle");

//     await webContext.storageState({path: "loginConfig.json"});

const newPage = await webContext.newPage();

const pomanager = new POManager(newPage);

const loginPage = pomanager.loginPage;

await loginPage.login(config.email,config.password);

await loginPage.page.waitForLoadState("networkidle");

await webContext.storageState({path: "loginConfig.json"});


await browser.close();




}