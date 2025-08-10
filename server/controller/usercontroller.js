const { validationResult } = require('express-validator');
const userModel = require('../models/user');
const userService = require("../services/user.service")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

module.exports.loginUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const user = await userService.FindUserByEmail(email);
    if (!user) {
        return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = user.generateAuthToken();
    res.status(200).json({ token, user });
}