import User from '../models/User.js';
import jwt from 'jsonwebtoken';

export const REGISTER_USER = async (req, res) => {
  try{
    const {name, email, password} = req.body;
    if(!name || !email || !password) {
      return res.status(400).json ({message: "All fields are required"});
    }

    const existingUser = await User.findOne({email});
    if(existingUser) {
      return res.status(409).json({message: "This email is already registered."})
    }

    const newUser = new User({name, email, password});
    const savedUser = await newUser.save();

    return res.status(201).json({
      message:"User registered succesfully.",
      user:{
        id:savedUser.id,
        name:savedUser.name,
        email:savedUser.email,
      },
    });
  }catch(error) {
    console.error("Registration error", error);
    res.status(500).json({message:"Server error during registration"});
  }
};



export const LOGIN_USER = async (req, res) => {
  try{
    const {email, password} = req.body;
    if(!email || !password){
      return res.status(400).json({message:"Email and password are required."});
    }

    const user = await User.findOne({email});
    if (!user) {
      return res.status(401).json({message:"Invalid email or password"});
    }

    const isMatch = await user.comparePassword(password);
    if(!isMatch){
      return res.status(401).json({message:"Invalid email or password"});
    } 

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET, 
      { expiresIn:"12h" }
    );
    res.status(200).json({
      message:"Login successful.", 
      token,})

  }catch(error) {
    console.error("Login erron:", error);
    res.status(500).json({message:"Server error during login."})

  }
};
