import dotenv from "dotenv"
dotenv.config()

import express from "express"
import { registerUser, loginUser,verifyOtp  } from "../controllers/authController.js"

const authRouter=express.Router()
authRouter.post('/register',registerUser)
authRouter.post('/login',loginUser)
authRouter.post('/verify-otp',verifyOtp)

export default authRouter