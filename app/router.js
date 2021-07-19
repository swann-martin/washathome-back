// Imports
const express = require('express');
const mainController = require('./controllers/mainController');

// Declarations
const router = express.Router();

// Routes
router.get('/',mainController.getAll);

// Exporting
module.exports=router;