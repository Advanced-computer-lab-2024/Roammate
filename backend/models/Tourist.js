const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./User");

const touristSchema = new Schema(
  {
    mobile: {
      type: String,
      unique: true,
      required: true,
      sparse: true,
    },
    nationality: {
      type: String,
      required: true,
    },
    DOB: {
      type: Date,
      immutable: true,
      required: true,
    },
    job: {
      type: String,
      required: true,
    },
    wallet: {
      type: Number,
      default: 2000,
    },
    preferredCurrency: {
      type: String,
      enum: ["USD", "EGP", "EUR"], // List the currencies you support
      default: "EGP",
    },
    points: {
      type: Number,
      default: 0,
    },
    level: {
      type: Number,
      default: 1,
    },
    bookedTransportations: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Transportation",
      },
    ], // Add array of booked transportations

    preferences: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "PreferenceTag",
      },
    ],
    activityCategories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ActivityCategory",
      },
    ],
    birthdayPromoSent: {
      type: Date, // Store the date when the promo was last sent
      default: null,
    },
    bookmarkedActivities: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Activity",
      },
          ],

    bookmarkedItineraries: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Itinerary",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Tourist = User.discriminator("Tourist", touristSchema);
module.exports = Tourist;
