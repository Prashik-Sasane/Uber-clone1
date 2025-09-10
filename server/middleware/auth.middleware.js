const userModel = require('../models/user')
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser')
const bcrypt = require('bcrypt')

module.exports.authUser = async(req , res, next) =>{
    const token = req.cookies.token || req.header('Authorization')?.replace('Bearer ', '');
    if(!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    const isBlacklisted = await userModel.findOne({ token: token });
    
    if (isBlacklisted) {
        return res.status(401).json({ message: 'Token has been blacklisted. Please log in again.' });
    }
    try {
        const decoded = jwt.verify(token , process.env.JWT_SECRET);
        req.userId = decoded._id;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
}