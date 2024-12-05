const mongoose = require("mongoose");
const notificationSchema = require("./Notification");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      immutable: true,
    },
    email: {
      type: String,
      // required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    otp: { type: String, default: null },
    otpExpiresAt: { type: Date, default: null },
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
      enum: ["guest", "pending", "accepted", "active"],
      default: "guest",
    },
    deliveryAddresses: [
      {
        type: Schema.Types.ObjectId,
        ref: "DeliveryAddress",
      },
    ],
    notifications: [notificationSchema],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
