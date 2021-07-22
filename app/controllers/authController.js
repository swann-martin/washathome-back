const jwt = require ('jsonwebtoken');
const User = require('../models/User');

const authController = {
    loginAction : async function (req,res) {
//      try{
        const userDB = await User.findByMail(req.body.mail);

        if (!(userDB[0].password===req.body.password)){
          console.log('mauvais mot de passe');
          return res.status(400).json({ message: 'Error. Wrong login or password' })
        }
          console.log('bon mot de passe');
          return res.status(200).json({ message: 'Login succeeded !' })
        
/*           const token = jwt.sign({
            user_id: user.id,
            mail
        }, process.env.TOKEN_SECRET,
        { 
          expiresIn: '5 hours',
          }
          );
          user.token = token;
          res.status(201).json(user);
      
      }catch (err){
        console.log(err);
      } */
  }
};

module.exports = authController;