const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itineraryBookingSchema = new Schema(
  {
    itinerary: {
      type: Schema.Types.ObjectId,
      ref: "Itinerary",
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["Active", "Cancelled"],
      default: "Active",
    },
  },
  { timestamps: true }
);

const ItineraryBooking = mongoose.model(
  "ItineraryBooking",
  itineraryBookingSchema
);

module.exports = ItineraryBooking;
