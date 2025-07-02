import express from 'express';
import cors from 'cors';
import { configDotenv } from "dotenv";
import { connect } from 'mongoose';
import { connectDB } from './config/db.js';


const app = express();
const PORT = 4000;

app.use(cors());

//connect to the db
connectDB();
//middlewares

app.use(express.json());

app.get("/" , (req , res)=>{
    res.send('API IS WORKING')
})
app.listen(PORT , ()=>{
    console.log(`Server Started on http://localhost:${PORT}`)
})