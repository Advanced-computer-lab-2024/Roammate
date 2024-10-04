const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const testSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Tag name is required"], // Custom error message for required field
    },
    preferenceTags: [
      {
        type: Schema.Types.ObjectId,
        ref: "PreferenceTag", // Reference to PreferenceTag model
      },
    ],
  },
  { timestamps: true }
);

const TestSchema = mongoose.model("TestSchema", testSchema);
module.exports = TestSchema;
