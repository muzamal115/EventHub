import Event from "../models/Event.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

export const getAllEvents = async (req, res) => {
  try {
    const filters = {};
    if (req.query.category) {
      filters.category = req.query.category;
    }
    if (req.query.ticketPrice) {
      filters.ticketPrice = Number(req.query.ticketPrice);
    }

    const events = await Event.find(filters).sort({ createdAt: -1 });

    return res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }
    return res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createEvent = async (req, res) => {
 
  try {
    const {
      title,
      description,
      date,
      location,
      category,
      totalSeats,
      availableSeats,
      ticketPrice,
    } = req.body;
    if (!req.file) {
      return res.status(400).json({
        message: " Image is required",
      });
    }

   

    if (
      !title ||
      !description ||
      !date ||
      !location ||
      !category ||
      !totalSeats ||
      !availableSeats ||
      !ticketPrice 
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }
 
     const imageUrl = await uploadOnCloudinary(req.file.path);
     if(!imageUrl){
         return res.status(500).json({
        error: "Image upload failed",
      });
     }

    const event = await Event.create({
      title,
      description,
      date,
      location,
      category,
      totalSeats,
      availableSeats,
      ticketPrice,
      imageUrl,
      createdBy: req.user._id,
    });

    return res
      .status(201)
      .json({ message: "Event created successfully", event });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const event=await Event.findById(req.params.id)
     if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }
    const {
      title,
      description,
      date,
      location,
      category,
      totalSeats,
      availableSeats,
      ticketPrice,
    } = req.body;
  
    let imageUrl=event.imageUrl;
    if(req.file){
        const newImageUrl= await uploadOnCloudinary(req.file.path);
        if(!newImageUrl){
             return res.status(500).json({
          error: "Image upload failed",
        });
        }
       imageUrl=newImageUrl
    }
    

    event.title = title;
    event.description = description;
    event.date = date;
    event.location = location;
    event.category = category;
    event.totalSeats = totalSeats;
    event.availableSeats = availableSeats;
    event.ticketPrice = ticketPrice;
    event.imageUrl = imageUrl;

    await event.save();
   

    return res
      .status(200)
      .json({ message: "Event updated successfully", event });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }
    return res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
