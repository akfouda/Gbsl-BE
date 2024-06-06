// Import necessary modules and dependencies
const { default: slugify } = require("slugify");
const asyncHandler = require("express-async-handler");
const ProductModel = require("../models/shipment.model");
const ApiError = require("../utils/apiErorr");
/**
 * Retrieves paginated categories.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} Paginated list of categories and total count.
 */

const getProducts = asyncHandler(async (req, res) => {
  // Extract pagination parameters from query or set defaults
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;

  // Retrieve categories based on pagination
  const product = await ProductModel.find({}).skip(skip).limit(limit);
  // Respond with paginated categories and total count
  res.status(200).json({
    page: page,
    total: product.length,
    data: product,
  });
});

/**
 * Retrieves a single category by ID.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const getProduct = asyncHandler(async (req, res, next) => {
  // Extract category ID from request parameters
  const { id } = req.params;

  // Retrieve the category by ID
  const Product = await ProductModel.findById(id);

  // Check if Product exists
  if (!Product) {
    return next(new ApiError("no Product found ", 404));
  }

  // Respond with the retrieved Product
  res.status(200).json({
    data: Product,
  });
});

/**
 * Creates a new category.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} Created category.
 */
const createProduct = asyncHandler(async (req, res) => {
  // Extract category name from request body
  req.body.slug = slugify(req.body.title);

  // Create a new category with the provided name and slugify the name
  const product = await ProductModel.create(req.body);

  // Respond with the created category
  res.status(201).json({ data: product });
});

/**
 * Updates an existing category by ID.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const updateProduct = asyncHandler(async (req, res, next) => {
  // Extract category ID and updated name from request parameters and body
  const { id } = req.params;
  req.body.slug = slugify(req.body.title);

  // Update the category by ID with the new name and slugify the name
  const product = await ProductModel.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
  });

  // Check if product exists
  if (!product) {
    return next(new ApiError("no product found", 404));
  }

  // Respond with the updated category
  res.status(200).json({
    data: product,
  });
});

/**
 * Deletes a category by ID.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const deleteProduct = asyncHandler(async (req, res, next) => {
  // Extract category ID from request parameters
  const { id } = req.params;

  // Delete the category by ID
  const product = await ProductModel.findByIdAndDelete(id);

  // Check if product exists
  if (!product) {
    return next(new ApiError("no product found", 404));
  }

  // Respond with a success status
  res.status(204).json();
});

// Export controller functions
module.exports = {
  getProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
};
