const mongoose = require("mongoose");

// Define the schema for the category
const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "category is required"],
      unique: true,
      trim: true,
    },
    slug: {
      type: String,
      lowercase: true,
    },
    image: String,
  },

  { timestamps: true }
);

// Create and export the model based on the schema
const CategoryModel = mongoose.model("Category", categorySchema);

module.exports = CategoryModel;
