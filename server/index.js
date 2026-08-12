import dotenv from "dotenv"
dotenv.config()
import express from "express"
import cors from "cors"
import connectDB from "./config/db.js"
import authRouter from "./routes/authRouter.js"
import eventRouter from "./routes/eventRouter.js"
import bookingRouter from "./routes/bookingRouter.js"

const app=express()
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://eventhub-mg.netlify.app"
  ]
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
// Routes
app.use("/api/auth",authRouter)
app.use("/api/events",eventRouter)
app.use("/api/bookings",bookingRouter)

const port=process.env.PORT || 5000

app.listen(port,()=>{
    console.log(`Server is running at ${port}`)
    connectDB()
})