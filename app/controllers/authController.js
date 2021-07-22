// Imports
const jwt = require ('jsonwebtoken');
const User = require('../models/User');

// Controller main object
const authController = {

  // Login method
  loginAction : async function (req,res) {

        // Get the user in database by the email
        const user = await User.findByMailJoin(req.body.mail);
        console.log(user);

        // Check email existence
        if(!user[0]){
         return res.status(400).json({message :'Error. Wrong Email'})
        }
        // Compare the password and email concordance
        if (!(user[0].password===req.body.password)){
          return res.status(400).json({ message: 'Error. Wrong mail or password' })
        }
      
        // Create the jwt token
        const token = jwt.sign(
          { id:user[0].id, pseudo: user[0].pseudo },
          'TOKEN_SECRET',
          {
            expiresIn: "5h",
          }
        )

        // Fill the response object with user data, token and message
        const response = { isConnected : true,
                            user: user[0],
                            token : token
                          };

        // Send the response with the body in json
        return res.status(200).json(response)
  }
}

module.exports = authController;