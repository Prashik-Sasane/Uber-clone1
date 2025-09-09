const { validationResult } = require('express-validator');
const userModel = require('../models/user');
const userService = require("../services/user.service")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

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