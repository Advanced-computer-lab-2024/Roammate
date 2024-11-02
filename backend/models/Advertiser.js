const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./User");

const advertiserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
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
  },
  {
    timestamps: true,
  }
);

const Advertiser = User.discriminator("Advertiser", advertiserSchema);
module.exports = Advertiser;
