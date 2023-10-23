const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/ProductController");

// READ ALL THE PRODUCTS (default order: descendent date )
router.get("/", ProductController.getProducts);

// GET A SPECIFIC PRODUCT
router.get("/:productId", ProductController.getProduct);

// CREATE A PRODUCT
router.post("/", ProductController.createProduct);

//UPDATE A PRODUCT
router.put("/:productId", ProductController.updateProduct);

//DELETE A PRODUCT
router.delete("/:productId", ProductController.deleteProduct);

module.exports = router;
