const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

//IMPORT ROUTES
const productsRoute = require("./routes/products");
const usersRoute = require("./routes/users");
const ordersRoute = require("./routes/orders");

//MIDDLEWEARS
app.use(express.json());
app.use(cors());
app.use("/products", productsRoute);
app.use("/users", usersRoute);
app.use("/swapOrders", ordersRoute);

//CONNECT TO DB
//FIX: add the db name before ? in env
mongoose.connect(process.env.DB_URL);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", () => {
  console.log("DB connected");
});
//FIX: add if error

//Listen to server
app.listen(2000);
