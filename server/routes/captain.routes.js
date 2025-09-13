const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router();
const captaincontroller = require('../controller/captaincontroller');
const authMiddleware = require('../middleware/auth.middleware')
const {body , validationResult} = require('express-validator');

router.post('/register' , [
    body('name').isLength({ min: 3}).withMessage('Name must be at least 3 characters long'),
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({ min: 6}).withMessage('Password must be at least 3 characters long'),
    body('age').isInt({ min: 18}).withMessage('Age must be at least 18'),
    body('experience').isInt({ min: 0}).withMessage('Experience must be a non-negative number'),
    body('rank').notEmpty().withMessage('Rank is required'),
    body('vehicle.color').notEmpty().withMessage('Vehicle color is required'),
    body('vehicle.plate').notEmpty().withMessage('Vehicle plate is required'),
    body('vehicle.model').notEmpty().withMessage('Vehicle model is required'),
    body('vehicle.vechicleType').isIn(['car', 'bike', 'auto']).withMessage('Vehicle type must be car, bike, or auto'),
]
, captaincontroller.registerCaptain)

router.post('/login', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({ min: 6}).withMessage('Password must be at least 3 characters long')
], captaincontroller.loginCaptain)

router.get('/profile', authMiddleware.authCaptain, captaincontroller.getProfile)
router.get('/logout', authMiddleware.authCaptain, captaincontroller.logoutUser)
