const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const locationSchema = require("./Location").schema;

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

const activitySchema = new Schema( // title, description, location, price, category, tags, discount, startDate, endDate, time, isBookingAvailable, reviews, averageRating, advertiser
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: locationSchema,
      required: true,
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
        required: true,
      },
    ],
    tags: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "PreferenceTag",
        required: true,
      },
    ],
    discount: {
      type: [discountSchema],
      default: [],
    },

    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
    },
    time: {
      type: String,
      required: true,
    },
    isBookingAvailable: {
      type: Boolean,
      default: true,
      required: true,
    },
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
    averageRating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    advertiser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Advertiser",
      required: true,
    },
    Appropriate: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

//create text index for title and description fields for full text search
activitySchema.index({ title: "text", description: "text" });

const Activity = mongoose.model("Activity", activitySchema);
module.exports = Activity;
