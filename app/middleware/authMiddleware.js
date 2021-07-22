//Imports
const jwt = require('jsonwebtoken');

// Middleware object exported
module.exports = function (req,res,next){

  // Keep the first part of the token in the header
  const token = req.headers.authorization.split(' ')[0]

  // Check token existence
  if (token == null) {return res.sendStatus(401)}

  // Verify concordance with passphrase
  jwt.verify(token,'TOKEN_SECRET', (err, user) => {
    console.log(err)
    if (err) {return res.sendStatus(403)}
    req.user = user

    // Pass the req object to the next express route function
    next()
  })
}