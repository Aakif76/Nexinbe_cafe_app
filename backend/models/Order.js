const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  customerName: String,
  items: [
    {
      name: String,
      quantity: Number,
      price: Number,
    },
  ],
  total: Number,
  status: { type: String, default: "pending" }, // pending, completed, cancelled
  paymentId: String,
  orderId: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", orderSchema);