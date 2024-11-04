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
      refPath: "accountTypeRef",
    },
    status: {
      type: String,
      enum: ["pending", "approved"],
      default: "pending",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

accountDeletionRequestSchema.virtual("accountTypeRef").get(function () {
  switch (this.accountType) {
    case "Tourist":
      return "Tourist";
    case "Tour Guide":
      return "TourGuide";
    case "Advertiser":
      return "Advertiser";
    case "Seller":
      return "Seller";
    default:
      return null;
  }
});

const AccountDeletionRequest = mongoose.model(
  "AccountDeletionRequest",
  accountDeletionRequestSchema
);

module.exports = AccountDeletionRequest;
