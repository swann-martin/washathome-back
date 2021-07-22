// Imports
const express = require('express');
const mainController = require('./controllers/mainController');
const authController = require('./controllers/authController');
const authMiddleware = require('./middleware/authMiddleware')

// Declarations
const router = express.Router();

// Routes
router.get('/search/:zipCode',authMiddleware,mainController.getByZipCode);
router.post('/login',authController.loginAction);

// Exporting
module.exports=router;