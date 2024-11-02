const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const activityCategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
  },
  { timestamps: true }
);

//create text index for name field
activityCategorySchema.index({ name: "text" });

const ActivityCategory = mongoose.model(
  "ActivityCategory",
  activityCategorySchema
);

module.exports = ActivityCategory;
