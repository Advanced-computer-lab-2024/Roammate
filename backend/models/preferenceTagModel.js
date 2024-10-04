const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const preferenceTagSchema = new Schema(
  {
    name: {
      type: String,
      unique: true, // Ensures the tag names are unique
      required: [true, "Tag name is required"], // Adds a custom error message for required field
      trim: true, // Ensures there are no extra spaces before or after the tag name
      minlength: [3, "Tag name must be at least 3 characters long"], // Ensures the name is not too short
    },
  },
  { timestamps: true }
);

const PreferenceTag = mongoose.model("PreferenceTag", preferenceTagSchema);
module.exports = PreferenceTag;
