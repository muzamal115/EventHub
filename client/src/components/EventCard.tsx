import { Link } from "react-router-dom";
import { FiCalendar, FiMapPin, FiUsers } from "react-icons/fi";
import type { Event } from "../types/event";

interface EventCardProps {
  event: Event;
}

const EventCard = ({ event }: EventCardProps) => {
  return (
    <div className="group overflow-hidden rounded-2xl bg-white shadow-md transition duration-300 hover:-translate-y-2 hover:shadow-2xl">

      {/* Image */}

      <div className="relative h-56 overflow-hidden">

        <img
          src={event.imageUrl}
          alt={event.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
        />

        <span className="absolute left-4 top-4 rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white shadow">
          {event.category}
        </span>

      </div>

      {/* Content */}

      <div className="space-y-4 p-6">

        <h2 className="line-clamp-2 text-xl font-bold text-gray-900">
          {event.title}
        </h2>

        <div className="space-y-3 text-sm text-gray-600">

          <div className="flex items-center gap-2">
            <FiCalendar className="text-blue-600" />
            <span>
              {new Date(event.date).toLocaleDateString()}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <FiMapPin className="text-blue-600" />
            <span>{event.location}</span>
          </div>

          <div className="flex items-center gap-2">
            <FiUsers className="text-blue-600" />
            <span>{event.availableSeats} Seats Left</span>
          </div>

        </div>

        <div className="flex items-center justify-between border-t pt-4">

          <div>

            <p className="text-xs text-gray-500">
              Starting From
            </p>

            <h3 className="text-2xl font-bold text-blue-600">
              Rs {event.ticketPrice}
            </h3>

          </div>

          <Link
            to={`/events/${event._id}`}
            className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            View Details
          </Link>

        </div>

      </div>

    </div>
  );
};

export default EventCard;