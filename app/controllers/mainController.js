const Machine = require('../models/Machine')

// Controllers
const mainController = {

    // Method get one machine
    getByZipCode: async function(req,res) {

        const results = await Machine.findByZipCode(req.params.zipCode);

        res.json(results);
    }
}

// Exports
module.exports=mainController;