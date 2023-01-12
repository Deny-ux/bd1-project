const mongoose = require("mongoose");
const _ = require("lodash");

const countrySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide name of a country!"],
  },
  capital: {
    type: String,
    required: [true, "Please provide capital!"],
  },
  language: {
    type: String,
    required: [true, "Please provide language!"],
  },
  currency: {
    type: String,
    required: [true, "Please provide currency!"],
  },
});

countrySchema.pre("save", function () {
  console.log("trigger from country schema!");
  this.currency = this.currency.toUpperCase();
  this.name = this.name.toLowerCase();
  this.name = _.startCase(this.name);
});

module.exports = mongoose.model("Country", countrySchema);
