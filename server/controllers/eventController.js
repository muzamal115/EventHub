import Event from "../models/Event.js"

export const getAllEvents=async(req,res)=>{

     try {
        const filters={}
    if(req.query.category){
        filters.category=req.query.category
    }
    if(req.query.ticketPrice){
        filters.ticketPrice=Number(req.query.ticketPrice)
    }

   const events= await Event.find(filters).sort({ createdAt: -1 })

   return res.status(200).json(events)
    
   } catch (error) {
    res.status(500).json({error:error.message})
   }
    
}

export const getEventById=async(req,res)=>{

    try {
        const event=await Event.findById(req.params.id)
        if(!event){
            return res.status(404).json({error:"Event not found"})
        }
        return res.status(200).json(event)
        
    } catch (error) {
        
        res.status(500).json({error:error.message})
    }
}

export const createEvent=async(req,res)=>{

    try {
        const {title,description,date,location,category,totalSeats, availableSeats, ticketPrice, imageUrl}=req.body

        if(!title || !description || !date || !location || !category || !totalSeats || ! availableSeats || !ticketPrice || !imageUrl){
            return res.status(400).json({error:"All fields are required"})
        }

        const event=await Event.create({
            title,
            description,
            date,
            location,
            category,
            totalSeats,
            availableSeats,
            ticketPrice, 
            imageUrl,
            createdBy: req.user._id
        })

        return res.status(201).json({message:"Event created successfully",event})
        
    } catch (error) {
         res.status(500).json({error:error.message})
    }
}

export const updateEvent=async(req,res)=>{

    try {
        const {title,description,date,location,category,totalSeats, availableSeats, ticketPrice, imageUrl}=req.body
        const event=await Event.findByIdAndUpdate(req.params.id,{
            title,
            description,
            date,
            location,
            category,
            totalSeats,
            availableSeats,
            ticketPrice, 
            imageUrl,
        },{new:true,runValidators: true})
        if(!event){
            return res.status(404).json({error:"Event not found"})
        }

        return res.status(200).json({message:"Event updated successfully",event})

    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

export const deleteEvent=async(req,res)=>{

    try {
        const event=await Event.findByIdAndDelete(req.params.id)
        if(!event){
            return res.status(404).json({error:"Event not found"})
        }
        return res.status(200).json({message:"Event deleted successfully"})
        
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}