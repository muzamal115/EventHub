
import {
  FiCalendar,
  FiMapPin,
  FiClock,
  FiCreditCard,
  
} from "react-icons/fi";
import { useBooking } from "../context/BookingContext";
import { useState } from "react";



const MyBookings = () => {
  const { bookings, loading ,cancelBooking} = useBooking();
  const[cancelLoading,setCancelLoading]=useState<string | null>(null)

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const formatTime = (date: string) => {
    return new Date(date).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });
  };

 const  handleCancelBooking=async(bookingId:string)=>{
const confirmed =window.confirm("Are you sure you want to cancel this booking")
if(!confirmed) return;

try {
  setCancelLoading(bookingId)
 
   await cancelBooking(bookingId)
  alert("Booking cancelled successfully")

  
} catch (error:any) {
   console.log("RESPONSE:", error.response?.data);
  
alert(error.response?.data?.error||  "Unable to cancel booking.")

}finally{
  setCancelLoading(null)
}

 }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 px-6 py-12">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10">
            <div className="h-9 w-56 animate-pulse rounded-lg bg-gray-200" />
            <div className="mt-3 h-5 w-80 animate-pulse rounded bg-gray-200" />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="overflow-hidden rounded-2xl bg-white shadow-sm"
              >
                <div className="h-52 animate-pulse bg-gray-200" />

                <div className="space-y-4 p-6">
                  <div className="h-6 w-3/4 animate-pulse rounded bg-gray-200" />
                  <div className="h-4 w-1/2 animate-pulse rounded bg-gray-200" />
                  <div className="h-4 w-2/3 animate-pulse rounded bg-gray-200" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="mx-auto max-w-6xl">

        {/* Header */}

        <div className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            My Bookings
          </h1>

          <p className="mt-2 text-gray-500">
            View and manage all your event bookings.
          </p>
        </div>

        {/* Empty State */}

        {bookings.length === 0 ? (
          <div className="flex min-h-[450px] flex-col items-center justify-center rounded-3xl border border-gray-200 bg-white px-6 text-center shadow-sm">

            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-50">
              <FiCalendar className="text-3xl text-blue-600" />
            </div>

            <h2 className="mt-6 text-2xl font-bold text-gray-900">
              No bookings yet
            </h2>

            <p className="mt-2 max-w-md text-gray-500">
              You haven't booked any events yet. Explore our
              upcoming events and reserve your seat.
            </p>

            <button
              onClick={() => (window.location.href = "/events")}
              className="mt-7 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              Explore Events
            </button>

          </div>
        ) : (

          /* Booking Cards */

          <div className="grid gap-6 md:grid-cols-2">

            {bookings.map((booking) => {

              const event = booking.eventId;

              return (
                <div
                  key={booking._id}
                  className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >

                  {/* Event Image */}

                  <div className="relative h-56 overflow-hidden bg-gray-100">

                    <img
                      src={event.imageUrl}
                      alt={event.title}
                      className="h-full w-full object-cover transition duration-500 hover:scale-105"
                    />

                    {/* Status */}

                    <div className="absolute right-4 top-4">
  <span
    className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
      booking.status === "confirmed"
        ? "bg-green-100 text-green-700"
        : booking.status === "cancelled"
        ? "bg-red-100 text-red-700"
        : "bg-yellow-100 text-yellow-700"
    }`}
  >
    {booking.status === "pending"
      ? "Pending"
      : booking.status === "confirmed"
      ? "Confirmed"
      : "Cancelled"}
  </span>


</div>



                  </div>

                  {/* Content */}

                  <div className="p-6">

                    <h2 className="line-clamp-1 text-xl font-bold text-gray-900">
                      {event.title}
                    </h2>

                    {/* Date */}

                    <div className="mt-5 flex items-start gap-3">
                      <FiCalendar className="mt-0.5 shrink-0 text-blue-600" />

                      <div>
                        <p className="text-sm text-gray-500">
                          Date
                        </p>

                        <p className="font-medium text-gray-800">
                          {formatDate(event.date)}
                        </p>
                      </div>
                    </div>

                    {/* Time */}

                    <div className="mt-4 flex items-start gap-3">
                      <FiClock className="mt-0.5 shrink-0 text-blue-600" />

                      <div>
                        <p className="text-sm text-gray-500">
                          Time
                        </p>

                        <p className="font-medium text-gray-800">
                          {formatTime(event.date)}
                        </p>
                      </div>
                    </div>

                    {/* Location */}

                    <div className="mt-4 flex items-start gap-3">
                      <FiMapPin className="mt-0.5 shrink-0 text-blue-600" />

                      <div className="min-w-0">
                        <p className="text-sm text-gray-500">
                          Location
                        </p>

                        <p className="break-words font-medium leading-6 text-gray-800">
                          {event.location}
                        </p>
                      </div>
                    </div>

                    {/* Divider */}

                    <div className="my-6 border-t border-gray-100" />

                    {/* Bottom Information */}

                    <div className="flex flex-wrap items-center justify-between gap-4">

                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
                          <FiCreditCard className="text-blue-600" />
                        </div>

                        <div>
                          <p className="text-xs text-gray-500">
                            Amount
                          </p>

                          <p className="font-bold text-gray-900">
                            PKR {booking.amount}
                          </p>
                        </div>

                      </div>

                      <div className="text-right">
                        <p className="text-xs text-gray-500">
                          Booking ID
                        </p>

                        <p className="max-w-[130px] truncate text-sm font-medium text-gray-700">
                          {booking._id}
                        </p>
                      </div>

                      
                        <div className="mt-4 flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3">
  <div>
    <p className="text-xs text-gray-500">
      Payment Status
    </p>

    <p
      className={`mt-1 text-sm font-semibold ${
        booking.paymentStatus === "paid"
          ? "text-green-600"
          : "text-yellow-600"
      }`}
    >
      {booking.paymentStatus === "paid"
        ? "Paid"
        : "Non-paid"}
    </p>
  </div>
</div>

{booking.status !== "cancelled" && (
  <button
    disabled={cancelLoading === booking._id}
    type="button"
    onClick={() => handleCancelBooking(booking._id)}
    className="rounded-xl border border-red-200 px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:opacity-60 disabled:cursor-not-allowed "
  >
   {cancelLoading === booking._id?'Cancelling...':'Cancel Booking'} 
  </button>
)}

                    </div>
                      

                  </div>
                </div>
              );
            })}

          </div>
        )}

      </div>
      
    </div>
  );
};

export default MyBookings;

