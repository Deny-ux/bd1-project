const mongoose = require("mongoose");

const boughtProductSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: [true, "Please provide amount of bought products"],
      min: [1, "Number of bought products cannot be less than 1!"],
    },
    buyer: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    productId: {
      type: mongoose.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  },
  { timestamps: true }
);

// boughtProductSchema.virtual("reviews", {
//   ref: "Review",
//   localField: "_id",
//   foreignField: "product",
//   justOne: false,
// });

// boughtProductSchema.pre("remove", async function (next) {
//   await this.model("Review").deleteMany({ product: this._id });
// });

module.exports = mongoose.model("BoughtProduct", boughtProductSchema);
