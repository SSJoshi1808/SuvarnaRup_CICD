const mangoose = require("mongoose")
;
const connectDB = async()=>{
    try{
        await mangoose.connect(process.env.MONGO_URL);
        console.log("Databse Connected Sucessfully");
        
    }catch(error){
        console.error("Mongodb connection failed", error);
        process.exit(1);
        
    }
}
module.exports = connectDB;