const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const activityCategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true, // Ensure the category name is unique
      trim: true, // Removes any extra spaces from the category name
    },
  },
  { timestamps: true }
);

const ActivityCategory = mongoose.model(
  "ActivityCategory",
  activityCategorySchema
);

module.exports = ActivityCategory;
