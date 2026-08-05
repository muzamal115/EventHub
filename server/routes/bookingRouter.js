import express from 'express'
import authMiddleware from '../middleware/authMiddleware.js'
import adminMiddlware from '../middleware/adminMiddleware.js'
import { bookEvent, sendBookingOtp, getMyBookings, confirmBooking, cancelBooking } from '../controllers/bookingController.js'


const bookingRouter=express.Router()

bookingRouter.post('/',authMiddleware,bookEvent)
bookingRouter.post('/send-otp',authMiddleware,sendBookingOtp)
bookingRouter.get('/my',authMiddleware,getMyBookings)
bookingRouter.put('/:id/confirm',authMiddleware,adminMiddlware,confirmBooking);
bookingRouter.delete('/:id',authMiddleware,cancelBooking)


export default bookingRouter