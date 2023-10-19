const express = require("express");
const Product = require("../models/Product");
const User = require("../models/User");

// READ ALL THE PRODUCTS (default order: descendent date )
const getProducts = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 100;
    const products = await Product.find().sort({ createdAt: -1 }).limit(limit);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET A SPECIFIC PRODUCT
const getProduct = async (req, res, next) => {
  try {
    const specificProduct = await Product.findById({
      _id: req.params.productId,
    });
    res.json(specificProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CREATE A PRODUCT
const createProduct = async (req, res, next) => {
  const { name, description, photos, user, availability } = req.body;
  const newProduct = new Product({
    name,
    description,
    photos,
    user,
    availability,
  });

  const currentUser = await User.findById(user);

  try {
    const savedProduct = await newProduct.save();

    //add the product to the specific user's products
    const userProducts = currentUser.postedProducts;
    userProducts.push(savedProduct);
    await currentUser.save();

    res.json(savedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE A PRODUCT
const updateProduct = async (req, res, next) => {
  const productId = req.params.productId;
  const { name, description, photos, user, availability } = req.body;
  try {
    const updated = await Product.updateOne(
      { _id: productId },
      { $set: { name, description, photos, user, availability } }
    );
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//DELETE A PRODUCT
const deleteProduct = async (req, res, next) => {
  const productId = req.params.productId;

  try {
    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    const userId = deletedProduct.user;

    // Remove the product ID from the postedProducts array of the user
    await User.findByIdAndUpdate(userId, {
      $pull: { postedProducts: deletedProduct._id },
    });

    res.json(deletedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
