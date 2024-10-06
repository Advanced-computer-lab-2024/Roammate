const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const museumSchema = new Schema(
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
        required: false,
      },
    ],
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
    ticketPrice: {
      type: Number,
      required: true,
    },
    tags: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "PreferenceTag",
      },
    ],
  },
  { timestamps: true }
);

const Museum = mongoose.model("Museum", museumSchema);
module.exports = Museum;
