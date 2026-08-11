import  { useEffect, useState } from 'react'
import { useBooking } from '../context/BookingContext'
import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  CreditCard,
  Mail,
  User,
  XCircle,
} from "lucide-react";
const AdminBookings = () => {
  const[confirmingId, setConfirmingId]=useState<string|null>(null)
  const{loading,allBookings,getAllBookings,confirmBooking}=useBooking()
  useEffect(()=>{
  getAllBookings()
  },[])
  const handleConfirmBooking=async(bookingId:string)=>{
   try {
    setConfirmingId(bookingId)
    await confirmBooking(bookingId)
    
   } catch (error:any) {
     alert(
      error?.response?.data?.error || 
       "Unable to confirm booking."
     )
   }finally{
    setConfirmingId(null)
   }
  }

 return (
    <div className="space-y-6 mx-auto max-w-7xl px-5 py-8 sm:px-6 lg:px-8">

      {/* Header */}
      <div>
        <p className="text-sm font-semibold text-blue-600">
          Admin Panel
        </p>

        <h1 className="mt-1 text-2xl font-bold text-gray-900 sm:text-3xl">
          Bookings
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Review and manage all event booking requests.
        </p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
              <CalendarDays size={21} />
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Total Bookings
              </p>

              <p className="text-2xl font-bold text-gray-900">
                {allBookings.length}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-amber-50 p-3 text-amber-600">
              <Clock3 size={21} />
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Pending
              </p>

              <p className="text-2xl font-bold text-gray-900">
                {
                  allBookings.filter(
                    (booking) => booking.status === "pending"
                  ).length
                }
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-green-50 p-3 text-green-600">
              <CheckCircle2 size={21} />
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Confirmed
              </p>

              <p className="text-2xl font-bold text-gray-900">
                {
                  allBookings.filter(
                    (booking) => booking.status === "confirmed"
                  ).length
                }
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Bookings */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

        {/* Desktop Table */}
        <div className="hidden overflow-x-auto md:block">
          <table className="w-full min-w-[1000px] text-left">

            <thead className="bg-gray-50">
              <tr>
                <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-gray-500">
                  Customer
                </th>

                <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-gray-500">
                  Event
                </th>

                <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-gray-500">
                  Amount
                </th>

                <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-gray-500">
                  Payment
                </th>

                <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-gray-500">
                  Booking
                </th>

                <th className="px-5 py-4 text-right text-xs font-bold uppercase tracking-wide text-gray-500">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">

              {loading && allBookings.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-5 py-12 text-center text-sm text-gray-500"
                  >
                    Loading bookings...
                  </td>
                </tr>
              ) : allBookings.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-5 py-12 text-center"
                  >
                    <div className="flex flex-col items-center">
                      <CalendarDays
                        size={38}
                        className="text-gray-300"
                      />

                      <p className="mt-3 font-semibold text-gray-700">
                        No bookings found
                      </p>

                      <p className="mt-1 text-sm text-gray-500">
                        Booking requests will appear here.
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                allBookings.map((booking) => (
                  <tr
                    key={booking._id}
                    className="transition hover:bg-gray-50"
                  >

                    {/* Customer */}
                    <td className="px-5 py-5">
                      <div className="flex items-center gap-3">

                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                          <User size={18} />
                        </div>

                        <div>
                          <p className="font-semibold text-gray-900">
                            {booking.userId?.name}
                          </p>

                          <p className="mt-0.5 flex items-center gap-1 text-xs text-gray-500">
                            <Mail size={12} />
                            {booking.userId?.email}
                          </p>
                        </div>

                      </div>
                    </td>

                    {/* Event */}
                    <td className="px-5 py-5">
                      <p className="font-semibold text-gray-800">
                        {booking.eventId.title}
                      </p>

                      <p className="mt-1 text-xs text-gray-500">
                        {booking.eventId.location}
                      </p>
                    </td>

                    {/* Amount */}
                    <td className="px-5 py-5">
                      <p className="font-bold text-gray-900">
                        ${booking.amount}
                      </p>
                    </td>

                    {/* Payment */}
                    <td className="px-5 py-5">

                      {booking.paymentStatus === "paid" ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-1.5 text-xs font-bold text-green-700">
                          <CreditCard size={13} />
                          Paid
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1.5 text-xs font-bold text-amber-700">
                          <CreditCard size={13} />
                          Non-paid
                        </span>
                      )}

                    </td>

                    {/* Booking Status */}
                    <td className="px-5 py-5">

                      {booking.status === "confirmed" && (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-1.5 text-xs font-bold capitalize text-green-700">
                          <CheckCircle2 size={13} />
                          Confirmed
                        </span>
                      )}

                      {booking.status === "pending" && (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1.5 text-xs font-bold capitalize text-amber-700">
                          <Clock3 size={13} />
                          Pending
                        </span>
                      )}

                      {booking.status === "cancelled" && (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-red-100 px-3 py-1.5 text-xs font-bold capitalize text-red-700">
                          <XCircle size={13} />
                          Cancelled
                        </span>
                      )}

                    </td>

                    {/* Action */}
                    <td className="px-5 py-5 text-right">

                      {booking.status === "pending" && (
                        <button
                          type="button"
                          disabled={confirmingId === booking._id}
                          onClick={() =>
                            handleConfirmBooking(booking._id)
                          }
                          className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          <CheckCircle2 size={16} />

                          {confirmingId === booking._id
                            ? "Confirming..."
                            : "Confirm Booking"}
                        </button>
                      )}

                      {booking.status === "confirmed" && (
                        <span className="text-sm font-medium text-gray-400">
                          Completed
                        </span>
                      )}

                      {booking.status === "cancelled" && (
                        <span className="text-sm font-medium text-gray-400">
                          Cancelled
                        </span>
                      )}

                    </td>

                  </tr>
                ))
              )}

            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="space-y-4 p-4 md:hidden">

          {loading && allBookings.length === 0 ? (
            <div className="py-10 text-center text-sm text-gray-500">
              Loading bookings...
            </div>
          ) : allBookings.length === 0 ? (
            <div className="py-10 text-center">
              <CalendarDays
                size={38}
                className="mx-auto text-gray-300"
              />

              <p className="mt-3 font-semibold text-gray-700">
                No bookings found
              </p>
            </div>
          ) : (
            allBookings.map((booking) => (
              <div
                key={booking._id}
                className="rounded-2xl border border-gray-200 p-4"
              >

                {/* Customer */}
                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                    <User size={18} />
                  </div>

                  <div className="min-w-0">
                    <p className="truncate font-semibold text-gray-900">
                      {booking.userId?.name}
                    </p>

                    <p className="truncate text-xs text-gray-500">
                      {booking.userId?.email}
                    </p>
                  </div>

                </div>

                {/* Event */}
                <div className="mt-4 border-t border-gray-100 pt-4">
                  <p className="text-xs font-medium text-gray-400">
                    Event
                  </p>

                  <p className="mt-1 font-semibold text-gray-800">
                    {booking.eventId.title}
                  </p>

                  <p className="mt-1 text-sm text-gray-500">
                    {booking.eventId.location}
                  </p>
                </div>

                {/* Amount */}
                <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
                  <span className="text-sm text-gray-500">
                    Amount
                  </span>

                  <span className="font-bold text-gray-900">
                    ${booking.amount}
                  </span>
                </div>

                {/* Statuses */}
                <div className="mt-4 flex flex-wrap gap-2">

                  {booking.paymentStatus === "paid" ? (
                    <span className="rounded-full bg-green-100 px-3 py-1.5 text-xs font-bold text-green-700">
                      Paid
                    </span>
                  ) : (
                    <span className="rounded-full bg-amber-100 px-3 py-1.5 text-xs font-bold text-amber-700">
                      Non-paid
                    </span>
                  )}

                  {booking.status === "confirmed" && (
                    <span className="rounded-full bg-green-100 px-3 py-1.5 text-xs font-bold text-green-700">
                      Confirmed
                    </span>
                  )}

                  {booking.status === "pending" && (
                    <span className="rounded-full bg-amber-100 px-3 py-1.5 text-xs font-bold text-amber-700">
                      Pending
                    </span>
                  )}

                  {booking.status === "cancelled" && (
                    <span className="rounded-full bg-red-100 px-3 py-1.5 text-xs font-bold text-red-700">
                      Cancelled
                    </span>
                  )}

                </div>

                {/* Action */}
                {booking.status === "pending" && (
                  <button
                    type="button"
                    disabled={confirmingId === booking._id}
                    onClick={() =>
                      handleConfirmBooking(booking._id)
                    }
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <CheckCircle2 size={17} />

                    {confirmingId === booking._id
                      ? "Confirming..."
                      : "Confirm Booking"}
                  </button>
                )}

              </div>
            ))
          )}

        </div>

      </div>
    </div>
  );
}

export default AdminBookings