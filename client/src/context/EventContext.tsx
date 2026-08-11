import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import api from "../utils/axios";
import type { Event } from "../types/event";
import type { EventFormData } from "../schemas/eventSchema";



interface EventProviderProps {
    children:ReactNode;
}
interface EventResponse {
    message:string,
    event:Event
}
interface EventContextType {
     fetchEvents: () => Promise<Event[]>,
     loading: boolean,
      events: Event[], 
      createEvent: (eventData:EventFormData) => Promise<Event>,
      updateEvent: (eventId:string,eventData:EventFormData) => Promise<Event>,
      deleteEvent: (eventId: string) => Promise<void>
}
const EventContext=createContext<EventContextType|null>(null)

export const useEvent=()=>{
    const context=useContext(EventContext)
    
    if(!context){
        throw new Error("useEvent must be used within EventProvider")
    }
    return context
}


 const EventProvider=({children}:EventProviderProps)=>{

    const[events,setEvents]=useState<Event[]>([])
    const[loading,setLoading]=useState(false)
    const fetchEvents=async()=>{
        
     setLoading(true)
        try {
            
         const {data}= await  api.get<Event[]>('/events')
         setEvents(data)
        
         return data

        } catch (error) {
          throw error;
        }finally{
            setLoading(false)
        }
    }

   
  // Create new event

  const createEvent= async(eventData:EventFormData)=>{
   
    try {
    
        const formData=new FormData()
    formData.append("title", eventData.title);
    formData.append("description", eventData.description);
    formData.append("date", eventData.date);
    formData.append("location", eventData.location);
    formData.append("category", eventData.category);
    formData.append("totalSeats", String(eventData.totalSeats));
    formData.append("availableSeats", String(eventData.availableSeats));
    formData.append("ticketPrice", String(eventData.ticketPrice));
    if(eventData.image){
        
           formData.append("image", eventData.image);
    }
  
  
        const{data}=await api.post<EventResponse>('/events/',formData)

setEvents((prev)=>[data.event,...prev])
return data.event
        
    } catch (error) {
       
        throw error
    }


  }

  //Update event

  const updateEvent=async(eventId:string,eventData:EventFormData)=>{
    try {
        const formData=new FormData()
    formData.append("title", eventData.title);
    formData.append("description", eventData.description);
    formData.append("date", eventData.date);
    formData.append("location", eventData.location);
    formData.append("category", eventData.category);
    formData.append("totalSeats", String(eventData.totalSeats));
    formData.append("availableSeats", String(eventData.availableSeats));
    formData.append("ticketPrice", String(eventData.ticketPrice));

    if (eventData.image) {
        
      formData.append("image", eventData.image);
    }

        const{data} =await api.put<EventResponse>(`/events/${eventId}`,formData)
        setEvents((prev)=>prev.map((item)=>item._id===eventId?data.event:item))
        return data.event

    } catch (error) {
         throw error
    }
  }

  // Delete Event

  const deleteEvent=async(eventId:string)=>{

    try {
        
        await api.delete(`/events/${eventId}`)
        setEvents((prev)=>prev.filter((item)=>item._id!==eventId))

    } catch (error) {
        throw error
    }
    
  }


   useEffect(()=>{
        fetchEvents()
    },[])

 const value:EventContextType={
        fetchEvents,
        loading,
        events,
        createEvent,
        updateEvent,
        deleteEvent
     
    }
  return <EventContext.Provider value={value}>
    {children}
   </EventContext.Provider>
 }
 export default EventProvider