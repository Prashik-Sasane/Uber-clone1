const express = require('express')
const { body , validationResult} = require('express-validator')
const userModel = require('../models/user')
const bcrypt = require('bcrypt')
const router = express.Router();
const jwt = require('jsonwebtoken');
const usercontroller = require('../controller/usercontroller')
const authMiddleware = require('../middleware/auth.middleware')
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

router.get('/profile', authMiddleware.authUser, usercontroller.getProfile)
module.exports = router;