const mongoose = require("mongoose");

const accountDeletionRequestSchema = new mongoose.Schema(
  {
    accountType: {
      type: String,
      enum: ["Tourist", "Tour Guide", "Advertiser", "Seller"],
      required: true,
    },
    accountId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    status: {
      type: String,
      enum: ["denied", "pending", "approved"],
      default: "pending",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const AccountDeletionRequest = mongoose.model(
  "AccountDeletionRequest",
  accountDeletionRequestSchema
);

module.exports = AccountDeletionRequest;
