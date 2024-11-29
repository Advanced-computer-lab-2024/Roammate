const mongoose = require("mongoose");

const promoCodeSchema = mongoose.Schema(
  {
    code: { type: String, required: true, unique: true },
    discount: { type: Number, required: true }, // Discount percentage or amount
    expirationDate: { type: Date, required: true },
    usageLimit: { type: Number, default: 1 }, // Number of times the code can be used
    usageCount: { type: Number, default: 0 },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    }, // Specific user association (optional based on your requirement)
  },
  { timestamps: true }
);

const PromoCode = mongoose.model("PromoCode", promoCodeSchema);

module.exports = PromoCode;
