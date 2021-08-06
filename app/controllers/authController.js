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

        // Check email existence
        if(!user[0]){
         throw new Error( "Échec. Cette adresse mail n'existe pas." )
        }

        // Get the user's machines and bookings to join in the response
        const join = await User.findByIdJoin(user[0].id)

        // Compare bcrypt hash concordance with bcryptjs
        const check = await bcrypt.compareSync(req.body.password,user[0].password);
        if (check===false){
          throw new Error( "Échec. Le mot de passe ne correspond pas." )
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
          console.log(error);
          return res.status(400).json({ message: error.message });
        }
  },

  // Login method
  autoLogin : async function (req,res) {
    try{
    // Get the user's machines and bookings to join in the response
    const join = await User.findByIdJoin(req.user.id)

    // Send the response with connection status, user's id, token and message
    return res.status(200).json({ isConnected:true, user:join })
    }
    catch(error){
      console.log(error);
      return res.status(400).json({ message: error.message });
    }
  },

  // Signup action method
  signupAction : async function(req,res) {
    
    try{
      // Destructure the request body
      
      const {pseudo,firstname,lastname,phone,mail,password,passwordConfirm} = req.body
      
      const avatar = req.files[0]?.location || "";
      console.log('avatar',avatar);
      // Verify pseudo inexistance in database
      const pseudoDb = await User.findByPseudo(pseudo);
      if(pseudoDb[0]){throw new Error( 'Échec. Le pseudo est déjà utilisé.' )}

      // Verify phone inexistance in database
      const phoneDb = await User.findByPhone(phone);
      if(phoneDb[0]){throw new Error( 'Échec. Le numero de téléphone est déjà utilisé.' )}

      // Verify mail inexistance in database
      const mailDb = await User.findByMail(mail);
      if(mailDb[0]){throw new Error( "Échec. L'adresse mail est déjà utilisée." )}

      // Check password confirmation concordance
      if(password != passwordConfirm){throw new Error( "Échec. La confirmation du mot de passe est incorrecte." )}
      
      // Hash the password
      const hashedPassword = await bcrypt.hashSync(password, 10);

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
      return res.status(201).json({ message : 'Enregistrement réussi ! Votre compte a bien été créé.',
                                    user : userDb[0].id,
                                    pseudo : userDb[0].pseudo,
                                    token:token })
    }  
    catch(error){
      console.log(error);
      return res.status(400).json({ message: error.message });
    }
  },

  // Signup action method
  updateAction : async function(req,res) {
    
    try{
      // Destructure the request
      const {id} = req.user
      const {pseudo,firstname,lastname,phone,mail,avatar} = req.body
      //const avatar = req.files[0]?.location || "";
      // Create a instance of User class with the data from the body request form
      const newUser = new User ({
        id:id,
        pseudo:pseudo,
        firstname:firstname,
        lastname:lastname,
        phone:phone,
        mail:mail,
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
      return res.status(200).json({ message : 'Mise à jour réussie ! Votre compte a bien été modifié.', token:token })
    }  
    catch(error){
      console.log(error);
      return res.status(400).json({ message: error.message });
    }
  },

  passUpdate : async function (req,res) {

    try{
      // Destructure the request
      const {id} = req.user
      const {password,passwordConfirm} = req.body

      // Check password confirmation concordance
      if(password != passwordConfirm){throw new Error( "Échec. La confirmation du mot de passe est incorrecte." )}

      // Hash it
      const hashedPassword = bcrypt.hashSync(password, 10);

      // Instance the class with the data
      const newPassword = new User ({
        id:id,
        password:hashedPassword
      });

      // Update the password
      await newPassword.updatePassword();

      // Send confirmation message
      return res.status(200).json({ message : 'Mise à jour réussie ! Votre mot de passe a bien été modifié.' })
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
      if (!user[0]){throw new Error( "Échec. Ce compte n'existe pas." )}

      // Delete the user
      await User.delete(user[0].id)

      // Otherwise return a confirmation
      return res.status(200).json({ message: "Suppression réussie ! Votre compte a bien été supprimé.", isConnected:false })
    }
    catch(error){
      console.log(error);
      return res.status(400).json({ message: error.message });
    }
  }
}

module.exports = authController;