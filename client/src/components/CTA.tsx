import { Link } from "react-router-dom";

const CTA = () => {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">

      <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-700 px-10 py-20 text-center text-white shadow-2xl">

        <h2 className="text-4xl font-bold">
          Ready to Experience Amazing Events?
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-blue-100">
          Join thousands of people discovering concerts, workshops,
          conferences and unforgettable experiences with EventHub.
        </p>

        <div className="mt-10 flex flex-col justify-center gap-5 sm:flex-row">

          <Link
            to="/events"
            className="rounded-xl bg-white px-8 py-4 font-semibold text-blue-700 transition hover:scale-105"
          >
            Explore Events
          </Link>

          <Link
            to="/register"
            className="rounded-xl border border-white px-8 py-4 font-semibold transition hover:bg-white hover:text-blue-700"
          >
            Join Now
          </Link>

        </div>

      </div>

    </section>
  );
};

export default CTA;