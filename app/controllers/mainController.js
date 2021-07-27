// Imports
const Machine = require('../models/Machine')

// Controller main object
const mainController = {

    // Send all the machines
    getAll: async function (req,res) {
        const results = await Machine.findAll();
        
        res.json(results);
    },

    // Method get one machine
    getByZipCode: async function (req,res) {
        try {
            // Get the machines by zip code in database
            const machines = await Machine.findByZipCode(req.params.zipCode);

            // Check if machines are found
            if(!machines[0]){
                throw new Error('Error. No machines in that city');}

            // Send the list of machine within a json
            res.json(machines);
        }
        catch (error) {
            return res.status(400).json({ message: error.message });
        }
    },

    // Signup action method
    submitAction : async function(req,res) {

        // Destructure the request body
        const {userId,capacity,name,description,zipCode,address,city,price} = req.body
        
        // Create a instance of Machine class with the data from the body request form
        const newMachine = new Machine ({
        capacity:capacity,
        name:name,
        description:description,
        zipCode:zipCode,
        address:address,
        city:city,
        price:price,
        picture:"https://media.2oceansvibe.com/wp-content/uploads/2016/01/sexysocksdesign221.jpg",
        userId:userId
        })

        try{
            // Saving the new machine class instanced ith all the data in the database
            const id = await newMachine.save();
            console.log(id[0]);

            // Send confirmation message
            return res.status(200).json({ message: "Success ! The machine have been added." })
        }
        catch(error){
            return res.status(400).json({ message: error.message });
        }
        
/*         // If process arrives here, it means there's a unknown answer
        return res.status(400).json({ message: "Unknow problem. Your machine haven't been created." }) */
    },

    // Delete an user method
    deleteAction : async function (req,res) {

        try{
            // Verify machine's existence in database by the id
            const machine = await Machine.findById(req.params.id);
            if (!machine[0]){ throw new Error("Error. This machine doesn't exist.") }

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
module.exports=mainController;