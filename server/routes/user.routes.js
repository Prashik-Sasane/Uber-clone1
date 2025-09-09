const express = require('express')
const { body , validationResult} = require('express-validator')
const userModel = require('../models/user')
const bcrypt = require('bcrypt')
const router = express.Router();
const jwt = require('jsonwebtoken');
const usercontroller = require('../controller/usercontroller')

// router.get('/register' , (req , res) => {
//     res.render('register');
// })

router.post('/register' ,[
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({ min: 3}).withMessage('First name must be at least 3 characters long'),
    body('password').isLength({ min: 6}).withMessage('Password must be at least 3 characters long'),
    ],
    usercontroller.registerUser
    
)

router.post('/login', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({ min: 6}).withMessage('Password must be at least 3 characters long')
]
, usercontroller.loginUser

);

module.exports = router;