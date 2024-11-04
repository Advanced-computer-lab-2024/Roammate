const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
    quantity: {
      type: Number,
      required: true,
    },
    averageRating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    archived: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Create a text index for name and description fields for full-text search
productSchema.index({ name: "text", description: "text" });

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
