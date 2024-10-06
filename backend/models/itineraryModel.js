const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itinerarySchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  activities: [
    {
      type: Schema.Types.ObjectId,
      ref: "Activity", // Reference the Activity schema
      required: true,
    },
  ],
  location: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  language: {
    type: String,
    default: "English",
    required: true,
  },
  availableDates: [
    {
      startDate: { type: Date, required: true },
      endDate: { type: Date, required: true },
    },
  ],
  pickUpDropOffLocation: {
    type: String,
    required: true,
  },
  accessibility: {
    type: Boolean,
    default: false,
  },
  duration: {
    type: Number, // Duration in hours
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Itinerary = mongoose.model("Itinerary", itinerarySchema);

module.exports = Itinerary;
