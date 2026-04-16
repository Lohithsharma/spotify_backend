const userModel=require('../models/user.model')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
async function registerUser(req,res){
    const { username, email, password, role="user" } = req.body
    const isUserRegistered = await userModel.findOne({
        $or:[
            {username},
            {email}
        ]
    }) 
    if(isUserRegistered){
        return res.status(409).json({message:"user already exists"})
    }

    const hash=await bcrypt.hash(password,10); 

    const user=await userModel.create({
        username,
        email,
        password:hash,
        role
    })


    const token=jwt.sign({
        id:user._id,
        role:user.role,
    },process.env.JWT_SECRET)

    res.cookie("token",token)

    res.status(201).json({
        message:"User registered successfully",
        user:{
            id:user._id,
            username:user.username,
            email:user.email,
            role:user.role,
        }
    })
}

async function loginUser(req,res){
    const { username,email,password }=req.body
    const user=await userModel.findOne({
        $or:[
            {username},
            {email}
        ]
    })
    if(!user){
        return res.status(401).json({message:"invalid credentials"})
    }

    const ispasswordvalid=await bcrypt.compare(password,user.password)
    if(!ispasswordvalid){
        return res.status(401).json({message:"invalid credentials"})
    }

    const token=jwt.sign({
        id:user._id,
        role:user.role
    },process.env.JWT_SECRET)

    res.cookie("token",token)

    res.status(200).json({
        message:"User logged in successfully",
        user:{
            id:user._id,
            username:user.username,
            email:user.email,
            role:user.role
        }
    })
}

async function logoutUser(req,res){
    res.clearCookie("token")
    res.status(200).json({
        message:"User loggedout successfully"
    })

}
module.exports={ registerUser,loginUser,logoutUser }