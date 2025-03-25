//ye humara 1st routes hai jo ki connect hoga humare user.controller.j me registration se
import { Router } from "express";    //Router express se hai
import { registerUser } from "../controllers/user.controllers.js";
import { upload } from "../middlewares/multer.middlewares.js";

//jaise hum express me app banate the vaise hi route se Router banayege---app.js me
const router = Router()

//ye route is liye hai ki jo humari avatar aur coverImage ki jo file hai wo submit ki ja sake--kyoki ye text file nhi hoti
//aur ab hum images bhej payege
router.route("/register").post(
    upload.fields([                     //ye upload multer.middlewares.js se aaya hai--jo krta hai registerUser routes se phle ek field bana ke jata hai.
        {
            name: "avatar",
            maxCount: 1         //ye kitni file except karega wo hai
        },
        {
            name: "coverImage",
            maxCount: 1
        }
    ]),
    registerUser)

export default router    //router ko import hum krege app.js me---export default hota hai to to manchaha naam de skte hai app.js ke imprt userRouter me 