// Imports
const { findAll } = require('../models/Machine');
const Machine = require('../models/Machine')

// Controller main object
const mainController = {

    // Send all the machines
    getAll: async function(req,res){
        const results = await Machine.findAll();
        
        res.json(results);
    },

    // Method get one machine
    getByZipCode: async function(req,res) {

        // Get the machines by zip code in database
        const machines = await Machine.findByZipCode(req.params.zipCode);

        // Check if machines are found
        if(!machines[0]){return res.status(400).json({ message: "Error. No machines in that city" })}

        // Send the list of machine within a json
        res.json(machines);
    },

    // Signup action method
    submitAction : async function(req,res) {

        // Destructure the request body
        const {userId,
            capacity,name,description,zipCode,address,city,price} = req.body

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

        // Saving the new machine class instanced ith all the data in the database
        await newMachine.save();

        // Send confirmation message
        return res.status(200).json({ message: "Success ! The machine have been added." })
        
/*         // If process arrives here, it means there's a unknown answer
        return res.status(400).json({ message: "Unknow problem. Your machine haven't been created." }) */
    },

    // Delete an user method
    deleteAction : async function (req,res) {

        // Verify machine's existence in database by the id
        const machine = await Machine.findById(req.params.id);

        if (!machine[0]){
        return res.status(400).json({ message: "Error. This machine doesn't exist." })
        }

        // Delete the machine
        await Machine.delete(req.params.id)

        // Send confirmation if machine isn't found anymore in the database
        const stillExists = await Machine.findById(req.params.id);
        if(stillExists[0]){return res.status(400).json({ message: "Unknow problem. The machine haven't been deleted." })
        }
        return res.status(200).json({ message: "Success ! This machine have been deleted." })
    }
}

// Exports
module.exports=mainController;