const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      immutable: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: [
        "tourist",
        "tour guide",
        "advertiser",
        "seller",
        "tourism governor",
        "admin",
      ],
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "pending"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
