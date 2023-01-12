const mongoose = require("mongoose");

const singleOrderItemSchema = mongoose.Schema({
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
    min: [0, "Tax cannot cost less than 0!s"],
  },
  shippingFee: {
    type: Number,
    required: true,
    min: [0, "Shipping fee cannot cost less than 0!s"],
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
