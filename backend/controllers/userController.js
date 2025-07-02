import { response } from 'express';
import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

//generate a token

const generateToken = (userId) =>{
    return jwt.sign({id : userId} , process.env.JWT_SECRET , {expiresIn :'7d'})
}

export const registerUser = async (req,res) =>{
    try { 
        const {name,email,password} = req.body;
        //check if the user already exist or not

        const userExist = await User.findOne({email})
        if(userExist){
            return res.status(400).json({message : "User already Exist"})
        } 
        if(password.length < 8){
            return res.status(400).json({success : false , message : "Password must be atleast 8 characters"})
        }
        //hashing password
        const salt = await bcrypt.genSalt(10);  //Salt is a random string added to a password before hashing 
        const hashedpassword = await bcrypt.hash(password,salt); //creates a unique salt string for each password mixed both 
        
        //create a user
        const user = await User.create({
            name,
            email,
            password: hashedpassword
        })
        res.status(201).json({
            _id: user._id,
            name : user.name,
            email : user.email,
            token : generateToken(user._id)
        })
    } catch (error) {
        res.status(500).json({
            message :"Server error",
            error : error.message
        })
    }
}

//LOGIN FUNCTION

export const loginUser = async (req,res)=>{
    try {
        const {email,password} = req.body;
        const user = await User.findOne({email})
        if(!user){
            return res.status(500).json(
                {message : "Invalid Email or Password"}
            )
        }
        //compare the password

        const isMatch = await bcrypt.compare(password , user.password);
        if(!isMatch){
            res.status(500).json({
                message : "Invalid Email or Password"
            })
        }
        res.status(201).json({
            _id: user._id,
            name : user.name,
            email : user.email,
            token : generateToken(user._id)
        })

    } catch (error) {
        res.status(500).json({
            message :"Server error",
            error : error.message
        })
    }
}

//getuser profile function

export const getUserProfile = async (req,res)=>{
      try {
        const user = await User.findById(req.user.id).select("-password")
        if(!user){
            return res.status(404).json({
                message : "Use not found"
            })
        }
        res.json(user)
      } catch (error) {
        res.status(500).json({
            message :"Server error",
            error : error.message
        })
    } 
}


