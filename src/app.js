import express from "express";    /* express se useally ek app banti hai */
import cors from "cors";        /* ye help krta ki how to connect backend with frontend */

/* server se user ka jo brawser hai uske ander ki cookie ko access krna and set krna  */
import cookieParser from "cookie-parser";   /* Small pieces of data stored on your browser by websites to remember your preferences, login status, or track your activity. */

const app = express()

/*1st config this is Cors ---jisko connect kiya hai */
app.use(cors({
    origin: process.env.CORS_ORIGIN,   /* CORS_ORIGIN .env file se aaya hai */
    credentials: true
}))

/*2nd config now hume config krna aur middleware set krna hai with express se  */
app.use(express.json({limit: "16kb"}))

/* 3rd config jo ki URL se aati(ye url ko encoder krta hai) like-- %20, +, - ,  */
app.use(express.urlencoded({extended: true, limit: "16kb"}))

/* 4th config jo ji public folders types hai jo ki koi bhi access kr skta hai. */
app.use(express.static("public"))

/* 5th config jo ki server se user ka jo brawser hai uske ander ki cookie ko access krna and set krn */
app.use(cookieParser())


export {app}   /* app jaise hi hum export krte hai to hume index.js me jake (kyoki async function hume promiss bhi return krta hai) */
                /* index.js me ja ke .then aur .catch  */