//ye humara phle controller hai---asyncHandler.js(helper file ) jo ki database ko connect krti hai. wo bhi lagega
//import { response } from "express"
import { asyncHandler } from "../utils/asyncHandler.js"   //database connectivity banane ke liye

//hum ek method banayege, jiska kaam hai sirf user ko register krna
const registerUser = asyncHandler (async (req, res) => {      //asyncHandler ye asyncHandler.js se aaya jo ki registerUser method bana hai
    res.status(200).json({
        message: "Ok"
    })
})                  

export {registerUser}     //ye registerUser ko post kiya gaya hai user.routes.js me --- with the help of app.js