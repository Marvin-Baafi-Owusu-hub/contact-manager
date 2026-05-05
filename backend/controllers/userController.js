const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');  
const User = require("../models/userModel");

//@routes POST /api/users/register
const registerUser = asyncHandler(async(req, res) => {
    const {username, email, password} = req.body;
    if(!username || !email || !password) {
        res.status(400);
        throw new Error("Please add all the fields");
    }
    const userAvailable = await User.findOne({email});
    if(userAvailable) {
        res.status(400);
        throw new Error("User already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("hashed Password", hashedPassword)  ;
    const user = await User.create({
        username,
        email,
        password: hashedPassword
    });
    console.log(`User created ${user}`);
    if(user){
        res.status(201).json({_id: user.id, email: user.email});
    } else{
        res.status(400);
        throw new Error("Invalid user data");
    }
});

//@routes POST /api/users/login
const loginUser = asyncHandler(async(req, res) => {
        const {email, password} = req.body;
        if(!email || !password) {
            res.status(400);
            throw new Error("Please add all the fields");
        }
        const user = await User.findOne({email});
        // compare password with hashed password
        if(user && (await bcrypt.compare(password, user.password))){
            const accessToken = jwt.sign({
                user: { 
                    _id: user._id,
                    email: user.email,
                    username: user.username
                },
            }, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "1d"});
            res.status(200).json({accessToken});
        } else {
            res.status(401);
            throw new Error("Email or password is not valid");
        }

});

//@routes GET /api/users/current
const getCurrentUser = asyncHandler(async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await User.findById(req.user._id).select('-password');
    return res.status(200).json(user);
});

module.exports = {registerUser, loginUser, getCurrentUser};