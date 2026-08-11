
import { useMemo, useState } from "react";
import {
  FiCalendar,
  FiMapPin,
  FiSearch,
  FiArrowRight,
  FiTag,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useEvent } from "../context/EventContext";

const Events = () => {
  const navigate = useNavigate();

  const { events, loading } = useEvent();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  // Get unique categories
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(
      new Set(events.map((item) => item.category))
    );

    return ["All", ...uniqueCategories];
  }, [event]);

  // Filter events
  const filteredEvents = useMemo(() => {
    return events.filter((item) => {
      const searchValue = search.toLowerCase().trim();

      const matchesSearch =
        item.title.toLowerCase().includes(searchValue) ||
        item.location.toLowerCase().includes(searchValue) ||
        item.category.toLowerCase().includes(searchValue);

      const matchesCategory =
        category === "All" || item.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [event, search, category]);

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

  return (
    <main className="min-h-screen bg-gray-50">

      {/* Hero / Header */}

      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-14 sm:py-16 lg:px-8">

          <div className="mx-auto max-w-3xl text-center">

            <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600">
              <FiCalendar />
              Discover Events
            </span>

            <h1 className="mt-5 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Find Your Next
              <span className="text-blue-600"> Experience</span>
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-gray-500 sm:text-lg">
              Explore exciting events, discover new experiences, and
              reserve your seat before they're gone.
            </p>

          </div>

          {/* Search + Category */}

          <div className="mx-auto mt-10 flex max-w-4xl flex-col gap-4 sm:flex-row">

            {/* Search */}

            <div className="relative flex-1">

              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-gray-400" />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search events, locations or categories..."
                className="h-12 w-full rounded-xl border border-gray-200 bg-white pl-11 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />

            </div>

            {/* Category */}

            <div className="relative sm:w-56">

              <FiTag className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="h-12 w-full appearance-none rounded-xl border border-gray-200 bg-white pl-11 pr-4 text-sm font-medium text-gray-700 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              >
                {categories.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>

            </div>

          </div>

        </div>
      </section>

      {/* Events Section */}

      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8">

        {/* Section Header */}

        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">

          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Upcoming Events
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              {loading
                ? "Loading events..."
                : `${filteredEvents.length} event${
                    filteredEvents.length !== 1 ? "s" : ""
                  } available`}
            </p>
          </div>

        </div>

        {/* Loading */}

        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
              >
                <div className="h-56 animate-pulse bg-gray-200" />

                <div className="space-y-4 p-5">
                  <div className="h-6 w-3/4 animate-pulse rounded bg-gray-200" />

                  <div className="h-4 w-1/2 animate-pulse rounded bg-gray-200" />

                  <div className="h-4 w-full animate-pulse rounded bg-gray-200" />

                  <div className="h-10 w-full animate-pulse rounded-xl bg-gray-200" />
                </div>
              </div>
            ))}

          </div>
        ) : filteredEvents.length === 0 ? (

          /* Empty State */

          <div className="flex min-h-[420px] flex-col items-center justify-center rounded-3xl border border-gray-200 bg-white px-6 text-center shadow-sm">

            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-50">
              <FiSearch className="text-3xl text-blue-600" />
            </div>

            <h3 className="mt-6 text-xl font-bold text-gray-900">
              No events found
            </h3>

            <p className="mt-2 max-w-md text-sm leading-6 text-gray-500">
              We couldn't find any events matching your search.
              Try another keyword or select a different category.
            </p>

            {(search || category !== "All") && (
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setCategory("All");
                }}
                className="mt-6 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Clear Filters
              </button>
            )}

          </div>

        ) : (

          /* Event Cards */

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

            {filteredEvents.map((item) => (

              <article
                key={item._id}
                className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >

                {/* Image */}

                <div className="relative h-56 overflow-hidden bg-gray-100">

                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />

                  {/* Category */}

                  <div className="absolute left-4 top-4">
                    <span className="rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-blue-600 shadow-sm backdrop-blur">
                      {item.category}
                    </span>
                  </div>

                  {/* Seats */}

                  <div className="absolute bottom-4 right-4">
                    <span
                      className={`rounded-full px-3 py-1.5 text-xs font-semibold shadow-sm backdrop-blur ${
                        item.availableSeats > 0
                          ? "bg-white/95 text-gray-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {item.availableSeats > 0
                        ? `${item.availableSeats} seats left`
                        : "Sold Out"}
                    </span>
                  </div>

                </div>

                {/* Content */}

                <div className="p-5">

                  <h3 className="line-clamp-1 text-xl font-bold text-gray-900">
                    {item.title}
                  </h3>

                  {/* Date */}

                  <div className="mt-4 flex items-start gap-3">
                    <FiCalendar className="mt-0.5 shrink-0 text-blue-600" />

                    <div>
                      <p className="text-xs text-gray-400">
                        Date & Time
                      </p>

                      <p className="mt-0.5 text-sm font-medium text-gray-700">
                        {formatDate(item.date)}
                      </p>

                      <p className="text-sm text-gray-500">
                        {formatTime(item.date)}
                      </p>
                    </div>
                  </div>

                  {/* Location */}

                  <div className="mt-4 flex items-start gap-3">
                    <FiMapPin className="mt-0.5 shrink-0 text-blue-600" />

                    <div className="min-w-0">
                      <p className="text-xs text-gray-400">
                        Location
                      </p>

                      <p className="mt-0.5 line-clamp-2 break-words text-sm font-medium leading-5 text-gray-700">
                        {item.location}
                      </p>
                    </div>
                  </div>

                  {/* Bottom */}

                  <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-5">

                    <div>
                      <p className="text-xs text-gray-400">
                        Ticket Price
                      </p>

                      <p className="mt-0.5 text-lg font-bold text-gray-900">
                        PKR {item.ticketPrice}
                      </p>
                    </div>

                    <button
                      type="button"
                      disabled={item.availableSeats <= 0}
                      onClick={() =>
                        navigate(`/events/${item._id}`)
                      }
                      className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300"
                    >
                      View Details
                      <FiArrowRight className="transition-transform group-hover:translate-x-0.5" />
                    </button>

                  </div>

                </div>

              </article>

            ))}

          </div>

        )}

      </section>

    </main>
  );
};

export default Events;

