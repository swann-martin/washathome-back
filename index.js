// Imports and dotenv config
require('dotenv').config();
const express = require('express')
const router = require('./app/router')

// Express app declaration
const app = express();

// Add prefix '/v1' to every routes
app.use('/v1',router);

// Port listening
const port = process.env.PORT || 8888;

app.listen(port, () => {
    console.log(`Server running : http://localhost:${port}`);
});