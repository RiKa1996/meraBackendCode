//ye humara phle controller hai---asyncHandler.js(helper file ) jo ki database ko connect krti hai. wo bhi lagega
//import { response } from "express"
import { asyncHandler } from "../utils/asyncHandler.js"   //database connectivity banane ke liye
import { ApiError } from "../utils/apiError.js"            //2.validation me yhi koi error hai to use error ka code denge 
import { User } from "../models/user.model.js"      //3.check if user already exists: username/email---isliye import kiya hai
import { uploadOnCloudinary } from "../utils/fileUploaderCloudinary.js"  ////5.agar files available ho gai hai to: upload them to cloudinary, avatar ko bhi check kr lenge
import { ApiResponse } from "../utils/apiResponse.js"  //9.return response

//hum ek method banayege, jiska kaam hai sirf user ko register krna
const registerUser = asyncHandler (async (req, res) => {      //asyncHandler ye asyncHandler.js se aaya jo ki registerUser method bana hai
    /* res.status(200).json({
        message: "debatewithrishav"
    }) */

    //Yha se ab hum user ko register karege
    //1.get user details from frontend
    //2.validation-not empty--ya koi aise hi koi dusra chij
    //3.check if user already exists: username/email
    //4.files:check for images, check for avatar
    //5.agar files available ho gai hai to: upload them to cloudinary, avatar ko bhi check kr lenge
    //6.create user object- kyoki mongoDB me hum jab data send karege-noSQL data bases hai-----
    //kyoki isme object hi banaye jate hai aur upload kiye jate hai- object banane ke baad----create entry in DB (.create se)
    //7.remove password and refresh token field from response
    //8.check for user creation
    //9.return response

    //1. get user details from frontend---user se details lena---user ki details ---form aur json aur url se bhi aata hai hum yha body se lenge
    const {fullname, username, email, password} = req.body
    console.log("email", email)

    //2.validation-not empty--ya koi aise hi koi dusra chij----isse phle humne image upload kiya hai by using user.routes.js and multer.middlewares.js se
    //ek-ek fields ko check krna hai ki wo empty to nhi hai
    /* if (fullname === ""){     //ydi fullname empty hai to 
        throw new ApiError(400, "full name is required")
    } */
   //ek aur interesting method hai --- ye upper wala if wala bhi hai.
   if (
        [fullname, username, email, password].some( (field) => {
            field?.trim() === ""
        })           //some method hume true and false return krta hai
   ) {
        throw new ApiError(400, "All fields are required")
   }
   //3.check if user already exists: username/email----------------------------------------------------------------
   const existedUser = User.findOne({           //findOne method --jo phla user hoga use return kr dega
        $or: [{ username },{ email }]                           //This is oprators ----IMPORTANT 
   })  
   if (existedUser) {
    throw new ApiError(409, "User with email or username is already exists")
   }
   //4.files:check for images, check for avatar--------------------------------------------------------------------
   //kyoki humne user.routes.js ke ander middleware add kiya hai isliye ye middleware bhi hume axis deta hai
   const avatarLocalPath = req.files?.avatar[0]?.path;      //multer hume req.files ka access de deta hai---multer.middlware---? means optionally
   const coverImageLocalPath = req.files?.coverImage[0]?.path;
   //check for avatar
   if (!avatarLocalPath){
        throw new ApiError(400, "avtar file is required")
   }
   //5.agar files available ho gai hai to: upload them to cloudinary, avatar ko bhi check kr lenge
   const avatar = await uploadOnCloudinary(avatarLocalPath)
   const coverImage = await uploadOnCloudinary(coverImageLocalPath)

   if (!avatar) {
        throw new ApiError(400, "avatar file is required")
   }
   //6.create user object- kyoki mongoDB me hum jab data send karege-noSQL data bases hai-----
   //kyoki isme object hi banaye jate hai aur upload kiye jate hai- object banane ke baad----create entry in DB (.create se)
   const user = await User.create({
        fullname,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()
   })
   //7.remove password and refresh token field from response
   //phle hum findById method se find karege fer us User ko select method se karege jise hume remove karna hai.
   const createdUser = User.findById(user._id).select(
        "-password -refreshToken"           //aise aage minus laga ke us field ko select kr skte hai jise hume remove krna hai
   )
   //8.check for user creation
   if (!createdUser){
        throw new ApiError(500, "Something went wrong while registering the user")
   }
   //9.return response
   return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered successfully")
   )
})                  

export {registerUser}     //ye registerUser ko post kiya gaya hai user.routes.js me --- with the help of app.js