import mongoose from "mongoose"

const connectDB=async()=>{
try {
    await mongoose.connect(process.env. MONGODB_URI)
    console.log("db connected")
} catch (error) {
    console.log("Connecting error", error)
}
}
export default connectDB