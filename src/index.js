//require(`dotenv`).config({path: './env'})       /* ye bahot hi common hai isliye */
/* ye code jyada consitency banata hai isliye */
import dotenv from "dotenv"
import connectDB from "./db/index.js"

dotenv.config({
    path: './env'
})

connectDB()


//import mongoose from "mongoose";
//import { DB_NAME } from "./constants";




// import express from "express"
// const app = express()
// /* ; iska mtlb cleanning perpose ke liye hai// isme trycatch concept lagta always */
// (async () => {
//     try {
//         await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`) /* ye .env file aur constants.js se laya gaya hai---MONGODB_URL */
//         app.on("error", (error) => {     /* this is part of express jo ki ydi koi error aati hai to error dikhayegi */
//             console.log("ERROR : ", error);
//             throw error
//         })
//         app.listen(process.env.PORT, () => {
//             console.log(`App is listening on port ${process.env.PORT}`)
//         })
//     } catch (error) {
//         console.error("ERROR :", error)
//         throw err
//     }
// })()
