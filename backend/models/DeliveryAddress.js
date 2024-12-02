const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the Delivery Address schema
const deliveryAddressSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      immutable: true,
    },
    addressLine1: {
      type: String,
      required: true,
    },
    addressLine2: {
      type: String,
      required: false,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: false,
    },
    postalCode: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    isDefault: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Create and export the DeliveryAddress model
const DeliveryAddress = mongoose.model(
  "DeliveryAddress",
  deliveryAddressSchema
);
module.exports = DeliveryAddress;
