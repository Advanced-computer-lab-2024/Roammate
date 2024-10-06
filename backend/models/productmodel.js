const mongoose = require("mongoose");

const schema = mongoose.Schema;

const productSchema = mongoose.Schema({
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
        type: String,
        required: true,
    },
    ratings: {
        type: Number,
        required: false,
        default: 0,
    },
    reviews: {
        type: String,
        required: false,
    },
    quantity: {
        type: Number,
        required: true,
        default: 1,
    },
    
    },

{
    timestamps: true
}
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
