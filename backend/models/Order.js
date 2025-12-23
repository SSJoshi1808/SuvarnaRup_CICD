const mongoose= require("mongoose")
const orderItemSchema = new mongoose.Schema({
    productID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true, // This means productID must be provided
      },
    name:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:false,
    },
    price:{
        type:Number,
        required:true,
    },
    Collections:String,
    Category:String,
    quantity:{
        type:Number,
        required:true,
    },

},{_id:false});
const orderSchema = new mongoose.Schema({
    user:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        required:true
    },
    orderItem:[orderItemSchema],
    shippingAddress:{
        address:{type:String,required:true},
        city:{type:String, require:true},
        postalCode:{type:String, require:true},
        country:{type:String, require:true}
    },
    paymentMethod:{
        type:String,
        require:true,
    },
        totalPrice:{
            type:Number,
            require:true,
        },
        isPaid:{
            type:Boolean,
            default:false,
        },
        paidAt:{
            type:Date,
        },
        isDeliverd:{
            type:Boolean,
            default:false,
        },
        deliveredAt:{
            type:Date,

        },
        paymentStatus:{
            type:String,
            default:"pending"
        },
        status:{
            type:String,
            enum:["Processing","Shipped","Delivered","cancelled"],
            default:"Processing",
        }
    },{timestamps:true});
module.exports = mongoose.model("Order", orderSchema);
