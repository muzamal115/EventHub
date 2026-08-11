import { useNavigate, useLocation, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { otpSchema, type OTPFormData } from "../schemas/authSchema";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";


const VerifyOTP = () => {

  const navigate = useNavigate();
const location = useLocation();

const email = location.state?.email;

useEffect(()=>{
if (!email) {
  navigate("/register");
 
}
},[email,navigate])


const { verifyOTP } = useAuth();

const {
  register,
  handleSubmit,
  formState: { errors, isSubmitting },
} = useForm<OTPFormData>({
  resolver: zodResolver(otpSchema),
});

const onSubmit = async (data: OTPFormData) => {
  try {
    await verifyOTP(email, data.otp);

    navigate("/");
  } catch (error: any) {
    alert(error.response?.data?.error || "OTP verification failed");
  }
};
 return (
  <div className="flex min-h-screen items-center justify-center bg-gray-50 px-6 py-10">
    <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">

      {/* Heading */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">
          Verify Your Email
        </h1>

        <p className="mt-3 text-gray-600">
          We've sent a 6-digit verification code to
        </p>

        <p className="mt-1 font-semibold text-blue-600 break-all">
          {email}
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-8 space-y-6"
      >
        <div>
          <label className="mb-2 block font-medium text-gray-700">
            Verification Code
          </label>

          <input
            type="text"
            maxLength={6}
            placeholder="Enter 6-digit OTP"
            {...register("otp")}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
          />

          <p className="mt-2 text-sm text-red-500">
            {errors.otp?.message}
          </p>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-xl bg-blue-600 py-4 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Verifying..." : "Verify OTP"}
        </button>
      </form>

      {/* Footer */}
      <div className="mt-8 text-center">

        <p className="text-sm text-gray-600">
          Didn't receive the code?
        </p>

        <button
          type="button"
          className="mt-2 font-semibold text-blue-600 hover:underline"
        >
          Resend OTP
        </button>

        <p className="mt-6 text-sm text-gray-600">
          Wrong email?

          <Link
            to="/register"
            className="ml-2 font-semibold text-blue-600 hover:underline"
          >
            Register Again
          </Link>
        </p>

      </div>

    </div>
  </div>
);
}

export default VerifyOTP