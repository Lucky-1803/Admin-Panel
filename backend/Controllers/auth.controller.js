const User = require ('../Models/User')
const jwt = require ('jsonwebtoken')
const bcrypt = require('bcryptjs')
const express = require('express')
const router = express.Router()


const genrateToken =(id , role)=>{
    return jwt.sign({id,role}, process.env.JWT_SECRET,{expiresIn:"7d"})
}

// Register User 


router.post("/registerUser", async(req,res)=>{
    try {
        const {name , email, password} = req.body

        const existingUser = await User.findOne({email})
        if(existingUser){
            return res.status(400).json({message:"User already exists"})
        }

        const hashedPass = await bcrypt.hash(password,10)
        
        const user = await User.create({name,email, password:hashedPass})
        res.status(201).json({message:"User created successfully!"})
    } catch (error) {
        res.status(500).json({message:"Server Error"})
    }
})

// Login User 


router.post("/loginUser", async(req,res)=>{
    try {
        const {email , password} = req.body

        console.log("EMAIL:", email);
        console.log("PASSWORD ENTERED:", password);

        const user = await User.findOne({email})
        console.log("USER FOUND:", user);

        if(!user){
            return res.status(400).json({message:"Invalid credentials !"})
        }

        console.log("DB PASSWORD:", user.password);

        const matchPass = await bcrypt.compare(password , user.password)
        console.log("PASSWORD MATCH:", matchPass);

        if(!matchPass){
           return res.status(400).json({message:"Invalid Password !"})
        }

        const token = genrateToken(user._id , user.role)
        res.status(200).json({message:"Log In successfully!" , token})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({message :"Server Error"})
    }
})

module.exports= router