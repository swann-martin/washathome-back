// Imports
const Booking = require('../models/Booking')

// Controller main object
const bookController = {

    // Send all the bookings
    getAll: async function (req,res) {
        try{
            const results = await Booking.findAll();
            
            return res.status(200).json(results);
        }
        catch(error){
            console.log(error);
            return res.status(400).json({ message: error.message });         
        }
    },

    // Method get one booking
    getByUser: async function (req,res) {
        try {
            // Get the bookings by the washer id
            const washerBookings = await Booking.findByWasherId(req.user.id);

            // Get the bookings by the bringer id
            const bringerBookings = await Booking.findByBringerId(req.user.id);

//            if (!( bringerBookings[0] && washerBookings[0] )){ throw new Error( "Échec. Il n'y a pas de réservations pour cet utilisateur." ) };


            // Delete the personnal information of the washer according to the status of the booking and add the total of the price
            bringerBookings.forEach( element => {
                if( element.resa.status_id == 1 || element.resa.status_id == 5 || element.resa.status_id == 6 ){
                delete element.machine.machine_address;                                         
                delete element.machine.machine_zip_code;
                delete element.machine.machine_city;
                delete element.machine.machine_latitude;
                delete element.machine.machine_longitude;
                delete element.washer.washer_phone;
                delete element.washer.washer_mail;
                }

                // Get the total of the price
                var total = 0;
                for(const item of element.resa.options){
                   total += item.price;
                }
                total +=element.machine.price;
                element.resa.price = total;
            })

             // Adds the total of the price in the reservation
            washerBookings.forEach( element => {
                var total = 0;
                for(const item of element.resa.options){
                   total += item.price;
                }
                total +=element.machine.price;
                element.resa.price = total;


            })

            // Send the list of booking within a json
            return res.status(200).json({ washerBookings:washerBookings, bringerBookings:bringerBookings });
        }
        catch (error) {
            console.log(error);
            return res.status(400).json({ message: error.message });
        }
    },

    // Signup action method
    submitAction : async function(req,res) {

        try{
            // Destructure the request body
            const {temperature,dispo,washerId,machineId} = req.body

            // Send error if the token doesn't correspond to the right user
            if (req.user.id == washerId){throw new Error( "Échec. Vous ne pouvez pas réserver votre propre machine." )}

            // Create a instance of booking class with the data from the body request form
            const newBooking = new Booking ({
            temperature:temperature,
            dispo:dispo,
            bringerId:req.user.id,
            washerId:washerId,
            machineId:machineId,
            statusId:1
            })

            // Saving the new booking class instanced with all the data in the database
            const [returned] = await newBooking.save();
            
            // Get the options and put them in a array
            const options = []
            for(const option in req.body.options){
                const [optReturned] = await Booking.options(returned.id,req.body.options[option])
                options.push(optReturned.option_id)
            }

            // Get the total
            const total = await Booking.total(returned.id)

            // Put the options and the total in the returned (booking) object
            returned.options = options;
            returned.total = total[0].total_amount;

            // Send confirmation message
            return res.status(201).json({ booking:returned, message : "Félicitations ! Votre réservervation a bien été prise en compte." })
        }
        catch(error){
            console.log(error);
            return res.status(400).json({ message: error.message });
        }
    },

    stateAction : async function (req,res) {
        try{
        // Get the id and the status in the request body
        const {id,statusId} = req.params

        // Verify if the status isn't already the same
        /*const bookingDb = await Booking.findById(id);
        console.log(bookingDb[0].status_id,statusId)
        if(bookingDb[0].status_id==statusId){ throw new Error( "Échec. La réservation a déjà cet état." ) }*/
        
        // Send error if the token doesn't correspond to the right user
        //if (!(bookingDb[0].bringer_id == req.user.id || bookingDb[0].washer_id == req.user.id)){
           // throw new Error( "Échec. Vous essayez de changer l'état d'une réservation qui ne vous appartient pas." )
       // }
        
        // Instance the active record class and call the change state function
        const update = new Booking({ id:id, statusId: statusId })
        const [returned] = await update.changeState(update);

        // Otherwise return a succees message
        return res.status(200).json({ booking:returned, message: "Mise à jour réussie ! La réservation a bien été modifiée." })
        }
        catch(error){
            console.log(error);
            return res.status(400).json({ message: error.message });
        }

    },

    // Delete an user method
    deleteAction : async function (req,res) {

        try{
            // Verify booking's existence in database by the id
            const booking = await Booking.findById(req.params.id);
            if (!booking[0]){ throw new Error("Échec. Cette réservation n'existe pas.") }

            // Delete the booking
            await Booking.delete(req.params.id)

            // Otherwise return a succees message
            return res.status(200).json({ message: "Suppression réussie ! La réservation a bien été supprimée." })
        }
        catch(error){
            console.log(error);
            return res.status(400).json({ message: error.message });
        }
    }
}

// Exports
module.exports = bookController;