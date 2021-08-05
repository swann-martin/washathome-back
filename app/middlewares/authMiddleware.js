//Imports
const jwt = require('jsonwebtoken');

// Middleware object exported
module.exports = function (req,res,next){
  try{
    //Check authorization existence
    if (!req.headers.authorization) {throw new Error("Échec. Veuillez vous connecter." )}

    // Keep the first part of the token in the header
    const token = req.headers.authorization.split(' ')[1]
    console.log(token);
    
    // Verify concordance with passphrase
    jwt.verify(token,process.env.TOKEN_SECRET, (error, user) => {
      if (error) {throw new Error(error)}
      req.user = user
    })

    // Pass the req object to the next function
    next()
  }
  catch(error){
    console.log(error);
    return res.status(400).json({ message: error.message });         
  }
  // Pass the req object to the next express route function
}