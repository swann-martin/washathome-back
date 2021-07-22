const jwt = require ('jsonwebtoken');
const User = require('../models/User');

const authController = {
  loginAction : async function (req,res) {
        const userDB = await User.findByMail(req.body.mail);
        if(!userDB){
         return res.status(400).json({message :'Error. Wrong Email'})
        }
        if (!(userDB[0].password===req.body.password)){
          console.log('mauvais mot de passe');
          return res.status(400).json({ message: 'Error. Wrong login or password' })
        }

        console.log('bon mot de passe');
      
      // Create token
      const token = jwt.sign(
        { mail: userDB[0].mail },
        'process.env.TOKEN_SECRET',
        {
          expiresIn: "5h",
        }
      )

      // Fill the response object with user data, token and message
      const response = {};
      response.message = { message: 'Login succeeded' };
      response.user = userDB[0]
      response.token = token;
      console.log(response);
          return res.status(200).json(response)
  }
}

module.exports = authController;