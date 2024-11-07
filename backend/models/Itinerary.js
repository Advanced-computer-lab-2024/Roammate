const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itinerarySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    duration: {
      type: String,
      required: true,
    },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    timeline: [
      {
        day: { type: Number, required: true },
        plan: [
          {
            startTime: { type: String, required: true },
            activity: { type: String, required: true },
            location: { type: String, required: true },
            description: { type: String },
            accessibility: { type: Boolean, default: false },
          },
        ],
      },
    ],
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    lang: {
      type: String,
      default: "English",
      required: true,
    },
    pickUpLocation: {
      type: String,
      required: true,
    },
    dropOffLocation: {
      type: String,
      required: true,
    },
    isBookingAvailable: {
      type: Boolean,
      required: true,
    },
    tags: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "PreferenceTag",
      },
    ],
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
    tourGuide: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TourGuide",
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    Appropriate: {
      type: Boolean,
      default: true,
    },
    
  },
  { timestamps: true }
);

// Create text index for title and description for full text search
itinerarySchema.index({
  title: "text",
  "timeline.plan.description": "text",
});

const Itinerary = mongoose.model("Itinerary", itinerarySchema);

module.exports = Itinerary;
