const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");

//////////////////////////////
//CRUD
//////////////////////////////

//READ ALL THE USERS
router.get("/", UserController.getUsers);

//GET A SPECIFIC USER
router.get("/:userId", UserController.getUser);

//CREATE A USER (REGISTER)
router.post("/register", UserController.registerUser);

// CHECK A USER (LOGIN)
router.post("/login", UserController.loginUser);

//UPDATE A USER
router.put("/:userId", UserController.updateUser);

//DELETE A USER
router.delete("/:userId", UserController.deleteUser);

module.exports = router;
