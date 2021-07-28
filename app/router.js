// Imports
const express = require('express');
const mainController = require('./controllers/mainController');
const authController = require('./controllers/authController');
const bookController = require('./controllers/bookController');
const authMiddleware = require('./middleware/authMiddleware')
const geocoding = require('./middleware/geocoding')

// Declarations
const router = express.Router();

// Routes

// CRUD machines
router.get('/search/:zipCode',mainController.getByZipCode); // Search all the machines by zip code in the dynamic URL
router.get('/searchall',mainController.getAll); // Send all the machines
router.get('/machine/:id',mainController.getById); // Search all the machines by the id in the dynamic URL
router.post('/machine',authMiddleware,geocoding,mainController.submitAction); // Add a new machine
router.delete('/machine/:id',authMiddleware,mainController.deleteAction); // Delete a machine
// CRUD users
router.post('/login',authController.loginAction); // Login route
router.post('/signup',authController.signupAction); // Signup route
router.delete('/account/:pseudo',authMiddleware,authController.deleteAction); // Delete an user
// CRUD reservations
router.get('/reservation/:userId',bookController.getByUser); // Send all the reservations by user id
router.post('/reservation',authMiddleware,bookController.submitAction); // Add a new reservation
router.delete('/reservation/:id',bookController.deleteAction); // Delete a reservation

// Exporting
module.exports=router;