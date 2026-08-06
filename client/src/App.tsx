
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import VerifyOTP from './pages/VerifyOTP'
import Events from "./pages/Events";
import EventDetails from "./pages/EventDetails";
import MyBookings from "./pages/MyBookings";
import Dashboard from "./pages/Dashboard";
import CreateEvent from "./pages/CreateEvent";
import EditEvent from "./pages/EditEvent";
import NotFound from "./pages/NotFound";

const App = () => {
  return (
   <Routes>
    <Route path='/' element={<Home/>}/>

    <Route path='/login' element={<Login/>}/>

    <Route path='/register' element={<Register/>}/>

    <Route path='/verify-otp' element={<VerifyOTP/>}/>

    <Route path="/events" element={<Events />} />

    <Route path="/events/:id" element={<EventDetails />} />

    <Route path="/my-bookings" element={<MyBookings />} />

    <Route path="/dashboard" element={<Dashboard />} />

    <Route path="/dashboard/create-event" element={<CreateEvent />} />

    <Route path="/dashboard/edit-event/:id" element={<EditEvent />} />

    <Route path="*" element={<NotFound />} />

   </Routes>  
  )
}

export default App