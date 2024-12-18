const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./User");

const advertiserSchema = new Schema(
  {
    website: {
      type: String,
    },
    hotline: {
      type: String,
    },
    companyProfile: {
      description: { type: String },
      foundedYear: { type: Number },
      industry: { type: String },
      location: { type: String },
      employees: { type: Number },
      services: { type: [String] },
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

const Advertiser = User.discriminator("Advertiser", advertiserSchema);
module.exports = Advertiser;
