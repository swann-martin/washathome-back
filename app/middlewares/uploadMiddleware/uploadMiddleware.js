const multer = require('multer')
const upload = multer({dest: __dirname +'/uploads/'})

module.exports = async function uploadMiddleware (req,res,next) {
    console.log(req.body);
    next()
}