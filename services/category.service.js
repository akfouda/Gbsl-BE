// Import necessary modules and dependencies
const { default: slugify } = require("slugify");
const asyncHandler = require("express-async-handler");
const categoryModel = require("../models/category.model");
const ApiError = require("../utils/apiErorr");
/**
 * Retrieves paginated categories.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} Paginated list of categories and total count.
 */
const getCategorys = asyncHandler(async (req, res) => {
  // Extract pagination parameters from query or set defaults
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;

  // Retrieve categories based on pagination
  const categories = await categoryModel.find({}).skip(skip).limit(limit);

  // Respond with paginated categories and total count
  res.status(200).json({
    page: page,
    total: categories.length,
    data: categories,
  });
});

/**
 * Retrieves a single category by ID.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const getCategory = asyncHandler(async (req, res, next) => {
  // Extract category ID from request parameters
  const { id } = req.params;

  // Retrieve the category by ID
  const category = await categoryModel.findById(id);

  // Check if category exists
  if (!category) {
    return next(new ApiError("no category found ", 404));
  }

  // Respond with the retrieved category
  res.status(200).json({
    data: category,
  });
});

/**
 * Creates a new category.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} Created category.
 */
const createCategory = asyncHandler(async (req, res) => {
  // Extract category name from request body
  const name = req.body.name;

  // Create a new category with the provided name and slugify the name
  const category = await categoryModel.create({ name, slug: slugify(name) });

  // Respond with the created category
  res.status(201).json({ data: category });
});

/**
 * Updates an existing category by ID.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const updateCategory = asyncHandler(async (req, res, next) => {
  // Extract category ID and updated name from request parameters and body
  const { id } = req.params;
  const { name } = req.body;

  // Update the category by ID with the new name and slugify the name
  const category = await categoryModel.findOneAndUpdate(
    { _id: id },
    { name, slug: slugify(name) },
    { new: true }
  );

  // Check if category exists
  if (!category) {
    return next(new ApiError("no category found", 404));
  }

  // Respond with the updated category
  res.status(200).json({
    data: category,
  });
});

/**
 * Deletes a category by ID.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const deleteCategory = asyncHandler(async (req, res, next) => {
  // Extract category ID from request parameters
  const { id } = req.params;

  // Delete the category by ID
  const category = await categoryModel.findOneAndDelete(id);

  // Check if category exists
  if (!category) {
    return next(new ApiError("no category found", 404));
  }

  // Respond with a success status
  res.status(204).json();
});

// Export controller functions
module.exports = {
  getCategory,
  createCategory,
  getCategorys,
  updateCategory,
  deleteCategory,
};
