const express = require("express");
const router = express.Router();
const Subscriber = require("../models/Subscriber")

// @routes POST/api/subscribe
// @desc Handle newsletter substribtion
// @access Public

router.post("/subscribe", async (req, res) => {
    const {email}= req.body;
    if(!email){
        return res.status(400).json({message:"Email is required"})
    }
    try {
        let subscriber = await Subscriber.findOne({email});
        if(subscriber){
            return res.status(400).json({message:"Already Subscribe"})
        }
        subscriber= new Subscriber({email})
        await subscriber.save()
        res.status(201).json({message:"Succesfully Subscribed to the newsletter",subscriber})
    } catch (error) {
        res.status(400).json({Error:"Subcribtion Error"})
    }
})
module.exports = router;
