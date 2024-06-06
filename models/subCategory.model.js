const mongoose = require("mongoose");

// Define the schema for the category
const subCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "sub Category is required"],
      unique: true,
    },
    slug: {
      type: String,
      lowercase: true,
    },
    image: String,
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      required: [true, "sub Category must be belong parent category"],
    },
  },
  { timestamps: true }
);

// Create and export the model based on the schema
const SubCategoryModel = mongoose.model("subCategory", subCategorySchema);

module.exports = SubCategoryModel;
