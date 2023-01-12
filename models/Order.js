const mongoose = require("mongoose");

const singleOrderItemSchema = mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  amount: { type: Number, required: true },
  productId: {
    type: mongoose.Schema.ObjectId,
    ref: "Product",
    required: true,
  },
});

const orderSchema = mongoose.Schema({
  tax: {
    type: Number,
    required: [true, "Please provide tax"],
  },
  subtotal: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "failed", "paid", "delivered", "canceled"],
    default: "pending",
  },
  buyer: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  clientSecret: {
    type: String,
    required: true,
  },
  orderItems: [singleOrderItemSchema],
  paymentIntentId: {
    type: String,
  },
});

module.exports = mongoose.model("Order", orderSchema);
