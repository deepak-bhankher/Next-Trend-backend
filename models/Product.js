const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    images: {
      type: [String], // image URLs ki list
      required: true,
    },
    category: {
      type: String, // jaise "Running", "Casual", "Sports", "Formal"
      required: true,
    },
    sizes: {
      type: [Number], // jaise [6, 7, 8, 9, 10]
      required: true,
    },
    colors: {
      type: [String], // jaise ["Black", "White", "Red"]
      default: [],
    },
    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
    rating: {
      type: Number,
      default: 0,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;