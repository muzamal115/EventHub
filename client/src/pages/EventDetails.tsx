import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../utils/axios";
import type { Event } from "../types/event";
import {
  FiCalendar,
  FiMapPin,
  FiUsers,
  FiArrowLeft,
  FiTag,
} from "react-icons/fi";
import { useAuth } from "../context/AuthContext";

const EventDetails = () => {
  const { id } = useParams();
  const navigate=useNavigate()


  useEffect(() => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}, []);

  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(false);
  const[verifyingBooking,setVerifyingBooking]=useState(false)
  const {user}=useAuth()

  const fetchEvent = async () => {
    setLoading(true);

    try {
      const { data } = await api.get<Event>(`/events/${id}`);
      setEvent(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvent();
  }, [id]);

  const handleBooking=async()=>{

    setVerifyingBooking(true)
     if(!user){
       navigate('/login');
       return
      }
    try {
     console.log("ABOUT TO SEND BOOKING OTP");
     await api.post("/bookings/send-otp");
     console.log("BOOKING OTP REQUEST SUCCESS");
     navigate(`/events/${event?._id}/verify-booking`)
      
    } catch (error:any) {
      alert(error.response?.data?.error||
         "Unable to send booking OTP"
      )
      
    }finally{
      setVerifyingBooking(false)
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-2xl font-bold">
        Loading...
      </div>
    );
  }

  if (!event) {
    return (
      <div className="flex min-h-screen items-center justify-center text-2xl font-bold">
        Event Not Found
      </div>
    );
  }

  return (
    <div className="bg-gray-50 pb-20">

      {/* Hero Image */}

      <div className="relative h-[500px] overflow-hidden">

        <img
          src={event.imageUrl}
          alt={event.title}
          className="h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-black/45 " />

        <div className="absolute left-1/2 top-1/2 w-full max-w-7xl -translate-x-1/2 -translate-y-1/2 px-6">

          <Link
            to="/"
            className="mb-8 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-gray-800 shadow-lg transition hover:bg-gray-100"
          >
            <FiArrowLeft />
            Back
          </Link>

          <div className="mt-8">

            <span className="rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white">
              {event.category}
            </span>

            <h1 className="mt-6 max-w-4xl text-5xl font-extrabold leading-tight text-white">
              {event.title}
            </h1>

          </div>

        </div>

      </div>

      {/* Content */}

      <div className="mx-auto mt-12 grid max-w-7xl gap-12 px-6 lg:grid-cols-3 ">

        {/* Left */}

        <div className="lg:col-span-2 ">

          <div className="rounded-3xl bg-white p-8 shadow-lg ">

            <div className="grid gap-6 md:grid-cols-2 ">

              <div className="flex items-center gap-4">

                <div className="rounded-xl bg-blue-100 p-4">
                  <FiCalendar className="text-2xl text-blue-600" />
                </div>

                <div>

                  <p className="text-sm text-gray-500">
                    Event Date
                  </p>

                  <h3 className="font-semibold">
                    {new Date(event.date).toLocaleDateString()}
                  </h3>

                </div>

              </div>

              <div className="flex items-center gap-4">

                <div className="rounded-xl bg-blue-100 p-4">
                  <FiMapPin className="text-2xl text-blue-600" />
                </div>

                <div>

                  <p className="text-sm text-gray-500">
                    Location
                  </p>

                  <h3 className="font-semibold">
                    {event.location}
                  </h3>

                </div>

              </div>

              <div className="flex items-center gap-4">

                <div className="rounded-xl bg-blue-100 p-4">
                  <FiUsers className="text-2xl text-blue-600" />
                </div>

                <div>

                  <p className="text-sm text-gray-500">
                    Available Seats
                  </p>

                  <h3 className="font-semibold">
                    {event.availableSeats}
                  </h3>

                </div>

              </div>

              <div className="flex items-center gap-4">

                <div className="rounded-xl bg-blue-100 p-4">
                  <FiTag className="text-2xl text-blue-600" />
                </div>

                <div>

                  <p className="text-sm text-gray-500">
                    Category
                  </p>

                  <h3 className="font-semibold">
                    {event.category}
                  </h3>

                </div>

              </div>

            </div>

            <div className="mt-12">

              <h2 className="mb-5 text-3xl font-bold text-gray-900">
                About This Event
              </h2>

              <p className="leading-8 text-gray-600">
                {event.description}
              </p>

            </div>

          </div>

        </div>

        {/* Right */}

        <div>

          <div className="sticky top-24 rounded-3xl bg-white p-8 shadow-xl">

            <p className="text-sm font-medium text-gray-500">
              Ticket Price
            </p>

            <h2 className="mt-2 text-5xl font-extrabold text-blue-600">
              Rs {event.ticketPrice}
            </h2>

            <div className="mt-8 space-y-4">

              <div className="flex justify-between">

                <span className="text-gray-500">
                  Seats Left
                </span>

                <span className="font-semibold">
                  {event.availableSeats}
                </span>

              </div>

              <div className="flex justify-between">

                <span className="text-gray-500">
                  Category
                </span>

                <span className="font-semibold">
                  {event.category}
                </span>

              </div>

              

            </div>

            <button 
            disabled={verifyingBooking}
            onClick={handleBooking}
            className="mt-10 w-full rounded-2xl bg-blue-600 py-4 text-lg font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60">
              {verifyingBooking?"Verifying..":"Book Event"}
            </button>

                        {/* Organizer */}

            <div className="mt-10 rounded-2xl border border-gray-200 p-6">

              <h3 className="text-lg font-bold text-gray-900">
                Event Organizer
              </h3>

              <div className="mt-5 flex items-center gap-4">

                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-xl font-bold text-white">
                  {event.title.charAt(0)}
                </div>

                <div>

                  <h4 className="font-semibold text-gray-900">
                    EventHub Organizer
                  </h4>

                  <p className="text-sm text-gray-500">
                    Verified Organizer
                  </p>

                </div>

              </div>

            </div>

            {/* Notice */}

            <div className="mt-8 rounded-2xl border border-blue-100 bg-blue-50 p-6">

              <h3 className="font-bold text-blue-700">
                Important Information
              </h3>

              <ul className="mt-4 space-y-2 text-sm leading-7 text-gray-600">

                <li>• Please arrive at least 30 minutes before the event starts.</li>

                <li>• Carry a valid ID for verification.</li>

                <li>• Your booking confirmation will be required at entry.</li>

                <li>• Tickets are subject to organizer policies.</li>

              </ul>

            </div>

          </div>

        </div>

      </div>

      {/* Why Attend */}

      <section className="mx-auto mt-20 max-w-7xl px-6">

        <div className="rounded-3xl bg-white p-10 shadow-lg">

          <h2 className="text-3xl font-bold text-gray-900">
            Why Attend This Event?
          </h2>

          <div className="mt-10 grid gap-8 md:grid-cols-3">

            <div className="rounded-2xl border p-6">

              <div className="mb-4 text-4xl">
                🎤
              </div>

              <h3 className="text-xl font-bold">
                Expert Speakers
              </h3>

              <p className="mt-3 text-gray-600">
                Learn from industry professionals and experienced speakers.
              </p>

            </div>

            <div className="rounded-2xl border p-6">

              <div className="mb-4 text-4xl">
                🤝
              </div>

              <h3 className="text-xl font-bold">
                Networking
              </h3>

              <p className="mt-3 text-gray-600">
                Meet like-minded people and build valuable professional connections.
              </p>

            </div>

            <div className="rounded-2xl border p-6">

              <div className="mb-4 text-4xl">
                🚀
              </div>

              <h3 className="text-xl font-bold">
                New Experience
              </h3>

              <p className="mt-3 text-gray-600">
                Discover opportunities, ideas and unforgettable experiences.
              </p>

            </div>

          </div>

        </div>

      </section>

    </div>
  );
};

export default EventDetails;