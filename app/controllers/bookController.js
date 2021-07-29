// Imports
const Booking = require('../models/Booking')

// Controller main object
const bookController = {

    // Send all the bookings
    getAll: async function (req,res) {
        const results = await Booking.findAll();
        
        res.json(results);
    },

    // Method get one booking
    getByUser: async function (req,res) {
        try {
            // Get the bookings by the washer id
            const washerBookings = await Booking.findByWasherId(req.params.userId);

            // Get the bookings by the bringer id
            const bringerBookings = await Booking.findByBringerId(req.params.userId);

            // Delete the personnal information of the washer according to the status of the booking
            bringerBookings.forEach(element=>{  if( element.resa.status_id == 1 || element.resa.status_id == 5 || element.resa.status_id == 6 ){
                                                    delete element.machine.machine_address;                                         
                                                    delete element.machine.machine_zip_code;
                                                    delete element.machine.machine_city;
                                                    delete element.machine.machine_latitude;
                                                    delete element.machine.machine_longitude;
                                                    delete element.washer.washer_phone;
                                                    delete element.washer.washer_mail; }})

            // Send the list of booking within a json
            res.json({ washerBookings:washerBookings, bringerBookings:bringerBookings });
        }
        catch (error) {
            return res.status(400).json({ message: error.message });
        }
    },

    // Signup action method
    submitAction : async function(req,res) {

        try{
            // Destructure the request body
            const {temperature,timeResa,bringerId,washerId,machineId,statusId} = req.body
            
            // Send error if the token doesn't correspond to the right user
            if (!(bringerId == req.user.id)){throw new Error( "Error. You tried to book from another user." )}

            // Send error if the token doesn't correspond to the right user
            if (!(bringerId == washerId)){throw new Error( "You cannot book your own machine." )}

            // Create a instance of booking class with the data from the body request form
            const newBooking = new Booking ({
            temperature:temperature,
            timeResa:timeResa,
            bringer:bringerId,
            washer:washerId,
            machine:machineId,
            status:statusId
            })

            // Saving the new booking class instanced with all the data in the database
            const returned = await newBooking.save();
          
            // Send confirmation message
            return res.status(200).json({ booking:returned, message: "Success ! The booking have been added." })
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
            if (!booking[0]){ throw new Error("Error. This booking doesn't exist.") }

            // Delete the booking
            await Booking.delete(req.params.id)

            // Check if booking doesn't exist anymore in the database
            const stillExists = await Booking.findById(req.params.id);
            if(stillExists[0]){ throw new Error( "Unknow problem. The booking haven't been deleted." ) }

            // Otherwise return a succees message
            return res.status(200).json({ message: "Success ! This booking have been deleted." })
        }
        catch(error){
            return res.status(400).json({ message: error.message });
        }
    }
}

// Exports
module.exports = bookController;