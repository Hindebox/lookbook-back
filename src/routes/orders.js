const express = require("express");
const router = express.Router();
const OrderController = require("../controllers/OrderController");
const Order = require("../models/Order");
const Product = require("../models/Product");

// READ ALL THE ORDERS
router.get("/", OrderController.getOrders);

// ORDER WITH ITEMS FROM THE SAME OWNER and BUYER
router.get("/order", OrderController.getOrdersByOwnerAndBuy);

// ORDERS WITH THE SAME BUYER
router.get("/userOrders", OrderController.getOrdersSameBuyer);

// CREATE A ORDER
router.post("/", OrderController.createOrder);

// UPDATE A ORDER
router.put("/:orderId", OrderController.updateOrder);

// DELETE A ORDER
router.delete("/:orderId", OrderController.deleteOrder);

module.exports = router;
