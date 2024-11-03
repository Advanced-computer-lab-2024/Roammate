const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const monumentsVisitingSchema = new Schema(
  {
    monument: {
      type: Schema.Types.ObjectId,
      ref: "Monument",
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

const MonumentsVisiting = mongoose.model(
  "MonumentsVisiting",
  monumentsVisitingSchema
);

module.exports = MonumentsVisiting;
