const express = require("express");
const mongoose = require("mongoose");
const Order = require("../models/Order");
const Product = require("../models/Product");

// READ ALL THE ORDERS
const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET SORTED ORDERS
const getSortedOrders = async (req, res, next) => {
  const filter = req.query.filter;
  const sortOrder = req.query.sortOrder;

  let orders;
  try {
    if (filter === "date") {
      const sortDirection = sortOrder === "asc" ? 1 : -1;
      orders = await Order.find().sort({ createdAt: sortDirection });
    } else if (filter === "products") {
      //here I want to sort by the number of products in the order
      const sortDirection = sortOrder === "asc" ? 1 : -1;
      orders = await Order.aggregate([
        {
          $project: {
            _id: 1,
            products: 1,
            users: 1,
            numOfProducts: {
              $size: "$products",
            },
          },
        },
        {
          $sort: {
            numOfProducts: sortDirection,
          },
        },
      ]);
    }

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET THE ORDERS WITH THE SAME BUYER AND OWNER
const getOrdersByOwnerAndBuy = async (req, res, next) => {
  const ownerUserID = req.query.ownerUserID;
  const buyerUserID = req.query.buyerUserID;

  try {
    const orders = await Order.findOne({
      users: [ownerUserID, buyerUserID],
    });

    console.log(orders);
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET THE ORDERS WITH THE SAME BUYER
const getOrdersSameBuyer = async (req, res, next) => {
  const buyerUserID = req.query.buyerUserID;
  const filter = req.query.filter;
  const sortOrder = req.query.sortOrder;

  try {
    let orders = await Order.find({
      "users.1": buyerUserID,
    });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CREATE A ORDER
const createOrder = async (req, res, next) => {
  const ownerUserID = req.query.ownerUserID;
  const buyerUserID = req.query.buyerUserID;

  try {
    const { products, users } = req.body;

    // Check if there is an existing order with the same product owner
    const existingOrder = await Order.findOne({
      users: [ownerUserID, buyerUserID],
    });

    if (existingOrder) {
      existingOrder.products.push(...products);
      await existingOrder.save();
      // console.log("EXISTING ORDER", existingOrder);
      res.json(existingOrder);
    } else {
      // If there is no existing order, create a new order with the given products and users
      const newOrder = new Order({ products, users });
      const savedOrder = await newOrder.save();
      // console.log("NEW ORDER", savedOrder);
      res.json(savedOrder);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE A ORDER
const updateOrder = async (req, res, next) => {
  const orderId = req.params.orderId;
  const { products, users } = req.body;

  try {
    const updated = await Order.updateOne(
      { _id: orderId },
      { $set: { products, users } }
    );
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE A ORDER
const deleteOrder = async (req, res, next) => {
  try {
    const toDelete = await Order.deleteOne({ _id: req.params.orderId });
    res.json(toDelete);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getOrders,
  getOrdersByOwnerAndBuy,
  getOrdersSameBuyer,
  createOrder,
  updateOrder,
  deleteOrder,
  getSortedOrders,
};
