import z from "zod";

export const loginSchema=z.object({
    email:z.email("Please enter a valid email address"),
    password:z.string().min(6,'Password must be at least 6 characters')
})

export type LoginFormData=z.infer<typeof loginSchema>

export const registerSchema=z.object({
    name:z.string().min(3,"Name must be at least 3 characters"),
    email:z.email("Please enter a valid email address"),
   
    password:z.string().min(6,"Password must be at least 6 characters"),

  confirmPassword:z.string().min(6,"Confirm password is required") 
}).refine((data)=>data.password===data.confirmPassword,{
    message:"Password do not match",
    path:["confirmPassword"]
})

export type RegisterFormData=z.infer<typeof registerSchema>

export const otpSchema = z.object({
  otp: z
    .string()
    .length(6, "OTP must be exactly 6 digits"),
});

export type OTPFormData = z.infer<typeof otpSchema>;