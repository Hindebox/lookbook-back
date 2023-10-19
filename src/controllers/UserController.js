const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Product = require("../models/Product");

// READ ALL THE USERS
const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET A SPECIFIC USER
const getUser = async (req, res, next) => {
  try {
    const specificUser = await User.findById({
      _id: req.params.userId,
    });
    res.json(specificUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CREATE A USER (REGISTER)
const registerUser = async (req, res, next) => {
  const { firstname, lastname, email, password } = req.body;

  //If user already exists
  const user = await User.findOne({ email });

  if (user) {
    return res.status(409).send({ message: "User already exists!" });
  }

  //Register new user
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    firstname,
    lastname,
    email,
    password: hashedPassword,
  });

  try {
    const savedUser = await newUser.save();
    res.json({ message: "User registred successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CHECK A USER (LOGIN)
const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).send("User not found");
  }

  try {
    const isPswValid = await bcrypt.compare(password, user.password);
    if (isPswValid) {
      // Passwords match, grant access
      const token = jwt.sign({ id: user._id }, "secret");
      return res
        .status(200)
        .json({ token, userID: user._id, message: "Login successful" });
    } else {
      // Passwords don't match, deny access
      return res.status(401).send("Incorrect password");
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
};

// UPDATE A USER
const updateUser = async (req, res, next) => {
  const userId = req.params.userId;
  const { firstname, lastname, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const updated = await User.updateOne(
      { _id: userId },
      { $set: { firstname, lastname, email, password: hashedPassword } }
    );
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE A USER
const deleteUser = async (req, res, next) => {
  const userId = req.params.userId;

  try {
    const toDelete = await User.findByIdAndDelete(userId);

    const products = toDelete.postedProducts;
    await Product.deleteMany({ _id: { $in: products } });

    res.json(toDelete);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getUsers,
  getUser,
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
};
