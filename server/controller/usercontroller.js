const { validationResult } = require('express-validator');
const userModel = require('../models/user');
const userService = require("../services/user.service")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const blacklistTokenModel = require('../models/blacklistToken.model');

module.exports.registerUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const {fullname, email , password} = req.body;
    const hashedPassword = await userModel.hashPassword(password);
    const user = new userModel({
        email,
        password: hashedPassword,
        fullname
    });
    const token = user.generateAuthToken();
    res.status(201).json({ token, user });
}

module.exports.loginUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    const { email, password } = req.body;

    const user = await userModel.findOne({email}).select('+password');
    if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await user.comparePassword(password, user.password);
    if (!isMatch) {
        return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = user.generateAuthToken();
    res.status(201).json({ token, user });
}

module.exports.getProfile = async (req, res, next) => {
    // Assuming user is authenticated and user ID is available in req.userId    
    const userId = req.userId; // You need to set this value during authentication
    try {
        const user = await userModel.findById(userId).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

module.exports.logoutUser = async (req, res, next) => {
    res.clearCookie('token');
    const token = req.cookies.token || req.header('Authorization')?.replace('Bearer ', '');
    await blacklistTokenModel.create({ token });
    res.status(200).json({ message: 'Logged out successfully' });

    // Optionally, you can also blacklist the token here if you're using a token blacklist
    // const token = req.cookies.token || req.header('Authorization')?.replace('Bearer ', '');
        // await userService.blacklistToken(token);
}

