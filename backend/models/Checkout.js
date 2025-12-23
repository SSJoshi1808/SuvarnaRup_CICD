const mongoose = require("mongoose");
const checkOutItemSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Types.ObjectId,
        ref: "Product",
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: String,
        required: false
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    }
},
{_id: false});
const checkOutSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    checkOutItems: {
        type: [checkOutItemSchema],
        required: true,
        validate: [arr => arr.length > 0, 'Checkout must have at least one item']
    },
    shippingAddress: {
        firstName: { type: String, required: true, trim: true },
        lastName: { type: String, required: true, trim: true },
        address: { type: String, required: true, trim: true },
        city: { type: String, required: true, trim: true },
        postalCode: { type: String, required: true, trim: true },
        country: { type: String, required: true, trim: true },
        phno: { type: String, required: true, trim: true }
    },
    paymentMethod: {
        type: String,
        required: true,
        enum: ['PayPal', 'Credit Card', 'Debit Card']
    },
    totalPrice: {
        type: Number,
        required: true,
        min: 0
    },
    isPaid: {
        type: Boolean,
        default: false
    },
    paidAt: {
        type: Date
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'paid', 'failed'],
        default: 'pending'
    },
    paymentDetails: {
        type: mongoose.Schema.Types.Mixed
    },
    isFinalise: {
        type: Boolean,
        default: false
    },
    finalizedAt: {
        type: Date
    }
},{timestamps:true})

module.exports = mongoose.model("Checkout",checkOutSchema)