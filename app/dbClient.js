// Imports
const {Client} = require('pg');
console.log(process.env.PG_URL)
// Create the client
let client = new Client(process.env.PG_URL);
if (process.env.NODE_ENV === "production") {
    client = new Client({
        connectionString: process.env.DATABASE_URL,
        // the server will not reject non-https requests to database
        ssl: {
            rejectUnauthorized: false
        }
    });
}

// Connection to the client
client.connect();

// Exports
module.exports = client;