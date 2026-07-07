import * as dotenv from 'dotenv';
import path from 'path';


const env = process.env.TEST_ENV || 'qa';

dotenv.config({
    path: path.resolve(__dirname, `./env/${env}.env`)
});

export const config={
    baseUrl: process.env.BASE_URL!,
    email: process.env.USER_EMAIL!,
    password: process.env.USER_PASSWORD!,
    invalidEmail: process.env.INVALID_EMAIL!,
    invalidPassword: process.env.INVALID_PASSWORD!
}