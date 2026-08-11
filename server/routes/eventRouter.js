
import express from 'express'
import authMiddleware from '../middleware/authMiddleware.js'
import adminMiddlware from '../middleware/adminMiddleware.js'
import { createEvent, deleteEvent, getAllEvents, getEventById, updateEvent } from '../controllers/eventController.js'
import upload from '../middleware/multer.js'


const eventRouter=express.Router()

// Get all events
eventRouter.get('/',getAllEvents)



//Get event by id
eventRouter.get('/:id',getEventById)

//Create Event (admin only)
eventRouter.post('/',authMiddleware,adminMiddlware, upload.single("image"),createEvent)

//Update Event (admin only)
eventRouter.put('/:id',authMiddleware,adminMiddlware,upload.single("image"),updateEvent)

//Delete Event (admin only)
eventRouter.delete('/:id',authMiddleware,adminMiddlware,deleteEvent)

export default eventRouter  