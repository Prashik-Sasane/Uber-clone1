const { validationResult } = require('express-validator');
const captainModel = require('../models/captain');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

module.exports.registerCaptain = async ( res , req , next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const {name , email , age , experience , vehicle} = req.body;
    const hashedPassword = await captainModel.hashPassword(password);
    const captain = new captainModel({
        name,
        email,
        password: hashedPassword,
        age,
        experience,
        vehicle
    });
    const token = captain.generateAuth();
    res.status(201).json({ token, captain });
}

module.exports.loginCaptain = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    const { email, password } = req.body;

    const Captain = await captainModel.findOne({email}).select('+password');
    if (!Captain) {
        return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await Captain.comparePassword(password, user.password);
    if (!isMatch) {
        return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = Captain.generateAuthToken();
    res.status(201).json({ token, user });
}

module.exports.getProfile = async (req, res, next) => {
    // Assuming user is authenticated and user ID is available in req.userId    
    const captainId = req.captainId; // You need to set this value during authentication
    try {
        const Captain = await captainModel.findById(captainId).select('-password');
        if (!Captain) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ Captain });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}


module.exports.logoutCaptain = async (req, res, next) => {
    res.clearCookie('token');
    const token = req.cookies.token || req.header('Authorization')?.replace('Bearer ', '');
    await blacklistTokenModel.create({ token });
    res.status(200).json({ message: 'Logged out successfully' });

    // Optionally, you can also blacklist the token here if you're using a token blacklist
    // const token = req.cookies.token || req.header('Authorization')?.replace('Bearer ', '');
        // await userService.blacklistToken(token);
}