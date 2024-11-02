const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const monumentTagSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: [true, "Tag name is required"],
      trim: true,
      minlength: [3, "Tag name must be at least 3 characters long"],
    },
  },
  { timestamps: true }
);
//create text index for name field for full text search
monumentTagSchema.index({ name: "text" });

const MonumentTag = mongoose.model("MonumentTag", monumentTagSchema);
module.exports = MonumentTag;
