const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productPurchasingSchema = new Schema(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["Preparing", "Shipped", "Completed", "Cancelled"],
      default: "Preparing",
    },
    paymentMethod: {
      type: String,
      enum: ["Cash", "Wallet", "Card"],
      required: true,
    },
  },
  { timestamps: true }
);

const ProductPurchasing = mongoose.model(
  "ProductPurchasing",
  productPurchasingSchema
);

module.exports = ProductPurchasing;
