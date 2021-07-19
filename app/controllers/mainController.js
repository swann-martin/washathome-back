const Machine = require('../models/Machine')

// Controllers
const mainController = {

    // Method get one machine
    getOne: async (req,res) {
        
        const results = await Machine.findOne(req.params.id);

        res.json(results);
    }
}

// Exports
module.exports=mainController;