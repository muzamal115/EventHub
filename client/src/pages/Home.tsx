

import CTA from '../components/CTA';
import EventCard from '../components/EventCard';
import Hero from '../components/Hero';
import { useEvent } from '../context/EventContext'

const Home = () => {
  const{events,loading}=useEvent()
  
  if(loading){
    return <h1>Loading Events...</h1>;
  }
  
  return (
    <>
         {/* Hero Section */}

        <Hero/>

      {/* Upcoming Events */}
      

     <section className="mx-auto max-w-7xl px-6 py-20">
        

      

    <div className="mb-12 flex items-end justify-between">

        <div>

            <h2 className="text-4xl font-bold text-gray-900">
                Upcoming Events
            </h2>

            <p className="mt-3 text-gray-600">
                Explore the latest events happening around you.
            </p>

        </div>

    </div>

    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 ">

        {events.length!=0?events.slice(0,6).map((event) => (
            <EventCard
                key={event._id}
                event={event}
            />
        )):<h1 className='mt-[-40px] font-bold text-xl'>No Events found.</h1>}

    </div>

</section>
 
<CTA/>

      {/* Why Choose Us */}

      {/* Categories */}

      {/* Testimonials */}
    </>
  )
}

export default Home