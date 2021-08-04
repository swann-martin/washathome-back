const fetch = require('node-fetch')

module.exports = async function geocodingAddress (req,res,next) {
    try{
        // Get and concatenate the address from the json request body
        const {address} = req.body
        const concatenated = address.split(' ').join('+');

        // Fetch the gouv.fr api with the concatenated string
        const result = await fetch(`https://api-adresse.data.gouv.fr/search/?q=${concatenated}`);

        // Decode from json to an object
        const json = await result.json()
        
        // Get the latitude and the longitude from the json response
        const latitude = json.features[0].geometry.coordinates[0];
        const longitude = json.features[0].geometry.coordinates[1];
        
        // Assignate back in the request body
        req.body.latitude = latitude;
        req.body.longitude = longitude;

        // Otherwise send an error
        if(result.error){throw new Error()}

        next();
    }
    catch(error){
        console.log(error);
        return res.status(400).json({ message: error.message });
    }
};