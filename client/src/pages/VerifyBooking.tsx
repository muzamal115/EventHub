import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FiArrowLeft, FiCheckCircle, FiMail } from "react-icons/fi";
import api from "../utils/axios";
import { useBooking } from "../context/BookingContext";

const VerifyBooking = () => {
    const[loading,setLoading]=useState(false)
    const[otp,setOtp]=useState("")
    const navigate=useNavigate()
    const {fetchMyBookings}=    useBooking()

    const{id}=useParams()

    const handleVerifyBooking=async(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    
    if(!id){
        alert("Event ID is missing")
        return
    }
    if(otp.length!==6){
        alert("Please enter a valid 6-digit OTP")
    }
    try {
        setLoading(true)
     const{data} =  await api.post('/bookings',{eventId:id,otp})
       console.log(data)
         fetchMyBookings()
          navigate('/my-bookings')
           alert("Booking Created successfully")
    } catch (error:any) {
           alert( error.response?.data?.error ||
          "Invalid or expired OTP"
      );
    } finally{
       setLoading(false)
    }
    
    }
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 px-6 py-16">

      <div className="mx-auto flex min-h-[75vh] max-w-6xl items-center justify-center">

        <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl lg:grid-cols-2">

          {/* Left */}

          <div className="hidden bg-gradient-to-br from-blue-600 to-indigo-700 p-12 text-white lg:flex lg:flex-col lg:justify-center">

            <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20">
              <FiMail className="text-3xl" />
            </div>

            <h1 className="text-4xl font-bold leading-tight">
              Verify Your Booking
            </h1>

            <p className="mt-5 leading-7 text-blue-100">
              We've sent a 6-digit verification code to your
              registered email address. Enter the code to
              confirm your booking request.
            </p>

            <div className="mt-10 flex items-center gap-3">
              <FiCheckCircle className="text-xl" />

              <span className="text-sm text-blue-100">
                Secure email verification
              </span>
            </div>

          </div>

          {/* Right */}

          <div className="p-8 sm:p-12">

            <Link
              to={`/events/${id}`}
              className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 transition hover:text-blue-600"
            >
              <FiArrowLeft />
              Back to Event
            </Link>

            <div className="mt-12">

              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100">
                <FiMail className="text-2xl text-blue-600" />
              </div>

              <h2 className="text-3xl font-bold text-gray-900">
                Enter Verification Code
              </h2>

              <p className="mt-3 leading-6 text-gray-500">
                Enter the 6-digit OTP sent to your email to
                complete your booking request.
              </p>

            </div>

            <form
              onSubmit={handleVerifyBooking}
              className="mt-10"
            >

              <label className="mb-3 block text-sm font-semibold text-gray-700">
                Verification Code
              </label>

              <input
                type="text"
                inputMode="numeric"
                maxLength={6}
                value={otp}
                onChange={(e) =>
                  setOtp(
                    e.target.value.replace(/\D/g, "")
                  )
                }
                placeholder="Enter 6-digit OTP"
                className="w-full rounded-xl border border-gray-300 px-4 py-4 text-center text-2xl font-bold tracking-[0.5em] outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
              />

              <p className="mt-3 text-sm text-gray-500">
                The OTP is valid for a limited time.
              </p>

              <button
                type="submit"
                disabled={loading || otp.length !== 6}
                className="mt-8 w-full rounded-xl bg-blue-600 py-4 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading
                  ? "Verifying..."
                  : "Verify & Book"}
              </button>

            </form>

            <div className="mt-8 rounded-xl bg-gray-50 p-4 text-center text-sm text-gray-500">
              Didn't receive the code? You can request a new
              OTP from the event page.
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default VerifyBooking