// Imports
const User = require('../models/User');
const jwt = require ('jsonwebtoken');
const bcrypt = require('bcryptjs')

// Controller main object
const authController = {

  // Login method
  loginAction : async function (req,res) {

        try{
        // Get the user in database by the email
        const user = await User.findByMail(req.body.mail);

        // Get the user's machines and bookings to join in the response
        const join = await User.findByIdJoin(user[0].id)

        // Check email existence
        if(!user[0]){
         throw new Error( "Error. This email doesn't exists" )
        }

        // Compare bcrypt hash concordance with bcryptjs
        const check = bcrypt.compareSync(req.body.password,user[0].password);
        if (check===false){
          throw new Error( "Error. Wrong password" )
        }
      
        // Create the jwt token
        const token = jwt.sign(
          { id:user[0].id, pseudo: user[0].pseudo },
          process.env.TOKEN_SECRET,
          {
            expiresIn: "5h",
          }
        )

        // Send the response with connection status, user's id, token and message
        return res.status(200).json({
                                      isConnected : true,
                                      token : token,
                                      personal : join
                                    })
        }
        catch(error){
          return res.status(400).json({ message: error.message });
        }
  },

  // Login method
  autoLogin : async function (req,res) {
    try{
    // Get the user's machines and bookings to join in the response
    const join = await User.findByIdJoin(req.user.id)

    // Send the response with connection status, user's id, token and message
    return res.status(200).json({
                                  isConnected : true,
                                  user : join
                                })
    }
    catch(error){
      return res.status(400).json({ message: error.message });
    }
  },

  // Signup action method
  signupAction : async function(req,res) {
    
    try{
      // Destructure the request body
      const {pseudo,firstname,lastname,phone,mail,password,passwordConfirm,avatar} = req.body
    
      // Verify pseudo inexistance in database
      const pseudoDb = await User.findByPseudo(pseudo);
      if(pseudoDb[0]){throw new Error( 'Error. Pseudo already exists.' )}

      // Verify phone inexistance in database
      const phoneDb = await User.findByPhone(phone);
      if(phoneDb[0]){throw new Error( 'Error. Phone number already exists.' )}

      // Verify mail inexistance in database
      const mailDb = await User.findByMail(mail);
      if(mailDb[0]){throw new Error( 'Error. Mail already exists.' )}

      // Check password confirmation concordance
      if(password != passwordConfirm){throw new Error( 'Error. Password confirmation is wrong.' )}
      
      const hashedPassword = bcrypt.hashSync(password, 10);

      // Create a instance of User class with the data from the body request form
      const newUser = new User ({
        pseudo:pseudo,
        firstname:firstname,
        lastname:lastname,
        phone:phone,
        mail:mail,
        password:hashedPassword,
        avatar:avatar
      })

      // Saving the new user class instanced ith all the data in the database
      const userDb = await newUser.save();

      // Create the jwt token
      const token = jwt.sign(
        { id:userDb[0].id, pseudo: userDb[0].pseudo },
        process.env.TOKEN_SECRET,
        {
          expiresIn: "5h",
        }
      )
      
      // Send confirmation message
      return res.status(201).json({ message : 'Signup succeeded ! Your account have been created.',
                                    isConnected : true,
                                    user : userDb[0].id,
                                    pseudo : userDb[0].pseudo,
                                    token:token })
    }  
    catch(error){
      return res.status(400).json({ message: error.message });
    }
  },

  passUpdate : async function (req,res) {

    try{
      // Destructure the request
      const {id} = req.user
      const {password,passwordConfirm} = req.body

      // Check password confirmation concordance
      if(password != passwordConfirm){throw new Error( 'Error. Password confirmation is wrong.' )}

      // Hash it
      const hashedPassword = bcrypt.hashSync(password, 10);

      const newPassword = new User ({
        id:id,
        password:hashedPassword
      });

      console.log(id);

      // Update the password
      await newPassword.updatePassword();

      // Send confirmation message
      return res.status(201).json({ message : 'Signup succeeded ! Your password have been changed.' })
    }
    catch(error){
      console.log(error);
      return res.status(400).json({ message: error.message });    
    }
  },

  // Delete an user method
  deleteAction : async function (req,res) {

    try{
      // Get the user from the database for verification
      const user = await User.findByPseudo(req.user.pseudo);

      // Send error if the user doesn't exist
      if (!user[0]){throw new Error( "Error. This account doesn't exists." )}

      // Send error if the token doesn't correspond to the right user
      if (user[0].pseudo != req.user.pseudo){throw new Error( "Error. You tried to delete another user." )}

      // Delete the user
      await User.delete(user[0].id)

      // Send error if user is found anymore in the database
      const stillExists = await User.findByPseudo(req.params.pseudo);
      if(stillExists[0]){throw new Error( "Unknow problem. Your account haven't been deleted." )}

      // Otherwise return a confirmation
      return res.status(200).json({ message: "Success ! This account have been deleted." })
    }
    catch(error){
      return res.status(400).json({ message: error.message });
    }
  }
}

module.exports = authController;