// Imports
const express = require('express');
const mainController = require('./controllers/mainController');

// Declarations
const router = express.Router();

// Routes
router.get('/machine/:zipCode',mainController.getByZipCode);

// Exporting
module.exports=router;