const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema(
  {
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: [true, "Please provide rating"],
    },
    comment: {
      type: String,
      required: [true, "Please provide review text"],
      minLength: [20, "Comment should contain at least 20 characters!"],
      maxLength: [500, "Comment length cannot exceed 500 characters!"],
    },
    writtenBy: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    product: {
      type: mongoose.Schema.ObjectId,
      ref: "Product",
      required: true,
    },
  },
  { timestamps: true }
);

// To ensure that each user can comment only one product
reviewSchema.index({ product: 1, user: 1 }, { unique: true });

reviewSchema.pre("save", function () {
  console.log("from pre save in review");
  console.log(this.writtenBy);
});

reviewSchema.methods.calcAverageRating = async function () {};

module.exports = mongoose.model("Review", reviewSchema);
