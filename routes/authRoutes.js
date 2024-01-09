const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');
const UserController = require('../controllers/UserController');

// Register a new user
router.post('/register', AuthController.registerUser);
router.post('/login', AuthController.loginUser);

// Forget Password
router.post('/forget-password', UserController.forgetPassword);

// Reset Password
router.post('/reset-password/:token', UserController.resetPassword);


module.exports = router;
