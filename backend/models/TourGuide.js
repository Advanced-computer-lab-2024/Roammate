const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./User");

const tourGuideSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  mobile: {
    type: String,
    unique: true,
    sparse: true,
  },
  yearsOfExperience: {
    type: Number,
  },
  previousWork: {
    type: [String],
  },
  languages: {
    type: [String],
  },
  description: {
    type: String,
  },
});

const TourGuide = User.discriminator("TourGuide", tourGuideSchema);
module.exports = TourGuide;
