const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserCartSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, // Each user has only one cart
    },
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1, // Quantity must be at least 1
        },
      },
    ],
  },
  { timestamps: true }
);

const UserCart = mongoose.model("UserCart", UserCartSchema);

module.exports = UserCart;
