// Import necessary modules and dependencies
const asyncHandler = require("express-async-handler");
const UserModle = require("../models/user.model");
const ShipMentModel = require("../models/shipment.model");

/**
 * Retrieves paginated categories.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} Paginated list of categories and total count.
 */

const getDashboard = asyncHandler(async (req, res) => {
  // Retrieve categories based on pagination
  const userCount = await UserModle.countDocuments({});
  const shipMentCount = await ShipMentModel.countDocuments({});
  // Adjust the condition for freeShipMent
  const freeShipMentCount = await ShipMentModel.countDocuments({
    freeDays: { $exists: true, $ne: null },
  });

  // Respond with paginated categories and total count
  res.status(200).json({
    users: userCount,
    shipMents: shipMentCount,
    freeShipMent: freeShipMentCount,
  });
});


// Export controller functions
module.exports = {
  getDashboard,
};
