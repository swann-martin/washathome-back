// Imports

const Machine = require('../models/Machine')
const User = require('../models/User')

// Controller main object
const mainController = {

    // Get all the machines method
    getAll: async function (req,res) {
        try{
            const results = await Machine.findAll();

            return res.status(200).json(results);
        }
        catch(error){
            console.log(error);
            return res.status(400).json({ message: error.message });
        }
    },

    // Get one machine bu its id method
    getById: async function (req,res) {
        try{
            const machine = await Machine.findById(req.params.id);

            const user = await User.findById(machine[0].user_id);

            if(!machine[0]){throw new Error( "Échec. Aucune machine n'existe avec cet id." )}
        
            return res.status(200).json({machine:machine[0],user:{id:user[0].id, pseudo: user[0].pseudo}});
        }
        catch(error){
            console.log(error);
            return res.status(400).json({ message: error.message });
        }
    },
    
    // Method get one machine
    getByZipCode: async function (req,res) {
        try {
            // Get the machines by zip code in database
            const machines = await Machine.findByZipCode(req.params.zipCode);

            // Check if machines are found
            if(!machines[0]){throw new Error("Échec. Il n'y a aucune machine dans cette ville.");}

            // Send the list of machine within a json
            return res.status(200).json(machines);
        }
        catch (error) {
            console.log(error);
            return res.status(400).json({ message: error.message });
        }
    },

    // Submit action method
    submitAction : async function(req,res) {
        try{
            // Destructure the request body
            const {capacity,title,description,zip_code,address,city,latitude,longitude,price,picture} = req.body

            // Create a instance of Machine class with the data from the body request form
            const newMachine = new Machine ({
            capacity:capacity,
            name:title,
            description:description,
            zipCode:zip_code,
            address:address,
            city:city,
            latitude:latitude,
            longitude:longitude,
            price:price,
            picture:picture,
            userId:req.user.id
            })

            // Saving the new machine class instanced with all the data in the database
            const [returned]  = await newMachine.save();
            returned.title = returned.name;
            delete returned.name;
            // Send confirmation message
            return res.status(201).json({ machine:returned, message: "Création réussie ! Votre machine a été ajoutée." })
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
            const {id,capacity,title,description,zip_code,address,city,latitude,longitude,picture,price} = req.body

            // Create a instance of Machine class with the data from the body request form
            const newMachine = new Machine ({
            id:id,
            capacity:capacity,
            name:title,
            description:description,
            zipCode:zip_code,
            address:address,
            city:city,
            latitude:latitude,
            longitude:longitude,
            price:price,
            picture:picture,
            userId:req.user.id
            })

            // Saving the new machine class instanced with all the data in the database
            const returned = await newMachine.save();
          
            // Send confirmation message
            return res.status(200).json({ machine:returned, message: "Mise à jour réussie ! La machine a bien été modifiée." })
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
            if (!machine[0]){ throw new Error("Échec. Il n'y a aucune machine dans cette ville.") }

            // Send error if the token doesn't correspond to the right user of this machine
            if (machine[0].user_id != req.user.id){throw new Error( "Échec. Vous avez tenté de supprimer un machine qui ne vous appartient pas." )}
            
            // Delete the machine
            await Machine.delete(req.params.id)

            // Otherwise return a succees message
            return res.status(200).json({ message: "Suppression réussie ! La machine a bien été supprimée." })
        }
        catch(error){
            console.log(error);
            return res.status(400).json({ message: error.message });
        }
    }
}

// Exports
module.exports = mainController;