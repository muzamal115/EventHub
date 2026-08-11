import  { useEffect } from 'react'
import { useBooking } from '../context/BookingContext'
import { useEvent } from '../context/EventContext'
import { Link } from "react-router-dom";
import {
  CalendarDays,
  ClipboardList,
  Clock3,
  CircleCheck,
  Plus,
  ArrowRight,
} from "lucide-react";
const AdminDashboard = () => {
  
  useEffect(()=>{
  getAllBookings();
 
  },[])

  const{getAllBookings,loading,allBookings}=useBooking()
  const{events}=useEvent()


  const totalEvents=events.length;
  const totalBookings=allBookings.length
  const pendingBookings=allBookings.filter((booking)=>(
    booking.status==='pending'
  )).length
  const confirmedBookings=allBookings.filter((booking)=>(
    booking.status==='confirmed'
  )).length

  const recentBookings=[...allBookings].slice(0,5)
  return (
   <div className="space-y-8 mx-auto max-w-7xl px-5 py-8 sm:px-6 lg:px-8">

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium text-blue-600">
            Admin Dashboard
          </p>

          <h1 className="mt-1 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Welcome back 👋
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Here's what's happening with your EventHub platform.
          </p>
        </div>

        <Link
          to="/admin/events/create"
          className="inline-flex w-fit items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
        >
          <Plus size={18} />
          Create Event
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">

        {/* Total Events */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
              <CalendarDays size={22} />
            </div>
          </div>

          <p className="mt-5 text-sm font-medium text-gray-500">
            Total Events
          </p>

          <h2 className="mt-1 text-3xl font-bold text-gray-900">
            {totalEvents}
          </h2>
        </div>

        {/* Total Bookings */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="rounded-xl bg-purple-50 p-3 w-fit text-purple-600">
            <ClipboardList size={22} />
          </div>

          <p className="mt-5 text-sm font-medium text-gray-500">
            Total Bookings
          </p>

          <h2 className="mt-1 text-3xl font-bold text-gray-900">
            {totalBookings}
          </h2>
        </div>

        {/* Pending */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="rounded-xl bg-amber-50 p-3 w-fit text-amber-600">
            <Clock3 size={22} />
          </div>

          <p className="mt-5 text-sm font-medium text-gray-500">
            Pending Bookings
          </p>

          <h2 className="mt-1 text-3xl font-bold text-gray-900">
            {pendingBookings}
          </h2>
        </div>

        {/* Confirmed */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="rounded-xl bg-green-50 p-3 w-fit text-green-600">
            <CircleCheck size={22} />
          </div>

          <p className="mt-5 text-sm font-medium text-gray-500">
            Confirmed Bookings
          </p>

          <h2 className="mt-1 text-3xl font-bold text-gray-900">
            {confirmedBookings}
          </h2>
        </div>

      </div>

      {/* Recent Bookings */}
      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">

        <div className="flex flex-col gap-3 border-b border-gray-100 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-bold text-gray-900">
              Recent Bookings
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Latest booking activity on your platform.
            </p>
          </div>

          <Link
            to="/admin/bookings"
            className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700"
          >
            View all
            <ArrowRight size={16} />
          </Link>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="p-8 text-center text-sm text-gray-500">
            Loading bookings...
          </div>
        ) : recentBookings.length === 0 ? (
          <div className="p-8 text-center text-sm text-gray-500">
            No bookings found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] text-left">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-gray-500">
                    User
                  </th>

                  <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-gray-500">
                    Event
                  </th>

                  <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-gray-500">
                    Amount
                  </th>

                  <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-gray-500">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">

                {recentBookings.map((booking) => (
                  <tr
                    key={booking._id}
                    className="transition hover:bg-gray-50"
                  >
                    <td className="px-5 py-4">
                      <p className="font-semibold text-gray-900">
                        {booking.userId?.name}
                      </p>

                      <p className="text-sm text-gray-500">
                        {booking.userId?.email}
                      </p>
                    </td>

                    <td className="px-5 py-4 text-sm font-medium text-gray-700">
                      {booking.eventId?.title}
                    </td>

                    <td className="px-5 py-4 text-sm font-semibold text-gray-900">
                      ${booking.amount}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${
                          booking.status === "confirmed"
                            ? "bg-green-100 text-green-700"
                            : booking.status === "cancelled"
                            ? "bg-red-100 text-red-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                ))}

              </tbody>
            </table>
          </div>
        )}

      </div>

    </div>
  );
  
}

export default AdminDashboard