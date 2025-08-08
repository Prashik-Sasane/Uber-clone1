const userModel = require('../models/user');
const userService = require("../services/user.service")

module.exports.registerUser =  async( req , res) => {
    try {
        const user = await userService.CreateUser(req.body)
        res.status(201).json(user)
    }
    catch(err) {
        res.status(400).json({ message: err.message})
    }
}