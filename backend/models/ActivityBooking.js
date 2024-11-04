const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const activityBookingSchema = new Schema(
  {
    activity: {
      type: Schema.Types.ObjectId,
      ref: "Activity",
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
  },
  { timestamps: true }
);

const ActivityBooking = mongoose.model(
  "ActivityBooking",
  activityBookingSchema
);

module.exports = ActivityBooking;
