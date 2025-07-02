import mongoose from "mongoose";
export const connectDB = async ()=>{
    await mongoose.connect('mongodb+srv://ashu:NtX2uLzrNCmz8ZB6@cluster0.y1lim1n.mongodb.net/RESUME')
    .then(()=>{
        console.log("DB connected")
    })
}