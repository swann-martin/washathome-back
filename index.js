// Imports
const express = require('express')
const router = require('./app/router')

// Dotenv import and declaration
require('dotenv').config();
const port = process.env.PORT || 8888;

// Express app declaration
const app = express();

// Router
app.use('/v1',router);

// Port listening
app.listen(port, () => {
    console.log(`Server running : http://localhost:${port}`);
});