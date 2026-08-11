
import { useMemo, useState } from "react";
import {
  FiCalendar,
  FiEdit2,
  FiMapPin,
  FiPlus,
  FiSearch,
  FiTrash2,
  FiUsers,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useEvent } from "../context/EventContext";


const AdminEvents = () => {
  const navigate = useNavigate();

  const {
     events,
    loading,
    deleteEvent,
  } = useEvent();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);

  // Categories
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(
      new Set(events.map((item) => item.category))
    );

    return ["All", ...uniqueCategories];
  }, [events]);

  // Filter events
  const filteredEvents = useMemo(() => {
    const searchValue = search.toLowerCase().trim();

    return events.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchValue) ||
        item.location.toLowerCase().includes(searchValue) ||
        item.category.toLowerCase().includes(searchValue);

      const matchesCategory =
        category === "All" || item.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [events, search, category]);

  // Stats
  const totalEvents = events.length;

  const totalSeats = events.reduce(
    (total, item) => total + item.totalSeats,
    0
  );

  const availableSeats = events.reduce(
    (total, item) => total + item.availableSeats,
    0
  );

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const handleDelete = async (eventId: string, title: string) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${title}"?`
    );

    if (!confirmed) return;

    try {
      setDeleteLoading(eventId);

      await deleteEvent(eventId);

      alert("Event deleted successfully.");
    } catch (error: any) {
      alert(
        error?.response?.data?.error ||
          "Unable to delete event."
      );
    } finally {
      setDeleteLoading(null);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-6 lg:px-8">

        {/* Header */}

        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <p className="text-sm font-semibold text-blue-600">
              Administration
            </p>

            <h1 className="mt-1 text-3xl font-bold tracking-tight text-gray-900">
              Manage Events
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Create, update and manage all EventHub events.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate("/admin/events/create")}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-100"
          >
            <FiPlus className="text-lg" />
            Add Event
          </button>

        </div>

        {/* Stats */}

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

          {/* Total Events */}

          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm font-medium text-gray-500">
                  Total Events
                </p>

                <p className="mt-2 text-3xl font-bold text-gray-900">
                  {totalEvents}
                </p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <FiCalendar className="text-xl" />
              </div>

            </div>
          </div>

          {/* Total Seats */}

          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm font-medium text-gray-500">
                  Total Seats
                </p>

                <p className="mt-2 text-3xl font-bold text-gray-900">
                  {totalSeats}
                </p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                <FiUsers className="text-xl" />
              </div>

            </div>
          </div>

          {/* Available Seats */}

          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:col-span-2 lg:col-span-1">
            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm font-medium text-gray-500">
                  Available Seats
                </p>

                <p className="mt-2 text-3xl font-bold text-gray-900">
                  {availableSeats}
                </p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-green-600">
                <FiUsers className="text-xl" />
              </div>

            </div>
          </div>

        </div>

        {/* Filters */}

        <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">

          <div className="flex flex-col gap-4 md:flex-row">

            {/* Search */}

            <div className="relative flex-1">

              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search events, locations or categories..."
                className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 pl-11 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
              />

            </div>

            {/* Category */}

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="h-12 rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm font-medium text-gray-700 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 md:w-52"
            >
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

          </div>

        </div>

        {/* Events */}

        <div className="mt-8">

          <div className="mb-5">
            <h2 className="text-xl font-bold text-gray-900">
              All Events
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              {filteredEvents.length} event
              {filteredEvents.length !== 1 ? "s" : ""} found
            </p>
          </div>

          {/* Loading */}

          {loading ? (
            <div className="space-y-4">

              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="h-48 animate-pulse rounded-2xl border border-gray-200 bg-white"
                />
              ))}

            </div>
          ) : filteredEvents.length === 0 ? (

            /* Empty */

            <div className="flex min-h-[350px] flex-col items-center justify-center rounded-2xl border border-gray-200 bg-white px-6 text-center shadow-sm">

              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-50">
                <FiCalendar className="text-2xl text-blue-600" />
              </div>

              <h3 className="mt-5 text-lg font-bold text-gray-900">
                No events found
              </h3>

              <p className="mt-2 max-w-md text-sm text-gray-500">
                There are no events matching your current search
                or category filter.
              </p>

              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setCategory("All");
                }}
                className="mt-5 rounded-xl bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-800"
              >
                Clear Filters
              </button>

            </div>

          ) : (

            /* Event List */

            <div className="space-y-4">

              {filteredEvents.map((item) => (

                <article
                  key={item._id}
                  className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md"
                >

                  <div className="flex flex-col lg:flex-row">

                    {/* Image */}

                    <div className="h-56 shrink-0 bg-gray-100 lg:h-auto lg:w-64">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    {/* Content */}

                    <div className="flex flex-1 flex-col p-5 sm:p-6">

                      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

                        <div className="min-w-0">

                          <div className="flex flex-wrap items-center gap-2">

                            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
                              {item.category}
                            </span>

                            <span
                              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                item.availableSeats > 0
                                  ? "bg-green-50 text-green-600"
                                  : "bg-red-50 text-red-600"
                              }`}
                            >
                              {item.availableSeats > 0
                                ? "Available"
                                : "Sold Out"}
                            </span>

                          </div>

                          <h3 className="mt-3 line-clamp-1 text-xl font-bold text-gray-900">
                            {item.title}
                          </h3>

                          <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-500">
                            {item.description}
                          </p>

                        </div>

                        <p className="shrink-0 text-lg font-bold text-gray-900">
                          PKR {item.ticketPrice}
                        </p>

                      </div>

                      {/* Details */}

                      <div className="mt-5 grid gap-4 border-t border-gray-100 pt-5 sm:grid-cols-2 lg:grid-cols-3">

                        <div className="flex items-start gap-3">
                          <FiCalendar className="mt-0.5 shrink-0 text-blue-600" />

                          <div>
                            <p className="text-xs text-gray-400">
                              Date
                            </p>

                            <p className="mt-1 text-sm font-medium text-gray-700">
                              {formatDate(item.date)}
                            </p>
                          </div>
                        </div>

                        <div className="flex min-w-0 items-start gap-3">
                          <FiMapPin className="mt-0.5 shrink-0 text-blue-600" />

                          <div className="min-w-0">
                            <p className="text-xs text-gray-400">
                              Location
                            </p>

                            <p className="mt-1 line-clamp-2 break-words text-sm font-medium text-gray-700">
                              {item.location}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <FiUsers className="mt-0.5 shrink-0 text-blue-600" />

                          <div>
                            <p className="text-xs text-gray-400">
                              Seats
                            </p>

                            <p className="mt-1 text-sm font-medium text-gray-700">
                              {item.availableSeats} /{" "}
                              {item.totalSeats}
                            </p>
                          </div>
                        </div>

                      </div>

                      {/* Actions */}

                      <div className="mt-6 flex flex-col gap-3 border-t border-gray-100 pt-5 sm:flex-row sm:justify-end">

                        <button
                          type="button"
                          onClick={() =>
                            navigate(
                              `/admin/events/edit/${item._id}`
                            )
                          }
                          className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
                        >
                          <FiEdit2 />
                          Edit
                        </button>

                        <button
                          type="button"
                          disabled={deleteLoading === item._id}
                          onClick={() =>
                            handleDelete(item._id, item.title)
                          }
                          className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-200 px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          <FiTrash2 />

                          {deleteLoading === item._id
                            ? "Deleting..."
                            : "Delete"}
                        </button>

                      </div>

                    </div>

                  </div>

                </article>

              ))}

            </div>

          )}

        </div>

      </div>
    </main>
  );
};

export default AdminEvents;

