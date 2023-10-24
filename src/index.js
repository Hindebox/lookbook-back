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
mongoose.connect(process.env.DB_URL);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", () => {
  console.log("DB connected");
});

// Serve static files (React app)
app.use(express.static(path.join(__dirname, "client/build")));

// Handle client-side routing
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

//Listen to server
app.listen(process.env.PORT || 2000);
