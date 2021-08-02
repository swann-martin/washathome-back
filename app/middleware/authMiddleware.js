//Imports
const jwt = require('jsonwebtoken');

// Middleware object exported
module.exports = function (req,res,next){
  try{
    //Check authorization existence
    if (!req.headers.authorization) {throw new Error("Error. No authorization property in the request header" )}

    console.log(req.headers.authorization);

    // Keep the first part of the token in the header
    const token = req.headers.authorization.split(' ')[1]

    console.log(token);
    
    // Verify concordance with passphrase
    jwt.verify(token,process.env.TOKEN_SECRET, (err, user) => {
      console.log(err)
      if (err) {throw new Error( "Error. Wrong token" )}
      req.user = user
    })
    next()
  }
  catch(error){
    throw new Error(error.message);
  }
  // Pass the req object to the next express route function
}