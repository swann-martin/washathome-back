// Imports
const express = require('express');
const mainController = require('./controllers/mainController');
const authController = require('./controllers/authController');
const auth = require('./middleware/auth')

// Declarations
const router = express.Router();

// Routes
router.get('/machine/:zipCode',mainController.getByZipCode);
router.post('/login',authController.loginAction);

// Exporting
module.exports=router;