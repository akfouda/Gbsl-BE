// Import necessary modules and dependencies
const asyncHandler = require("express-async-handler");
const UserModle = require("../models/user.model");
const ShipMentModle = require("../models/shipment.model");

/**
 * Retrieves paginated categories.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} Paginated list of categories and total count.
 */

const getDashboard = asyncHandler(async (req, res) => {
  // Retrieve categories based on pagination
  const userCount = await UserModle.countDocuments({});
  const shipMentCount = await ShipMentModle.countDocuments({});
  const freeShipMent = await ShipMentModle.find({
    freeDays: true,
  }).countDocuments({});
  // Respond with paginated categories and total count
  res.status(200).json({
    users: userCount,
    shipMents: shipMentCount,
    freeShipMent: freeShipMent,
  });
});

// Export controller functions
module.exports = {
  getDashboard,
};
