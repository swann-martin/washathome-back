// Imports
const jwt = require ('jsonwebtoken');
const bcrypt = require('bcryptjs')
const User = require('../models/User');

// Controller main object
const authController = {

  // Login method
  loginAction : async function (req,res) {

        // Get the user in database by the email
        const user = await User.findByMailJoin(req.body.mail);

        // Check email existence
        if(!user[0]){
         return res.status(400).json({message :"Error. This email doesn't exists"})
        }

        // Compare bcrypt hash concordance with bcryptjs
        const check = bcrypt.compareSync(req.body.password,user[0].password);
        if (check===false){
          return res.status(400).json({ message: 'Error. Wrong password' })
        }

/*         // Compare simply the password and email concordance
        if (!(user[0].password===req.body.password)){
          return res.status(400).json({ message: 'Error. Wrong mail or password' })
        } */
      
        // Create the jwt token
        const token = jwt.sign(
          { id:user[0].id, pseudo: user[0].pseudo },
          process.env.TOKEN_SECRET,
          {
            expiresIn: "5h",
          }
        )

        // Fill the response object with user data, token and message
        const response = { isConnected : true,
                            user: user[0],
                            token : token
                          };

        // Send the response within the body in json
        return res.status(200).json(response)
  }
}

module.exports = authController;