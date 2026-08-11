import { useForm } from "react-hook-form"
import { registerSchema, type RegisterFormData } from "../schemas/authSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { FaEye, FaEyeSlash } from "react-icons/fa";
import HeroImage from '../assets/hero-image.png'


const Register = () => {
  const [showPassword,setShowPassword]=useState(false)
  const navigate=useNavigate()
  const {registerUser}=useAuth()

   const {register,handleSubmit,formState:{errors ,isSubmitting}}=useForm<RegisterFormData>({
      resolver:zodResolver(registerSchema),
      mode:"onChange"
  
    })
    const onSubmit=async(data:RegisterFormData)=>{
              try {
              const response=  await registerUser(data.name,data.email,data.password)
              navigate('/verify-otp',{
               state:{email:response.email} 
              })

              } catch (error:any) {
                alert(error.response?.data?.error || "Registration failed");
              }
    }
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-6 py-10">
    
      <div className="grid w-full  max-w-6xl overflow-hidden rounded-3xl bg-white shadow-2xl lg:grid-cols-2">
    
        {/* Left Side */}
        <div className="flex items-center justify-center p-8 lg:p-14">
    
          <div className="w-full max-w-md">
    
            <div className="mb-10">
    
              <h1 className="text-3xl font-bold text-gray-900 lg:text-4xl">
              Create Account 🚀
              </h1>
    
              <p className="mt-3 text-gray-600">
               Create your account to start booking events.
              </p>
    
            </div>
    
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-6"
            >

              {/* Name */}

               <div>
    
                <label className="mb-2 block font-medium">
                  Name
                </label>
    
                <input
                  type="text"
                  placeholder="Enter your name"
                  {...register("name")}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                />
    
                <p className="mt-2 text-sm text-red-500">
                  {errors.name?.message}
                </p>
    
              </div>
    
              {/* Email */}
    
              <div>
    
                <label className="mb-2 block font-medium">
                  Email
                </label>
    
                <input
                  type="email"
                  placeholder="Enter your email"
                  {...register("email")}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                />
    
                <p className="mt-2 text-sm text-red-500">
                  {errors.email?.message}
                </p>
    
              </div>
    
              {/* Password */}
    
              <div>
    
                <label className="mb-2 block font-medium">
                  Password
                </label>
    
                <div className="relative">
    
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    {...register("password")}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 pr-12 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                  />
    
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
    
                </div>
    
                <p className="mt-2 text-sm text-red-500">
                  {errors.password?.message}
                </p>
    
              </div>

            {/* confirm paaword */}
             <div>
    
                <label className="mb-2 block font-medium">
                Confirm Password
                </label>
    
                <div className="relative">
    
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Re-enter your password"
                    {...register("confirmPassword")}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 pr-12 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                  />
    
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
    
                </div>
    
                <p className="mt-2 text-sm text-red-500">
                  {errors.confirmPassword?.message}
                </p>
    
              </div>
              
    
              {/* Button */}
    
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-xl bg-blue-600 py-4 font-semibold text-white transition duration-300 hover:bg-blue-700 hover:scale-[1.02] active:scale-95 disabled:opacity-60"
              >
                {isSubmitting ? "Register..." : "Register"}
              </button>
    
            </form>
    
            <p className="mt-6 text-center text-gray-600">
              Already have an account?
   
              <Link
                to="/login"
                className="ml-2 font-semibold text-blue-600 hover:underline"
              >
                Login
              </Link>
    
            </p>
    
          </div>
    
        </div>
    
        {/* Right Side */}
    
        <div className="hidden items-center justify-center bg-blue-50 p-10 lg:flex">
    
          <img
            src={HeroImage}
            alt="Login Illustration"
            className="w-full max-w-lg"
          />
    
        </div>
    
      </div>
    
    </div>
  )
}

export default Register