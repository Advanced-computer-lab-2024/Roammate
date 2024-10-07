const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const museumTagsSchema = new Schema(
  {
    type: {
      type: String,
      enum: ["Type", "Historical Period"], // Enum for type values
      required: [true, "Type is required"], // Ensures type is provided
    },
    value: {
      type: String,
      required: [true, "Value is required"], // Ensures value is provided
      trim: true, // Trims whitespace from the value
    },
  },
  { timestamps: true } // Automatically manages createdAt and updatedAt fields
);

const MuseumTag = mongoose.model("MuseumTag", museumTagsSchema);
module.exports = MuseumTag;
