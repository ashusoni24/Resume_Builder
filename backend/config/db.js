import mongoose from "mongoose";
export const connectDB = async ()=>{
    await mongoose.connect('Your db link')
    .then(()=>{
        console.log("DB connected")
    })
}