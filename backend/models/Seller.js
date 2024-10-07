const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./User");

const sellerSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
  },
  description: {
    type: String,
  },
});

const Seller = User.discriminator("Seller", sellerSchema);
module.exports = Seller;