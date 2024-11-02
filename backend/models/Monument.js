const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const locationSchema = require("./Location").schema;

const muonumentsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    pictures: [
      {
        type: String,
        required: true,
      },
    ],
    location: {
      type: locationSchema,
      required: true,
    },
    openingHours: [
      {
        day: {
          type: String,
          required: true,
        },
        open: {
          type: String,
          required: true,
        },
        close: {
          type: String,
          required: true,
        },
      },
    ],
    ticketPrices: [
      {
        for: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    tags: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "PreferenceTag",
      },
    ],
    monumentTags: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "MonumentTag",
      },
    ],
    tourismGovernor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);
// create text index for name and description fields for full text search
muonumentsSchema.index({ name: "text", description: "text" });

const Monument = mongoose.model("Monument", muonumentsSchema);
module.exports = Monument;
