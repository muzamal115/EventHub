
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import AuthProvider from './context/AuthContext.tsx'
import { BrowserRouter } from 'react-router-dom'
import EventProvider from './context/EventContext.tsx'
import BookingProvider from './context/BookingContext.tsx'

createRoot(document.getElementById('root')!).render(
  
  <BrowserRouter>
    <AuthProvider>
      <EventProvider>
        <BookingProvider>
    <App />
    </BookingProvider>
    </EventProvider>
    </AuthProvider>
 </BrowserRouter>
)
