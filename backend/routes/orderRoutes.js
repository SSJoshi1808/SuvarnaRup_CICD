const express = require("express");
const Order = require("../models/Order");
const { protect } = require("../middelware/authMiddelWare")

const router = express.Router();

// @route GET/api/orders/my-orders
// @desc get logged-in user's order
// @access Private
router.get("/my-orders",protect,async(req,res)=>{

    try {       
    const orders = await Order.find({user:req.user._id})
        .sort({ createdAt: -1 })
        .populate('user', 'name email');
    res.json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({Error:"Finding Order Error:",error})
    }
});

// @route GET/api/orders/:id
// @desc get order details by ID
// @access  Private
router.get("/:id",protect,async(req,res)=>{
    try {
        const order = await Order.findById(req.params.id).populate(
            "user",
            "name email"
        );

        if(!order){
            return res.status(404).json({Error:"Order not found"})
        }
        res.json(order);
    } catch (error) {
        console.error(error);
        res.status(500).json({Error:"Finding ID Order Error:",error})
    }
});
module.exports = router;
