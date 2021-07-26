// Imports
const express = require('express');
const mainController = require('./controllers/mainController');
const authController = require('./controllers/authController');
const authMiddleware = require('./middleware/authMiddleware')

// Declarations
const router = express.Router();

// Routes
router.get('/search/:zipCode',mainController.getByZipCode); // Search all the machines by postal code in the dynamic URL
router.post('/login',authController.loginAction); // Login route
router.post('/signup',authController.signupAction); // Signup route
router.post('/delete',authController.deleteAction); // Delete an user

// Exporting
module.exports=router;