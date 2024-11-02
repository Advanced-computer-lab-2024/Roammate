const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./User");

const tourGuideSchema = new Schema(
  {
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
    about: {
      type: String,
    },
    review: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
    averageRating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const TourGuide = User.discriminator("TourGuide", tourGuideSchema);
module.exports = TourGuide;
