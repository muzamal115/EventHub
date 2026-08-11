import { Link } from "react-router-dom";
import HeroImage from "../assets/hero-image.png";

const Hero = () => {
  return (
    <section className="bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="mx-auto flex max-w-7xl flex-col-reverse items-center gap-12 px-6 py-20 lg:flex-row">

        {/* Left */}

        <div className="flex-1 text-center lg:text-left">

          <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
            🎉 Discover Amazing Events
          </span>

          <h1 className="mt-6 text-5xl font-extrabold leading-tight text-gray-900 lg:text-6xl">
            Find, Book &
            <span className="text-blue-600"> Enjoy </span>
            Events Near You
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-gray-600">
            Explore concerts, workshops, conferences, sports events and much
            more. Book your seat in seconds with EventHub.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">

            <Link
              to="/events"
              className="rounded-xl bg-blue-600 px-8 py-4 text-center font-semibold text-white transition hover:bg-blue-700"
            >
              Explore Events
            </Link>

            <Link
              to="/register"
              className="rounded-xl border border-blue-600 px-8 py-4 text-center font-semibold text-blue-600 transition hover:bg-blue-50"
            >
              Get Started
            </Link>

          </div>

          {/* Stats */}

          <div className="mt-12 flex flex-wrap justify-center gap-8 lg:justify-start">

            <div>
              <h2 className="text-3xl font-bold text-gray-900">
                500+
              </h2>

              <p className="text-gray-600">
                Events
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-900">
                10K+
              </h2>

              <p className="text-gray-600">
                Users
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-900">
                99%
              </h2>

              <p className="text-gray-600">
                Satisfaction
              </p>
            </div>

          </div>

        </div>

        {/* Right */}

        <div className="flex flex-1 justify-center">

          <img
            src={HeroImage}
            alt="EventHub Hero"
            className="w-full max-w-xl drop-shadow-2xl"
          />

        </div>

      </div>
    </section>
  );
};

export default Hero;