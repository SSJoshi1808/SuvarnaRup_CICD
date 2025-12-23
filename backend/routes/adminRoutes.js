const express = require("express");
const User = require("../models/User");
const Product = require("../models/Product");
const {protect,admin} = require("../middelware/authMiddelWare");
const router = express.Router();

// @router GET/api/admin/
// @Desc get all users
// @accses Private admin
router.get("/",protect,admin,async(req,res)=>
{
    try{
        const user = await User.find({})
        res.json(user);
    }
    catch(e){
        console.log(e);
        res.status(500).json("Error at finding all users");
    }
});

// @router POST/api/admin/
// @Desc add new user(admin)
// @accses Private admin
router.post("/create",protect,admin,async(req,res)=>{
    try {
        const{name,email,password,role}=req.body;
        let user = await User.findOne({email})
        if(user){
            res.status(400).json("User already found");
        }
         user = new User({name,email,password,role:role ||"customer"});
         await user.save();
         res.status(200).json({user:"User created successfully",user});
        
    } catch (error) {
        console.log(error);
        res.status(500).json("Error at adding user");
    }
});

// @route DELETE /api/admin/delete/:id
// @desc Delete user
// @access Private admin
router.delete('/delete/:id', protect, admin, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting user' });
    }
});

// @route PUT/api/admin/users/:id
// @desc to edit user information
// access private admin
router.put("/:id",protect,admin,async(req,res)=>{
    try {
        const user = await User.findById(req.params.id)
        if(user){
           user.name = req.body.name||user.name,
           user.email = req.body.role||user.email,
           user.role = req.body.role||user.role

        }
        const updateuser= await user.save();
        res.json({Message:"User updated successfully",user:updateuser})
    } catch (error) {
        console.log(error);
        res.status(500).json("Error at Editing user");
    }
});

// @route GET /api/admin/products
// @desc Get all products for admin
// @access Private admin
router.get("/products", protect, admin, async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching products' });
    }
});

// @route DELETE /api/admin/products/:id
// @desc Delete a product
// @access Private admin
router.delete("/products/:id", protect, admin, async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        await Product.findByIdAndDelete(req.params.id);
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting product' });
    }
});

// @route GET /api/admin/products/:id
// @desc Get a single product for admin
// @access Private admin
router.get("/products/:id", protect, admin, async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching product' });
    }
});

// @route PUT /api/admin/products/:id
// @desc Update a product
// @access Private admin
router.put("/products/:id", protect, admin, async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );

        res.json(updatedProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating product' });
    }
});

// @route POST /api/admin/products
// @desc Create a new product
// @access Private admin
router.post("/products", protect, admin, async (req, res) => {
    try {
        const { name, description, price, discountPrice, countInStock, sku, category, collections, img, tags, dimension, weight } = req.body;

        // Check if product with same SKU exists
        const existingProduct = await Product.findOne({ sku });
        if (existingProduct) {
            return res.status(400).json({ message: 'Product with this SKU already exists' });
        }

        const product = new Product({
            name,
            description,
            price,
            discountPrice,
            countInStock,
            sku,
            category,
            collections,
            img: img ? [{ url: img }] : [],
            tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
            dimension: dimension ? { length: 0, width: 0, height: 0 } : undefined,
            weight,
            user: req.user._id
        });

        const createdProduct = await product.save();
        res.status(201).json(createdProduct);
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ message: error.message || 'Error creating product' });
    }
});

module.exports = router;