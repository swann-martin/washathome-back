// Imports
const express = require('express');
const mainController = require('./controllers/mainController');
const authController = require('./controllers/authController');
const bookController = require('./controllers/bookController');
const authMiddleware = require('./middleware/authMiddleware')
const geocodingZipCode = require('./middleware/geocodingZipCode');
const Machine = require('./models/Machine');

// Router declaration
const router = express.Router();

// Routes

// CRUD machines
/**
 * Respond with all machines by zip code
 * @route GET /search/{zipcode}
 * @group Machine
 * @param {number} zipcode.path.required the zipcode of the machine to fectch
 * @returns {Array<Machine} 200- An array of machines with the zipcode
 */
router.get('/search/:zipCode',mainController.getByZipCode); // Search all the machines by zip code in the dynamic URL

/**
 * Respond with all machines in database
 * @route GET /searchall
 * @group Machine
 * @returns {Array<Machine} 200 - An array of machines
 */

router.get('/searchall',mainController.getAll); // Send all the machines

/**
 * Respond with one machine from database
 * @route GET /machine/{id}
 * @group Machine
 * @param {number} id.path.required The id of the machine to fectch
 * @retuns {Machine.model} 200 - A single machine iditendied by its id
 * @returns {string} 400 - An error message
 */
router.get('/machine/:id',mainController.getById); // Search all the machines by the id in the dynamic URL
/**
 * expected JSON object in request body
 * @typedef ReqMachineJson
 * @property {string} name
 * @property {string} description
 * @property {number} zip_code
 * @property {string} address
 * @property {string} city
 * @property {number} latitude
 * @property {number} longitude
 * @property {number} price
 * @property {string} url picture
 * @property {number} userId
 */
/**
 * Add a new machine in database
 * @route POST /machine
 * @group Machine
 * @param {ReqMachineJson.model} object.body.required JSON Machine object to add in database
 * @returns {Machine.model} 201 - Success ! The machine have been added
 * @returns {string} 400 - An error message
 */

router.post('/machine',authMiddleware,geocodingZipCode,mainController.submitAction); // Add a new machine

/**
 * Modify a machine in database
 * @route PATCH /machine
 * @group Machine
 * @param {ReqMachineJson.model}object.body.required JSON Machine object to modify in database
 * @returns {Machine.model} 200 - update action is a success with message Mise à jour réussie ! La machine a bien été modifié.
 * @returns {string} 400 - An error message
 */
router.patch('/machine',authMiddleware,geocodingZipCode,mainController.updateAction); // Modify a machine
router.delete('/machine/:id',authMiddleware,mainController.deleteAction); // Delete a machine
// CRUD users
router.post('/login',authController.loginAction); // Login route
router.get('/autologin',authMiddleware,authController.autoLogin); // Auto login route
router.post('/signup',authController.signupAction); // Signup route
router.patch('/account',authMiddleware,authController.updateAction); // Modify an user
router.delete('/account',authMiddleware,authController.deleteAction); // Delete an user
router.patch('/password',authMiddleware,authController.passUpdate) // Update the password
// CRUD reservations
router.get('/reservation',authMiddleware,bookController.getByUser); // Send all the reservations by user id
router.post('/reservation',authMiddleware,bookController.submitAction); // Add a new reservation
router.get('/reservation/:id/:statusId',authMiddleware,bookController.stateAction); // Change the state of a reservation
router.delete('/reservation/:id',authMiddleware,bookController.deleteAction); // Delete a reservation

// Exporting
module.exports=router;