const User = require('../Models/User')
const bcrypt = require('bcryptjs')
const express = require('express')
const fetchUser = require('../Middleware/auth.middleware')
const adminOnly = require('../Middleware/admin.middleware')
const router = express.Router()


router.get( "/getUsers",fetchUser,adminOnly, async(req,res)=>{
    try {
        const {page =1 , limit = 20 , search = ""} = req.query

        const query = {
            $or : [
                {name : {$regex : search , $options : "i"}},
                {email : {$regex : search , $options : "i"}}
            ]
        };

        const users = await User.find(query).skip((page-1)*limit).limit(Number(limit)).sort({createdAt:-1})

        const total = await User.countDocuments(query)
        res.json({users,total})

    } catch (error) {
        res.status(500).json({message:"Server error"})
    }
})


router.post("/createUser",fetchUser,adminOnly, async(req,res)=>{
    try {
        const {name , email ,password , status} = req.body 

        const hashPass = await bcrypt.hash(password,10)

        const user = await User.create({name , email , password:hashPass , status})
        res.status(200).json({message:"User created successfully",user})
    } catch (error) {
        res.status(500).json({message : "Server Error"})
    }
}
)

router.put("/updateUser/:id",fetchUser,adminOnly, async(req,res)=>{
    try {
        const user = await User.findByIdAndUpdate(req.params.id , req.body , {new :true})
        res.json(user)
    } catch (error) {
        res.status(500).json({message: "Server error"})
    }
})

router.delete( "/deleteUser/:id",fetchUser,adminOnly, async(req,res)=>{
    try {
        await User.findByIdAndDelete(req.params.id)
        res.json({message:"User deleted"})
    } catch (error) {
        res.status(500).json({message:"Server error"})
    }
}
)
router.get( "/getUserById/:id",fetchUser,adminOnly,async(req,res)=>{
    try {
        const user = await User.findById(req.params.id)
        res.json(user)
    } catch (error) {
        res.status(500).json({message:"Server Error"})
    }
})

module.exports = router