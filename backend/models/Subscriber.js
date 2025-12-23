const mongoose = require("mongoose")
const subscriberSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique:true,
        trime:true,
        lowerCase:true
    },
    subcribeAt:{
        type: Date,
        default: Date.now,
    }

});
module.exports = mongoose.model("Suscriber", subscriberSchema)