// Imports
const Machine = require('../models/Machine')

// Controller main object
const mainController = {

    // Method get one machine
    getByZipCode: async function(req,res) {

        // Get the machines by zip code in database
        const machines = await Machine.findByZipCode(req.params.zipCode);

        if(!machines[0]){return res.status(400).json({ message: "Error. No machines in that city" })}

        res.json(machines);
    }
}

// Exports
module.exports=mainController;