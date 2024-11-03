const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./User");

const sellerSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
    },
    about: {
      type: String,
    },
    documents: {
      identification: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "uploads.files",
      }, // References to uploaded ID
      taxation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "uploads.files",
      }, // References to uploaded Taxation Registration Card
      logo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "uploads.files",
      }, // References to uploaded logo
    },
  },
  {
    timestamps: true,
  }
);

const Seller = User.discriminator("Seller", sellerSchema);
module.exports = Seller;
