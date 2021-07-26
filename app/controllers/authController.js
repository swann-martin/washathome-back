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
  },

  // Signup action method
  signupAction : async function(req,res) {

    // Destructure the request body
    const {pseudo,firstname,lastname,phone,mail,password,passwordConfirm} = req.body
    
    // Verify pseudo inexistance in database
    const pseudoDb = await User.findByPseudo(pseudo);
    if(pseudoDb[0]){
      return res.status(400).json({ message: 'Error. Pseudo already exists.' })
    }

    // Verify phone inexistance in database
    const phoneDb = await User.findByPhone(phone);
    if(phoneDb[0]){
      return res.status(400).json({ message: 'Error. Phone number already exists.' })
    }

    // Verify mail inexistance in database
    const mailDb = await User.findByMail(mail);
    if(mailDb[0]){
      return res.status(400).json({ message: 'Error. Mail already exists.' })
    }

    // Check password confirmation concordance
    if(password != passwordConfirm){
      return res.status(400).json({ message: 'Error. Password confirmation is wrong.' })
    }
    
    const hashedPassword = bcrypt.hashSync(password, 10);

    // Create a instance of User class with the data from the body request form
    const newUser = new User ({
      pseudo:pseudo,
      firstname:firstname,
      lastname:lastname,
      phone:phone,
      mail:mail,
      password:hashedPassword,
      avatar:"https://thispersondoesnotexist.com/"
    })

    // Saving the new user class instanced ith all the data in the database
    const created = await newUser.save();
    console.log(created);
    
    // Send succees response if the new user finally exists in database
    const existsInDb = await User.findByPseudo(pseudo);
    if (existsInDb){
    return res.status(200).json({ message: 'Signup succeeded ! Your account have been created.' })
    }

    // If process arrives here, it means there's a unknown answer
    return res.status(400).json({ message: "Unknow problem. Your account haven't been created." })
  },

  // Delete an user method
  deleteAction : async function (req,res) {

    // Verify user's existence in database by the id
    const user = await User.findByPseudo(req.params.pseudo);
    if (!user[0]){
      return res.status(400).json({ message: "Error. This account doesn't exists." })
    }

    // Delete the user
    await User.delete(user[0].id)

    // Send confirmation if user isn't found anymore in the database
    const stillExists = await User.findByPseudo(req.params.pseudo);
    if(stillExists[0]){return res.status(400).json({ message: "Unknow problem. Your account haven't been deleted." })
    }
    else{return res.status(200).json({ message: "Success ! This account have been deleted." })
    }
  }
}

module.exports = authController;