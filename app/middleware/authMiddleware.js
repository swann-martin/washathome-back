//Imports
const jwt = require('jsonwebtoken');

// Middleware object exported
module.exports = function (req,res,next){
  try{
    //Check authorization existence
    if (!req.headers.authorization) {throw new Error("Error. No authorization property in the request header" )}

    console.log(req.headers.authorization);

    const authorization = req.headers.authorization
    
    // Verify concordance with passphrase
    jwt.verify(authorization,process.env.TOKEN_SECRET, (err, user) => {
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