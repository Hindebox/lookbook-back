const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/ProductController");

// READ ALL THE PRODUCTS (default order: descendent date )
router.get("/", ProductController.getProducts);

// GET A SPECIFIC PRODUCT
router.get("/:productId", ProductController.getProduct);

// CREATE A PRODUCT
router.post("/", ProductController.createProduct);

//FIX: is to delete?
// UPDATE A PRODUCT
// router.put("/", async (req, res) => {
//   try {
//     const product = await Product.findById(req.body.productID);
//     const user = await User.findById(req.body.userID);

//     user.postedProducts.push(product);
//     await user.save();
//     res.json({ usersProducts: user.postedProducts });
//   } catch (error) {}
// });

//UPDATE A PRODUCT
router.put("/:productId", ProductController.updateProduct);

//DELETE A PRODUCT
router.delete("/:productId", ProductController.deleteProduct);

module.exports = router;
