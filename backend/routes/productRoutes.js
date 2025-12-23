const express = require("express");
const Product = require("../models/Product");
const { protect, admin } = require("../middelware/authMiddelWare");

const router = express.Router();

// @route POST /api/product
// @desc Create a new product
// @access Private/admin
router.post("/", protect, admin, async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      discountPrice,
      countInStock,
      sku,
      category,
      collections,
      img,
      rating,
      numReviews,
      tags,
      dimension,
      weight,
    } = req.body;

    const product = new Product({
      name,
      description,
      price,
      discountPrice,
      countInStock,
      sku,
      category,
      collections,
      img,
      rating,
      numReviews,
      tags,
      dimension,
      weight,
      user: req.user._id,
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error creating product" });
  }
});
// @route Put/api/product/:id
//@desc update an exiting product id
//@access private/admin
router.put("/:id", protect, admin, async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      discountPrice,
      countInStock,
      sku,
      category,
      collections,
      img,
      rating,
      numReviews,
      tags,
      dimension,
      weight,
    } = req.body;
    const product = await Product.findById(req.params.id);
    if (product) {
      product.name = name || product.name;
      product.description = description || product.description;
      product.price = price || product.price;
      product.discountPrice = discountPrice || product.discountPrice;
      product.countInStock = countInStock || product.countInStock;
      product.sku = sku || product.sku;
      product.category = category || product.category;
      product.collections = collections || product.collections;
      product.img = img || product.img;
      product.rating = rating || product.rating;
      product.numReviews = numReviews || product.numReviews;
      product.tags = tags || product.tags;
      product.dimension = dimension || product.dimension;
      product.weight = weight || product.weight;

      const updateProduct = await product.save();
      res.json(updateProduct);
    } else {
      res.status(404).json({ Error: "Product not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error upadting product" });
  }
});
router.delete("/:id", protect, admin, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      await product.deleteOne();
      res.status(200).json({ Message: "Product deleted Succesfully" });
    } else {
      res.status(404).json("Product not found");
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error deleting product" });
  }
});
// @route get/api/products
//@desc get as products with optional query filters
//@access public
router.get("/", async (req, res) => {
  try {
    const {
      minPrice,
      maxPrice,
      category,
      collections,
      rating,
      numReviews,
      weight,
      name,
    } = req.query;
    let query = {};

    // Name filter (search by name)
    if (name) {
      query.name = { $regex: name, $options: "i" }; // Case-insensitive search
    }

    // Price range filter
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    // Category filter
    if (category && category.toLowerCase() !== "all") {
      query.category = category;
    }

    // Collections filter
    if (collections && collections.toLowerCase() !== "all") {
      query.collections = collections;
    }

    // Rating filter
    if (rating) {
      query.rating = { $gte: Number(rating) };
    }

    // Number of Reviews filter
    if (numReviews) {
      query.numReviews = { $gte: Number(numReviews) };
    }

    // Weight filter (assuming weight is stored as a number)
    if (weight) {
      query.weight = { $gte: Number(weight) };
    }

    // Fetch filtered products
    const products = await Product.find(query);
    if (!products) {
      res.json("No product found");
    }
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error filtering products" });
  }
});
// @route get/api/products/best-seller
//@desc best seller
//@access public
router.get("/best-seller", async (req, res) => {
  try {
    const bestSeller = await Product.findOne().sort({ rating: -1 });
    if (bestSeller) {
      res.json(bestSeller);
    } else {
      res.status(404).json("Product not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error in similar productt" });
  }
});
// @route get/api/products/new-arrivals
//@descnew arrivals based on created-date
//@access public
router.get("/new-arrivals", async (req, res) => {
  try {
    const product = await Product.find().sort({ createdAt: -1 }).limit(8);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json("Product not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error getting single product" });
  }
});

// @route get/api/products/:id
//@desc get a single product by id
//@access public
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json("Product not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error getting single product" });
  }
});
// @route get/api/products/similar/:id
//@desc similar product based on category and collection
//@access public
router.get("/similar/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) {
      res.status(404).json("Product not found");
    }
    const similarProduct = await Product.find({
      _id: { $ne: id },
      collections: product.collections,
      category: product.category,
    }).limit(4);
    res.json(similarProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error in similar productt" });
  }
});

module.exports = router;
