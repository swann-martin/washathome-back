// Imports
const express = require('express');
const mainController = require('./controllers/mainController');
const authController = require('./controllers/authController');
const bookController = require('./controllers/bookController');
const authMiddleware = require('./middlewares/authMiddleware')
const geocodingZipCode = require('./middlewares/geocodingZipCode')
const uploadMiddleware = require('./middlewares/uploadMiddleware/uploadMiddleware')
const multer = require('multer')
const upload = multer({dest: __dirname +'middlewares/uploadMiddleware//uploads/'})

// Router declaration
const router = express.Router();

// Routes

// CRUD machines
router.get('/search/:zipCode',mainController.getByZipCode); // Search all the machines by zip code in the dynamic URL
router.get('/searchall',mainController.getAll); // Send all the machines
router.get('/machine/:id',mainController.getById); // Search all the machines by the id in the dynamic URL
router.post('/machine',authMiddleware,geocodingZipCode,mainController.submitAction); // Add a new machine
router.patch('/machine',authMiddleware,geocodingZipCode,mainController.updateAction); // Modify a machine
router.delete('/machine/:id',authMiddleware,mainController.deleteAction); // Delete a machine
// CRUD users
router.post('/login',authController.loginAction); // Login route
router.get('/autologin',authMiddleware,authController.autoLogin); // Auto login route
router.post('/signup',upload.single('image'),authController.signupAction); // Signup route
router.patch('/account',authMiddleware,authController.updateAction); // Modify an user
router.delete('/account',authMiddleware,authController.deleteAction); // Delete an user
router.patch('/password',authMiddleware,authController.passUpdate) // Update the password
// CRUD reservations
router.get('/reservation',authMiddleware,bookController.getByUser); // Send all the reservations by user id
router.post('/reservation',authMiddleware,bookController.submitAction); // Add a new reservation
router.get('/reservation/:id/:statusId',authMiddleware,bookController.stateAction); // Change the state of a reservation
router.delete('/reservation/:id',authMiddleware,bookController.deleteAction); // Delete a reservation

// Exporting
module.exports=router;