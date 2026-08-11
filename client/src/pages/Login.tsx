
import { useForm } from 'react-hook-form'
import { loginSchema, type LoginFormData } from '../schemas/authSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate } from 'react-router-dom'
import HeroImage from '../assets/hero-image.png'
import {  useState } from 'react'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useAuth } from '../context/AuthContext'
import { email } from 'zod'

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate=useNavigate()
  const {login}=useAuth( )

  const {register,handleSubmit,formState:{errors ,isSubmitting}}=useForm<LoginFormData>({
    resolver:zodResolver(loginSchema),
    mode:"onChange"

  })

 
const onSubmit = async (data: LoginFormData) => {
  try {

    await login(data.email, data.password);
    
    navigate("/");
  } catch (error: any) {
    const response=error.response?.data;
    if(response?.requiresVerification){
      navigate('/verify-otp',{
        state:{
          email:response.email
        }
      })
    }
    alert(response?.error || "Login failed");
  }}
  

  return (
   <div className="min-h-screen bg-gray-100 flex items-center justify-center px-6 py-10">

  <div className="grid w-full max-w-6xl overflow-hidden rounded-3xl bg-white shadow-2xl lg:grid-cols-2">

    {/* Left Side */}
    <div className="flex items-center justify-center p-8 lg:p-14">

      <div className="w-full max-w-md">

        <div className="mb-10">

          <h1 className="text-3xl font-bold text-gray-900 lg:text-4xl">
            Welcome Back 👋
          </h1>

          <p className="mt-3 text-gray-600">
            Sign in to continue to EventHub.
          </p>

        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
        >

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

          {/* Button */}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-xl bg-blue-600 py-4 font-semibold text-white transition duration-300 hover:bg-blue-700 hover:scale-[1.02] active:scale-95 disabled:opacity-60"
          >
            {isSubmitting ? "Signing In..." : "Sign In"}
          </button>

        </form>

        <p className="mt-6 text-center text-gray-600">
          Don't have an account?

          <Link
            to="/register"
            className="ml-2 font-semibold text-blue-600 hover:underline"
          >
            Register
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

export default Login