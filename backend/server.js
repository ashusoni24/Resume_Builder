
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import { connect } from 'mongoose';
import { connectDB } from './config/db.js';
import userRoutes from './routes/userRoutes.js';



import path from 'path'
import { fileURLToPath } from 'url';
import resumeRoutes from './routes/resumeRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 4000;

app.use(cors());

//connect to the db
connectDB();
//middlewares

app.use(express.json());


app.use('/api/auth' , userRoutes)
app.use('/api/resume', resumeRoutes);

//server uploads

app.use(
  '/uploads',
  express.static(path.join(__dirname, 'uploads'), {
    setHeaders: (res, _path) => {
      res.set('Access-Control-Allow-Origin','http://localhost:5173/' );
    },
  })
);

//routes
app.get("/" , (req , res)=>{
    res.send('API IS WORKING')
})
app.listen(PORT , ()=>{
    console.log(`Server Started on http://localhost:${PORT}`)
}) 