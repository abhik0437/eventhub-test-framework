import { test as base, Page } from "@playwright/test";
import { POManager } from "tests/pages/POManager";
import { LoginPage } from "tests/pages/LoginPage";
import { HomePage } from "tests/pages/HomePage";
import {config} from "../config/config";
import EventsPage from "@pages/EventsPage";
import BookingsPage from "@pages/BookingsPage";


type MyFixtures = {
    
    homePage: HomePage,
    eventsPage: EventsPage,
    bookingsPage: BookingsPage
};

export const test = base.extend<MyFixtures>({


    homePage: async({page}, use)=>{

        const pomanager = new POManager(page);

        await page.goto("/");

        await use(pomanager.homePage);

    },

    eventsPage: async({page}, use)=>{
        await page.goto("/events");

        const pomanager = new POManager(page);

        await use(pomanager.eventsPage);
    },

    bookingsPage: async({page}, use)=>{

        await page.goto("/bookings");

        const pomanager= new POManager(page);

        await use(pomanager.bookingsPage);

    }

});

