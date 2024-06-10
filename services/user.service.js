// Import necessary modules and dependencies
const { default: slugify } = require("slugify");
const asyncHandler = require("express-async-handler");
const UserModle = require("../models/user.model");
const ApiError = require("../utils/apiErorr");

/**
 * Retrieves paginated categories.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} Paginated list of categories and total count.
 */

const getUsers = asyncHandler(async (req, res) => {
  // Extract pagination parameters from query or set defaults
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;
  const total = await UserModle.countDocuments({});

  // Retrieve categories based on pagination
  const userData = await UserModle.find({}).skip(skip).limit(limit);
  // Respond with paginated categories and total count
  res.status(200).json({
    page: page,
    total: total,
    data: userData,
  });
});

/**
 * Retrieves a single category by ID.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const getUser = asyncHandler(async (req, res, next) => {
  // Extract category ID from request parameters
  const { id } = req.params;

  // Retrieve the category by ID
  const User = await UserModle.findById(id);

  // Check if User exists
  if (!User) {
    return next(new ApiError("no User found ", 404));
  }

  // Respond with the retrieved User
  res.status(200).json({
    data: User,
  });
});

/**
 * Creates a new category.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} Created category.
 */
const createUser = asyncHandler(async (req, res) => {
  // Extract category name from request body
  req.body.slug = slugify(req.body.name);

  // Create a new category with the provided name and slugify the name
  const User = await UserModle.create(req.body);

  // Respond with the created category
  res.status(201).json({ data: User, message: "user created successfully" });
});

/**
 * Updates an existing category by ID.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const updateUser = asyncHandler(async (req, res, next) => {
  // Extract category ID and updated name from request parameters and body
  const { id } = req.params;
  req.body.slug = slugify(req.body.clientName);
  // Respond with the created category
  res.status(201).json({ message: "success" });

  // Update the category by ID with the new name and slugify the name
  const User = await UserModle.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
  });

  // Check if User exists
  if (!User) {
    return next(new ApiError("no User  found", 404));
  }

  // Respond with the updated category
  res.status(200).json({
    data: User,
  });
});

/**
 * Deletes a category by ID.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const deleteUser = asyncHandler(async (req, res, next) => {
  // Extract category ID from request parameters
  const { id } = req.params;

  // Delete the category by ID
  const User = await UserModle.findByIdAndDelete(id);

  // Check if User exists
  if (!User) {
    return next(new ApiError("no User found", 404));
  }

  // Respond with a success status
  res.status(204).json();
});

// Export controller functions
module.exports = {
  getUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
};
