import React from 'react'
import HeroImage from '../assets/hero-image.png'

const Home = () => {
  return (
    <div>
         {/* Hero Section */}

         <section className="bg-white">
  <div className="mx-auto max-w-7xl px-6 py-20">

  <div className="grid items-center  gap-12 lg:grid-cols-2">

  {/* Left */}
  <div className="space-y-8">
  <div className="space-y-4">
    <span className="inline-block rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-600">
      🎉 Discover Amazing Events
    </span>

    <h1 className="text-5xl font-extrabold leading-tight text-gray-900 lg:text-6xl">
      Book Your Next
      <span className="block text-blue-600">
        Unforgettable Event
      </span>
    </h1>

    <p className="max-w-xl text-lg leading-8 text-gray-600 ">
      Discover conferences, workshops, concerts, sports events,
      and community gatherings all in one place.
      Book your seat instantly with EventHub.
    </p>
  </div>

  <div className="flex flex-wrap gap-4">
    <button className="rounded-xl bg-blue-600 px-8 py-4 font-semibold text-white transition hover:bg-blue-700">
      Explore Events
    </button>

    <button className="rounded-xl border border-gray-300 px-8 py-4 font-semibold text-gray-700 transition hover:border-blue-600 hover:text-blue-600">
      Learn More
    </button>
  </div>
</div>

  {/* Right */}
  <div className=" flex justify-center">
  <img
    src={HeroImage}
    alt="EventHub Hero"
    className="w-full max-w-lg"
  />
</div>

</div>

  </div>
</section>

      {/* Upcoming Events */}

      {/* Why Choose Us */}

      {/* Categories */}

      {/* Testimonials */}
    </div>
  )
}

export default Home