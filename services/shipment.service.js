// Import necessary modules and dependencies
const { default: slugify } = require("slugify");
const asyncHandler = require("express-async-handler");
const ShipMentModel = require("../models/shipment.model");
const ApiError = require("../utils/apiErorr");

const filterSubCategoryById = (req, res, next) => {
  let filterShipment = {};
  if (req.params.clientName)
    filterShipment = { clientName: req.params.clientName };
  req.filterShipment = filterShipment;
  next();
};
/**
 * Retrieves paginated categories.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} Paginated list of categories and total count.
 */

const getShipments = asyncHandler(async (req, res) => {
  // Build the query object
  // eslint-disable-next-line prefer-const
  let query = {};
  // eslint-disable-next-line no-undef
  if (req.query.acidNumber) {
    query.acidNumber = req.query.acidNumber; // Case-insensitive match (if needed, use regex)
  }
  if (req.query.blNumber) {
    query.blNumber = req.query.blNumber; // Direct match or use regex if needed
  }
  if (req.query.clientName) {
    query.clientName = req.query.clientName; // Direct match or use regex if needed
  }
  if (req.query.invoiceNumber) {
    query.invoiceNumber = req.query.invoiceNumber; // Direct match or use regex if needed
  }
  if (req.query.material) {
    query.material = req.query.material; // Direct match or use regex if needed
  }
  if (req.query.customsCertificateNumber) {
    query.customsCertificateNumber = req.query.customsCertificateNumber; // Direct match or use regex if needed
  }
  console.log('Query:', query);

  // Extract pagination parameters from query or set defaults
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;
  const total = await ShipMentModel.countDocuments(query);

  // Retrieve categories based on pagination
  const shippmentdata = await ShipMentModel.find(query).skip(skip).limit(limit);
  // Respond with paginated categories and total count
  res.status(200).json({
    page: page,
    total: total,
    data: shippmentdata,
  });
});

/**
 * Retrieves a single category by ID.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const getShipment = asyncHandler(async (req, res, next) => {
  // Extract category ID from request parameters
  const { id } = req.params;

  // Retrieve the category by ID
  const shipment = await ShipMentModel.findById(id);

  // Check if shipment exists
  if (!shipment) {
    return next(new ApiError("no shipment found ", 404));
  }

  // Respond with the retrieved shipment
  res.status(200).json({
    data: shipment,
  });
});

/**
 * Creates a new category.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} Created category.
 */
const createShipment = asyncHandler(async (req, res) => {
  // Extract category name from request body
  req.body.slug = slugify(req.body.clientName);

  // Create a new category with the provided name and slugify the name
  const shipment = await ShipMentModel.create(req.body);

  // Respond with the created category
  res.status(201).json({ message: "success" });
});

/**
 * Updates an existing category by ID.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const updateShipment = asyncHandler(async (req, res, next) => {
  // Extract category ID and updated name from request parameters and body
  const { id } = req.params;
  req.body.slug = slugify(req.body.clientName);
  // Respond with the created category
  res.status(201).json({ message: "success" });

  // Update the category by ID with the new name and slugify the name
  const shipment = await ShipMentModel.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
  });

  // Check if shipment exists
  if (!shipment) {
    return next(new ApiError("no shipment  found", 404));
  }

  // Respond with the updated category
  res.status(200).json({
    data: shipment,
  });
});

/**
 * Deletes a category by ID.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const deleteShipment = asyncHandler(async (req, res, next) => {
  // Extract category ID from request parameters
  const { id } = req.params;

  // Delete the category by ID
  const shipment = await ShipMentModel.findByIdAndDelete(id);

  // Check if shipment exists
  if (!shipment) {
    return next(new ApiError("no shipment found", 404));
  }

  // Respond with a success status
  res.status(204).json();
});

// Export controller functions
module.exports = {
  getShipments,
  createShipment,
  getShipment,
  updateShipment,
  deleteShipment,
  filterSubCategoryById,
};
