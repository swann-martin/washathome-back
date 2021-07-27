// Imports and dotenv config
require('dotenv').config();
const express = require('express');
const morganBody = require('morgan-body')
const cors = require ("cors");

// Express app declaration and routing
const app = express();
const router = require('./app/router')

// Decode POST data, allow CORS and log every requests
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(cors());
morganBody(app);


// Add prefix '/v1' to every routes
app.use('/v1',router);

// Port assignation and listening
const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Server running : http://localhost:${port}`);
});