import Booking from "../models/Booking.js"
import Event from "../models/Event.js"
import OTP from "../models/OTP.js"
import {sendBookingRequestEmail ,sendBookingConfirmationEmail, sendEmail} from "../utils/sendEmail.js"


const generateOtp=()=>{
    
   return Math.floor(100000+Math.random()*900000).toString()
  }

  //send otp
  export const sendBookingOtp=async(req,res)=>{
 
    try {

         const otp=generateOtp()
await OTP.deleteMany({email:req.user.email,action:'event-booking'})
await OTP.create({email:req.user.email,otp,action:"event-booking"})
await sendEmail(req.user.email,otp,'event-booking')
res.json({message:"OTP sent successfully to your email"})
        
    } catch (error) {
        return res.status(500).json({error:error.message})
    }
   
  }


  // Booking event
export const bookEvent=async(req,res)=>{

    try {
        const{eventId,otp}=req.body
const otpRecord=await OTP.findOne({email:req.user.email,otp,action:'event-booking'})

if(!otpRecord){
    return res.status(400).json({error:"Invalid or exprired OTP"})
}

const event=await Event.findById(eventId)
if(!event){
    return res.status(404).json({error:"Event not found"})
}

if(event.availableSeats <=0){
    return res.status(400).json({error:"No seats available"})
}

const existingBooking=await Booking.findOne({userId:req.user._id,eventId})

if(existingBooking){
    return res.status(400).json({error:"You have already booked this event"})
}

const booking=await Booking.create({
    userId:req.user._id,
    eventId:eventId,
    amount:event.ticketPrice
})

await OTP.deleteMany({email:req.user.email,action:'event-booking' })
await sendBookingRequestEmail (req.user.email,event.title,booking._id)
return res.status(201).json({message:"Booking created. Please check your email for confirmation",booking})
        
    } catch (error) {
        return res.status(500).json({error:error.message})
    }


}

export const getMyBookings=async(req,res)=>{

    try {
        const bookings=await Booking.find({userId:req.user._id}).populate("eventId").sort({ createdAt: -1 });
        res.json(bookings)
    } catch (error) {
         return res.status(500).json({error:error.message})
    }
    
}
export const confirmBooking=async(req,res)=>{

try {
    const paymentStatus=req.body.paymentStatus
    if(paymentStatus && ![ 'paid','non-paid'].includes(paymentStatus)){
      return  res.status(400).json({error:"Invalid payment status"})
    }
    const booking=await Booking.findById(req.params.id).populate('eventId').populate("userId");
    if(!booking){
        return res.status(400).json({error:"Event not found"})
    }
    if(booking.status==='confirmed'){
        return res.status(400).json({error:"Booking is already confirmed"})
    }
    const event= await Event.findById(booking.eventId._id)
    if(event.availableSeats<=0){
        return res.status(400).json({error:'No seats available'})
    }
booking.status="confirmed";
if(paymentStatus){
booking.paymentStatus=paymentStatus
}


await  booking.save()
event.availableSeats -=1
await event.save()
await sendBookingConfirmationEmail(booking.userId.email,event.title,booking._id)

return res.status(200).json({message:"Booking confirmed"})
    
} catch (error) {
    return res.status(500).json({error:error.message})
}

}
export const cancelBooking=async(req,res)=>{

    try {
            const booking=await Booking.findById(req.params.id).populate("eventId")
    if(!booking){
        return res.status(400).json({error:"Booking not found"})
    }
    
    if(booking.userId.toString()!==req.user._id.toString()){
        return res.status(403).json({error:"Unauthorized"})
    }
    
      // Already cancelled
    if (booking.status === "cancelled") {
      return res.status(400).json({
        error: "Booking is already cancelled",
      });
    }
     // Check previous status BEFORE changing it
    const wasConfirmed = booking.status === "confirmed";

    booking.status='cancelled',
    booking.save()
    if(wasConfirmed){
        const event=await Event.findById(booking.eventId._id)
         event.availableSeats += 1;
       await event.save()
    }
//    await booking.deleteOne();
    return res.status(200).json({message:"Booking cancelled"})

    } catch (error) {
        return res.status(500).json({error:error.message})
    }



}

export const getAllBookings=async(req,res)=>{

    try {
        const bookings=await Booking.find().populate("userId","name email").populate("eventId").sort({createdAt:-1});
        return res.status(200).json(bookings)
    
        
    } catch (error) {
         return res.status(500).json({
            error:error.message
         })
    }
}