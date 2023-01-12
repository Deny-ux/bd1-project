const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  countryId: {
    type: mongoose.Types.ObjectId,
    ref: "Country",
    required: true,
  },
  street: {
    type: String,
    required: [true, "Please provide street!"],
  },
  postalCode: {
    type: String,
    required: [true, "Please provide postal code!"],
  },
  city: {
    type: String,
    required: [true, "Please provide city!"],
  },
});

module.exports = mongoose.model("Address", addressSchema);
