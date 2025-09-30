const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../MODELS/User');

const router = express.Router();

//Register
router.post('/register',async (req,res) => {
    try{
    const {userName,password,email} = req.body;

    const exists = await User.findOne({email})
    if(exists) return res.status(400).json({message:'user already exists'});

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User( {
        userName,
        email,
        password:hashedPassword
    })
    await user.save();

    res.status(201).json({message:'User created successfully'});
   } catch(err){
    res.status(500).json({message:err.message});
   }
});

//login
router.post('/login',async (req,res) => {
     console.log("Request body:", req.body); // بررسی اینکه دیتا میاد یا نه
    try{
        const {email,password} = req.body;

        const user = await User.findOne({email});
        if(!user) return res.status(400).json({message:'invalid email'});

        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch) return res.status(400).json({message:'invalid password'});

        const token = jwt.sign(
            {id: user._id},
            process.env.JWT_SECRET,
            {expiresIn: '1h'}
        )

        res.json({token,user:{id:user._id,username:user.username,email:user.email}})

    }catch(err){
        res.status(500).json({message:err.message})
    }
})

module.exports = router;