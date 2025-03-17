/* asyncHandler sirf ek method banayega aur use export kr dega ----- db/index.js me jo export kiya gay hai same like that */
//hum do tarike use karege DATABASE SE BAAT KRNE KA 1.promiss wala, 2. trycatch wala

//Ye humara promiss wala tarika hai
//----------------------------------------------------------------
const asyncHandler = (requestHandler) => {
    (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err))
    }
}

export {asyncHandler}



// const asyncHandler = () => {}
// const asyncHandler = (func) => () =>{}
// const asyncHandler = (func) => async () => {}

/* ye humne rapper function banaya jo ki hum har jagah use krne wale hai, ye bahot easy krega */
// Ye humara trycatch wale tarika hai
//----------------------------------------------------------------
// const asyncHandler = (func) => async (req, res, next) => {
//     try {
//         await fn(req, res, next)
//     } catch (error) {
//         res.status(err.code || 500).json({
//             success: false,
//             message: err.message
//         })
//     }
// }