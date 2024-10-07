const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const discountSchema = new Schema({
  percentage: {
    type: Number,
    min: 0,
    max: 100,
    required: true,
  },
  description: {
    type: String,
    trim: true,
    default: "",
  },
});

const activitySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    category: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ActivityCategory",
      },
    ],
    tags: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "PreferenceTag",
      },
    ],
    advertiser: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Advertiser",
      },
    ],
    discounts: {
      type: [discountSchema], // Array of discount objects
      default: [], // No discounts by default
    },
    availability: {
      startDate: {
        type: Date,
        required: true,
      },
      endDate: {
        type: Date,
        required: true,
      },
    },
    isBookingAvailable: {
      type: Boolean,
      default: true,
    },
    rating: {
      type: Number,
      default: 5, // Default value is 5 stars
      min: 1,
      max: 5, // Ensures the rating is between 1 and 5
    },
  },
  { timestamps: true }
);

const Activity = mongoose.model("Activity", activitySchema);

module.exports = Activity;
