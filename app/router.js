// Imports
const express = require('express');
const mainController = require('./controllers/mainController');
const authController = require('./controllers/authController');

// Declarations
const router = express.Router();

// Routes
router.get('/machine/:zipCode',mainController.getByZipCode);
router.post('/signin/:pseudo',authController.loginAction);

// Exporting
module.exports=router;