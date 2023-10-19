const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema({
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "products",
    },
  ],
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Orders", OrderSchema);
