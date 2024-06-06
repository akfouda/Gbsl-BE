// Import necessary modules and dependencies
const { default: slugify } = require("slugify");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiErorr");
const subcategoryModel = require("../models/subCategory.model");

const filterSubCategoryById = (req, res, next) => {
  let filterSubcategories = {};
  if (req.params.categoryid)
    filterSubcategories = { category: req.params.categoryid };
  req.filterSubcategories = filterSubcategories;
  next();
};

/**
 * Retrieves paginated categories.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} Paginated list of categories and total count.
 */
const getsubsubcategories = asyncHandler(async (req, res) => {
  // Extract pagination parameters from query or set defaults
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;
  // Retrieve categories based on pagination
  const subcategories = await subcategoryModel
    .find(req.filterSubcategories)
    .skip(skip)
    .limit(limit)
    .populate({ path: "category", select: "name" });

  // Respond with paginated categories and total count
  res.status(200).json({
    page: page,
    total: subcategories.length,
    data: subcategories,
  });
});

/**
 * Retrieves a single subcategory by ID.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const getSubsubcategory = asyncHandler(async (req, res, next) => {
  // Extract subcategory ID from request parameters
  const { id } = req.params;

  // Retrieve the subcategory by ID
  const subcategory = await subcategoryModel
    .findById(id)
    .populate({ path: "category", select: "name" });

  // Check if subcategory exists
  if (!subcategory) {
    return next(new ApiError("no subcategory found ", 404));
  }

  // Respond with the retrieved subcategory
  res.status(200).json({
    data: subcategory,
  });
});

/**
 * Updates an existing subcategory by ID.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const setcategoryidToBody = (req, res, next) => {
  if (!req.body.category) req.body.category = req.params.categoryid;
  next();
};
/**
 * Creates a new subsubcategory.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} Created subsubcategory.
 */
const Createsubcategory = asyncHandler(async (req, res) => {
  // Extract subcategory name from request body
  const { name, category } = req.body;

  // Create a new subcategory with the provided name and slugify the name
  const subsubcategory = await subcategoryModel.create({
    name,
    category,
    slug: slugify(name),
  });

  // Respond with the created subcategory
  res.status(201).json({ data: subsubcategory });
});

/**
 * Updates an existing subcategory by ID.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const updatesubcategory = asyncHandler(async (req, res, next) => {
  // Extract subcategory ID and updated name from request parameters and body
  const { id } = req.params;
  const { name, category } = req.body;

  // Update the subcategory by ID with the new name and slugify the name
  const subcategory = await subcategoryModel.findOneAndUpdate(
    { _id: id },
    { name, category, slug: slugify(name) },
    { new: true }
  );

  // Check if subcategory exists
  if (!subcategory) {
    return next(new ApiError("no subcategory found", 404));
  }

  // Respond with the updated subcategory
  res.status(200).json({
    data: subcategory,
  });
});

/**
 * Deletes a subcategory by ID.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const deletesubcategory = asyncHandler(async (req, res, next) => {
  // Extract subcategory ID from request parameters
  const { id } = req.params;

  // Delete the subcategory by ID
  const subcategory = await subcategoryModel.findOneAndDelete(id);

  // Check if subcategory exists
  if (!subcategory) {
    return next(new ApiError("no subcategory found", 404));
  }

  // Respond with a success status
  res.status(204).json();
});

// Export controller functions
module.exports = {
  Createsubcategory,
  getsubsubcategories,
  getSubsubcategory,
  deletesubcategory,
  updatesubcategory,
  setcategoryidToBody,
  filterSubCategoryById,
};
