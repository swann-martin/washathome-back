const multer = require('multer');
const aws = require('aws-sdk');
const path = require('path');
const multerS3 = require('multer-s3');

aws.config.loadFromPath(__dirname + "/config.json");
const s3 = new aws.S3();

const storage = multerS3({
        acl: "public-read",
        s3: s3,
        bucket: process.env.WAHBUCKET,
        metadata: (requete, file, callback) => {
            callback(
                null, {
                    fieldname: file.fieldname
                }
            )
        },
        key: (requete, file, callback) => {
            callback(
                null,
                `${file.fieldname}${Date.now().toString()}${path.extname(file.originalname)}`
            )

        }
    }

);

const upload = multer ({
    fileFilter : (requete,file,callback)=>{
        if (file.mimetype==="image/png" || file.mimetype==="image/jpeg") {
            callback (null,true);
        }else {
            callback (new multer.MulterError(
                "erreur, l'image n est pas au bon format "
            ) )
        }
    },
    storage : storage
}).any()

const uploadMiddleware = function(req,res,next){
    upload (req,res,(error)=>{
        console.log('req.file ',req.file);
        console.log('recherche erreur mdwe',error);
        if (error instanceof multer.MulterError){
            res.status (400).json ("erreur ,l'image n'est pas au bon format ")
        }else {
            next()
        }
    });
}
module.exports=uploadMiddleware;

