const express=require("express")
const multer = require("multer")
const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier")

require("dotenv").config();
const router = express.Router()
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET

});

// multer
const storage = multer.memoryStorage();
const upload = multer({storage})

router.post("/",upload.single("image"),async (req, res) => {
    try {
        if(!req.file){
            return res.status(400).json({message:"no file uploaded"});
        }
        // function to handle the stream upload to clodinary
        const streamUpload =(fileBuffer)=>{
            return new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream((error,result) => {
                    if(result){
                        resolve(result);
                    }else{
                        reject(error);
                    }
                });
                // use streamfier to convert file bufer to stream 
                streamifier.createReadStream(fileBuffer).pipe(stream);
            });
        }
        const result=await streamUpload(req.file.buffer);
        res.json({imageUrl: result.secure_url});

    } catch (error) {
        console.error(error);
        res.status(500).json({message:"Upload error"});
        
    }
});
module.exports = router;