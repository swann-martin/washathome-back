// Imports
const Machine = require('../models/Machine')
const User = require('../models/User')

// Controller main object
const mainController = {

    // Get all the machines method
    getAll: async function (req,res) {
        try{
            const results = await Machine.findAll();
            res.json(results);
        }catch(error){
            return res.status(400).json({ message: error.message });
        }
    },

    // Get one machine bu its id method
    getById: async function (req,res) {
        try{
            const machine = await Machine.findById(req.params.id);

            const user = await User.findById(machine[0].user_id);

            if(!machine[0]){throw new Error( "Error. There is no machine with this id." )}
        
            res.json({machine:machine[0],user:{id:user[0].id, pseudo: user[0].pseudo}});
        }
        catch(error){
            return res.status(400).json({ message: error.message });
        }
    },
    
    // Method get one machine
    getByZipCode: async function (req,res) {
        try {
            // Get the machines by zip code in database
            const machines = await Machine.findByZipCode(req.params.zipCode);

            // Check if machines are found
            if(!machines[0]){throw new Error('Error. No machines in that city');}

            // Send the list of machine within a json
            res.json(machines);
        }
        catch (error) {
            return res.status(400).json({ message: error.message });
        }
    },

    // Submit action method
    submitAction : async function(req,res) {
        try{
            // Destructure the request body
            const {capacity,name,description,zipCode,address,city,latitude,longitude,price} = req.body

            // Create a instance of Machine class with the data from the body request form
            const newMachine = new Machine ({
            capacity:capacity,
            name:name,
            description:description,
            zipCode:zipCode,
            address:address,
            city:city,
            latitude:latitude,
            longitude:longitude,
            price:price,
            picture:price,
            userId:req.user.id
            })

            // Saving the new machine class instanced with all the data in the database
            const returned = await newMachine.save();
          
            // Send confirmation message
            return res.status(200).json({ machine:returned, message: "Success ! The machine have been added." })
        }
        catch(error){
            console.log(error);
            return res.status(400).json({ message: error.message });
        }
    },

    // Signup action method
    updateAction : async function(req,res) {
        try{
            // Destructure the request body
            const {id,capacity,name,description,zipCode,address,city,latitude,longitude,price} = req.body

            // Create a instance of Machine class with the data from the body request form
            const newMachine = new Machine ({
            id:id,
            capacity:capacity,
            name:name,
            description:description,
            zipCode:zipCode,
            address:address,
            city:city,
            latitude:latitude,
            longitude:longitude,
            price:price,
            picture:price,
            userId:req.user.id
            })

            // Saving the new machine class instanced with all the data in the database
            const returned = await newMachine.save();
          
            // Send confirmation message
            return res.status(200).json({ machine:returned, message: "Success ! The machine have been modified." })
        }
        catch(error){
            console.log(error);
            return res.status(400).json({ message: error.message });
        }
    },
    
    // Delete an user method
    deleteAction : async function (req,res) {

        try{
            // Verify machine's existence in database by the id
            const machine = await Machine.findById(req.params.id);
            if (!machine[0]){ throw new Error("Error. This machine doesn't exist.") }

            // Send error if the token doesn't correspond to the right user of this machine
            if (machine[0].user_id != req.user.id){throw new Error( "Error. You tried to delete the machine of another user." )}
            
            // Delete the machine
            await Machine.delete(req.params.id)

            // Check if machine doesn't exist anymore in the database
            const stillExists = await Machine.findById(req.params.id);
            if(stillExists[0]){ throw new Error( "Unknow problem. The machine haven't been deleted." ) }

            // Otherwise return a succees message
            return res.status(200).json({ message: "Success ! This machine have been deleted." })
        }
        catch(error){
            return res.status(400).json({ message: error.message });
        }
    }
}

// Exports
module.exports = mainController;