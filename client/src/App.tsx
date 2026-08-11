
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'

import Events from "./pages/Events";
import EventDetails from "./pages/EventDetails";
import MyBookings from "./pages/MyBookings";

import NotFound from "./pages/NotFound";

import VerifyBooking from './pages/VerifyBooking'
import AdminEvents from './pages/AdminEvent'
import EventForm from './pages/EventForm'
import PublicLayout from './layouts/PublicLayout'
import AdminLayout from './layouts/AdminLayout';
import ProtectedRoute from './components/ProtectedRoute';
import AdminDashboard from './pages/AdminDashboard';
import AdminBookings from './pages/AdminBookings';
import VerifyOTP from './pages/VerifyOTP';


const App = () => {
  return (
   <Routes>

    {/* Auth Route */}

    <Route path='/login' element={<Login/>}/>
    <Route path='/register' element={<Register/>}/>
    <Route path='/verify-otp' element={<VerifyOTP/>}/>
{/* Public Layout*/}

<Route element={<PublicLayout/>}>
    <Route path='/' element={<Home/>}/>
    <Route path="/events" element={<Events />} />   
     <Route path="/events/:id" element={<EventDetails />} />
      
   
{/* User Protected Routes */}
<Route element={<ProtectedRoute allowedRole='user'/>}>
    <Route path="/my-bookings" element={<MyBookings />} />
    <Route path='events/:id/verify-booking' element={<VerifyBooking/>}/>
  
</Route>  

</Route>

 {/* Admin Protected Routes      */}

 <Route element={<ProtectedRoute allowedRole="admin"/> }>
   <Route element={<AdminLayout/>}>
       <Route path='/admin' element={<AdminDashboard/>}/>
      <Route path='/admin/events' element={<AdminEvents/>}/>
      <Route
        path="/admin/events/create"
         element={<EventForm />}
        />
      <Route
          path="/admin/events/edit/:id"
          element={<EventForm />}
        />
        <Route path='/admin/bookings' element={<AdminBookings/>}/>
   </Route>      
</Route>
{/* Not Found */}

    <Route path="*" element={<NotFound />} />

   </Routes>    
  )
}

export default App