//Imports
const jwt = require('jsonwebtoken');

// Middleware object exported
module.exports = function (req,res,next){
  try{
    const {authorization} = req.headers
    
    console.log(authorization);
    //Check authorization existence
    if (!authorization) {throw new Error("Error. No authorization property in the request header" )}

    // Verify concordance with passphrase
    jwt.verify(authorization,'TOKEN_SECRET', (err, user) => {
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