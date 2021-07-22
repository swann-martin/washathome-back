const jwt = require ('jsonwebtoken');
const User = require('../models/User');

const authController = {
    loginAction : async function (req,res) {
      
      const userDB = await User.findByMail(req.body.mail);

      if (userDB[0].password!=req.body.password){
        console.log('mauvais mot de passe');
        return res.status(400).json({ message: 'Error. Wrong login or password' })
      }
      console.log('bon mot de passe');
/*         const token = jwt.sign({
          id: user.id,
          username: user.username
      }, SECRET, { expiresIn: '3 hours' })
  
      return res.json({ access_token: token }) */
    }
};

module.exports = authController;