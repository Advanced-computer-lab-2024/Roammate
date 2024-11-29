const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductWishlistSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  { timestamps: true }
);

const ProductWishlist = mongoose.model(
  "ProductWishlist",
  ProductWishlistSchema
);

module.exports = ProductWishlist;
