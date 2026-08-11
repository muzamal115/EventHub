import OTP from "../models/OTP.js"
import User from "../models/User.js"
import generateToken from "../utils/generateToken.js"
import bcrypt from "bcryptjs";
import {sendEmail} from "../utils/sendEmail.js";
export const registerUser=async(req,res)=>{

try { 
    const {name,email,password}=req.body
    if(!name || !email || !password){
    return res.status(400).json({error:"All fields are required."})}
    const existUser= await User.findOne({email})
    if(existUser){
        return res.status(400).json({error:"User already exist"})
    } 
    const hashPassword=await bcrypt.hash(password,10)
  await User.create({
    name,
    email,
    password:hashPassword
   })
 
const otp=Math.floor(100000+Math.random()*900000).toString()
  console.log(`OTP for ${email}: ${otp}`)
  await OTP.create({email,otp,action:'account-verification'})
  await sendEmail(email,otp,'account-verification')
    return res.status(201).json({
    message:"User registered successfully. Please check your email for OTP to verify your account",
    email
})

} catch (error) {
   
    return res.status(400).json({error:error.message})
}

}
export const loginUser=async(req,res)=>{
   
    try {
        const {email,password}=req.body
        if(!email || !password){
            return res.status(400).json({error:"Both fields are required."})
        }
     const existUser=await User.findOne({email})
     if(!existUser){
        return res.status(400).json({error:"User not found"})
     }
     const isMatch=await bcrypt.compare(password,existUser.password)
     if(!isMatch){
        return res.status(400).json({error:"Invalid email or password"})
     }
     if(!existUser.isVerified && existUser.role=="user"){

 const otp=Math.floor(100000+Math.random()*900000).toString()
  await OTP.deleteMany({email,action:'account-verification'})
  await OTP.create({email,otp,action:'account-verification'})
  await sendEmail(email,otp,'account-verification')
return res.status(403).json({
    error:"Account not verified. A new OTP has been sent to your email. ", requiresVerification: true,email
})
     }
     const token=generateToken(existUser._id,existUser.role)
  

     return res.status(200).json({message:"Login successful",
        token,
        user:{
        _id:existUser._id,
        name:existUser.name,
        email:existUser.email ,
        role:existUser.role,
     }
      })
        
    } catch (error) {
         
    return res.status(400).json({error:error.message})
    }

}
export const verifyOtp=async(req,res)=>{

    try {
        const{email,otp}=req.body
        const otpRecord=await OTP.findOne({email,otp,action:'account-verification'})
        if(!otpRecord){
            return res.status(400).json({error:'Invalid or expired OTP'})
        }
        const user=await User.findOneAndUpdate({email},{isVerified:true}, { new: true })

        if (!user) {
    return res.status(404).json({
        error: "User not found"
    });
}
        await OTP.deleteMany({email,action:"account-verification"})
        const token=generateToken(user._id,user.role)
       return res.json({
            message:"Account verified successfully. You can now log in.",
            user:{
             _id:user._id,
            name:user.name,
            email:user.email,
            role:user.role,
            },
            token
        })
        
    } catch (error) {
          
    return res.status(400).json({error:error.message})
    }
}