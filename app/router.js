// Imports
const express = require('express');
const mainController = require('./controllers/mainController');
const authController = require('./controllers/authController');
const authMiddleware = require('./middleware/authMiddleware')

// Declarations
const router = express.Router();

// Routes
router.get('/searchall',mainController.getAll); // Send all the machines
router.get('/search/:zipCode',mainController.getByZipCode); // Search all the machines by zip code in the dynamic URL
router.post('/machine',mainController.submitAction); // Add a new machine
router.delete('/machine/:id',mainController.deleteAction); // Delete a machine
router.post('/login',authController.loginAction); // Login route
router.post('/signup',authController.signupAction); // Signup route
router.delete('/account/:pseudo',authController.deleteAction); // Delete an user

// Exporting
module.exports=router;