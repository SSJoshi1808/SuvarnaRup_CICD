const express=require("express");
const Cart=require("../models/Cart");
const Product=require("../models/Product");
const { protect } = require("../middelware/authMiddelWare");

const router=express.Router();
//Helper function to get a cart by user Id or guestId
const getCart = async(userId,guestId)=>{
    if(userId){
        return await Cart.findOne({user:userId});
    }else if (guestId){
        return await Cart.findOne({guestId});
    }
    return null;
};

//@route POST/api/cart
//@desc Add a product to the cart
//@access Private
router.post("/", protect, async (req,res)=>{
    const getImageUrl = (product) => {
        return product.img && product.img.length > 0 ? product.img[0].url : "";
    };
    const{productId,quantity,category,collections}=req.body;
    try{
        const product=await Product.findById(productId);
        if(!product) return res.status(404).json({message:"Product not found"});
        
        // Get cart for logged in user
        let cart = await Cart.findOne({ user: req.user._id });

        //If cart exists, update it
        if(cart){
            const productIndex=cart.products.findIndex(
                (p)=> p.productId.toString()=== productId && p.category ===category && 
                p.collections=== collections
            );

            if(productIndex >-1){
                //If the product already exists, update the quantity
                cart.products[productIndex].quantity+= quantity;
            } else{
                //add new product
                cart.products.push({
                    productId,
                    name:product.name,
                    img: getImageUrl(product),
                    price:product.price,
                    category,
                    collections,
                    quantity,
                });  
            }
            //Recalculate the total price of the cart
            cart.totalPrice=cart.products.reduce((acc,item)=> acc+ item.price*item.quantity, 0);
            await cart.save();
            return res.status(200).json(cart);
        }
        
        //Create a new cart for the user
        const newCart= await Cart.create({
            user: req.user._id,
            products:[{
                productId,
                name: product.name,
                img: product.img && product.img.length > 0 ? product.img[0].url : "",
                price:product.price,
                category,
                collections,
                quantity, 
            }],
            totalPrice:product.price * quantity,
        });
        return res.status(201).json(newCart);
    }catch(error){
        console.error(error);
        res.status(500).json({message:"Server Error"});
    }
});

//@route PUT /api/cart
//@desc Update product quantity in the cart
//@access Private
router.put("/", protect, async(req,res)=>{
    const {productId,quantity,collections,category}=req.body;
    try{
        let cart = await Cart.findOne({ user: req.user._id });
        if(!cart) return res.status(404).json({message:"Cart not found"});

        const productIndex=cart.products.findIndex(
            (product)=> product.productId === productId && 
            product.collections === collections && 
            product.category === category
        );

        if(productIndex >-1){
            //update quantity
            if (quantity >0){
                cart.products[productIndex].quantity=quantity;
            }
            else{
                cart.products.splice(productIndex,1); // Remove Product if quantity is 0
            }

            cart.totalPrice=cart.products.reduce((acc,item)=>acc+item.price*item.quantity,0);
            await cart.save();
            return res.status(200).json(cart);
        }else{
            return res.status(404).json({message:"Product not found in cart"});
        }
    }catch(error){
        console.error(error);
        return res.status(500).json({message:"Server Error"});
    }
});

// @route DELETE /api/cart
// @desc Remove a product from the cart
// @access Private
router.delete("/", protect, async (req, res) => {
    const { productId, collections, category } = req.body;

    if (!productId || !collections || !category) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    try {
        let cart = await Cart.findOne({ user: req.user._id });
        if (!cart || !cart.products) {
            return res.status(404).json({ message: "Cart not found" });
        }

        const productIndex = cart.products.findIndex(
            (p) =>
                p.productId.toString() === productId &&
                p.category === category &&
                p.collections === collections
        );

        if (productIndex > -1) {
            cart.products.splice(productIndex, 1);
            cart.totalPrice = cart.products.reduce((acc, item) => acc + item.price * item.quantity, 0);
            await cart.save();
            return res.status(200).json({ message: "Product removed from cart", cart });
        } else {
            return res.status(404).json({ message: "Product not found in cart" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server Error", error: error.message });
    }
});

//@route GET/api/cart
//@desc Get user's cart
//@access Private
router.get("/", async (req, res) => {
    try {
        let cart;
        if (req.headers.authorization) {
            const token = req.headers.authorization.split(" ")[1];
            const jwt = require("jsonwebtoken");
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const userId = decoded.user.id;

            cart = await Cart.findOne({ user: userId });
            if (!cart) {
                cart = await Cart.create({ user: userId, products: [], totalPrice: 0 });
            }
            return res.json(cart);
        } else if (req.query.guestId) {
            cart = await Cart.findOne({ guestId: req.query.guestId });
            if (!cart) {
                cart = await Cart.create({ guestId: req.query.guestId, products: [], totalPrice: 0 });
            }
            return res.json(cart);
        } else {
            return res.status(401).json({ message: "Unauthorized" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
});

//@route POST/api/cart/merge
//@desc Merge guest cart into user cart on login
//@access Private
router.post("/merge", protect,async(req,res)=>{
    const {guestId}=req.body ;

    try{
          //Find the guest cart and user cart
          const guestCart=await Cart.findOne({guestId});
          const userCart=await Cart.findOne({user:req.user._id});

          if(guestCart){
            if (guestCart.products.length ===0){
                return res.status(400).json({message:"Guest cart is empty"});
            }

            if(userCart){
                //Merge the guest cart into the user cart
                guestCart.products.forEach((guestItem)=>{
                    const productIndex=user.Cart.products.findIndex((item)=> item.productId.toString()
                ===guestItem.productId.toString() && 
                item.size === guestItem.size && item.color === guestItem.color);
                 
                if(productIndex !== -1){
                    //If the items exist in the user cart ,update the quantity
                    userCart.products[productIndex].quantity+=guestItem.quantity;
                }
                else{
                    //Otherwise ,add the guest item to the cart
                    userCart.products.push(guestItem);
                }
                });

                userCart.totalPrice= userCart.products.reduce(
                    (acc,item)=>acc+item.price *item.quantity,0
                );
                await userCart.save();

                // Remove the guest cart after merging
                try{
                    await Cart.findOneAndDelete({guestId});
                }catch(error){
                    console.error("Error deleting guest cart: ",error);
                }
                res.status(200).json(userCart);
            }else{
               //If the user has no existing cart,assign the guest cart to the user
               guestCart.user=req.user._id;
               guestCart.guestId=undefined;
               await guestCart.save();

               res.status(200).json(guestCart);
            }
          }else{
            if(userCart){
                //Guest cart has aldready been merged ,return user cart
                return res.status(200).json(userCart);
            }
            res.status(404).json({message:"Guest Cart not found"});
          }

    } catch(error){
        console.error(error);
        res.status(500).json({message:"Server Error"});
    }
});

module.exports = router;