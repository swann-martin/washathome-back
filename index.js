// Imports and dotenv config
require('dotenv').config();
const express = require('express');
const jwt = require ('jsonwebtoken');
const bcrypt = require ('bcrypt');
const cors = require ("cors");
const router = require('./app/router')

// Express app declaration
const app = express();

// Cross-origin resource sharing   
app.use(cors());

// Decode POST data
app.use(express.urlencoded({ extended: true }))
app.use(express.json());

//access config 
process.env.TOKEN_SECRET;

// Add prefix '/v1' to every routes
app.use('/v1',router);

// Port listening
const port = process.env.PORT || 8888;

app.listen(port, () => {
    console.log(`Server running : http://localhost:${port}`);
});