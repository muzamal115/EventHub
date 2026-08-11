import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { AdminBooking, Booking } from "../types/booking";
import api from "../utils/axios";

interface BookingProviderProps {
    children:ReactNode
}

interface BookingContextType{
loading:boolean,
bookings: Booking[],
allBookings: AdminBooking[]
fetchMyBookings: () => Promise<void>,
getAllBookings: () => Promise<void>
cancelBooking: (id: string) => Promise<void>
confirmBooking: (bookingId: string) => Promise<void>
}

const BookingContext=createContext<BookingContextType|null>(null)
export const useBooking=()=>{
    const context=useContext(BookingContext)
    if(!context){
         throw new Error("useBooking must be used within BookingProvider")
    }
    return context

}

 const BookingProvider=({children}:BookingProviderProps)=>{
    const[loading,setLoading]=useState(false)
    const[bookings,setBookings]=useState<Booking[]>([])
    const[allBookings,setAllBookings]=useState<AdminBooking[]>([])

const getAllBookings = async () => {
  setLoading(true);

  try {
    const { data } = await api.get< AdminBooking[]>("/bookings/all");

   

    setAllBookings(data);
  } catch (error) {
    console.error("Get all bookings error:", error);
    throw error;
  } finally {
    setLoading(false);
  }
};
    

    const fetchMyBookings=async()=>{
        setLoading(true)
        try {
            const {data}=await api.get('/bookings/my')
            
            setBookings(data)
              
            
        } catch (error) {
            throw error
        }finally{
            setLoading(false)
        }
    }
    useEffect(()=>{
        fetchMyBookings();
        
    },[])

    const confirmBooking=async(bookingId:string)=>{
    setLoading(true)
        try {
            await api.put(`/bookings/${bookingId}/confirm`,{
                paymentStatus:'paid'
            })
            setAllBookings((prev)=>prev.map((booking)=>booking._id===bookingId?{...booking,status:'confirmed',paymentStatus:'paid'}:booking))

        } catch (error) {
            console.log("Booking Confirmed error",error)
            throw error
        }finally{
            setLoading(false)
        }
    }

    const cancelBooking=async(bookingId:string)=>{

        try {
            
            setLoading(false)
            
            await api.delete( `/bookings/${bookingId}`)
              
            await fetchMyBookings()
        } catch (error:any) {
            console.error("Booking canceld:", error);
  
            throw error
        
        }finally{
            setLoading(false)
        }
    }
   
    const value:BookingContextType={
        loading,
        bookings,
        fetchMyBookings,
        cancelBooking,
        allBookings,
        getAllBookings,
        confirmBooking
    }
return <BookingContext.Provider value={value}>
     {children}
</BookingContext.Provider>

 }
 export default BookingProvider