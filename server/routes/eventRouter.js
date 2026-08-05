
import express from 'express'
import authMiddleware from '../middleware/authMiddleware.js'
import adminMiddlware from '../middleware/adminMiddleware.js'
import { createEvent, deleteEvent, getAllEvents, getEventById, updateEvent } from '../controllers/eventController.js'


const eventRouter=express.Router()

// Get all events
eventRouter.get('/',authMiddleware,getAllEvents)

//Get event by id
eventRouter.get('/:id',authMiddleware,getEventById)

//Create Event (admin only)
eventRouter.post('/',authMiddleware,adminMiddlware,createEvent)

//Update Event (admin only)
eventRouter.put('/:id',authMiddleware,adminMiddlware,updateEvent)

//Delete Event (admin only)
eventRouter.delete('/:id',authMiddleware,adminMiddlware,deleteEvent)

export default eventRouter  