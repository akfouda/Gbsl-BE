// Importing required modules
// eslint-disable-next-line import/no-extraneous-dependencies, node/no-extraneous-require
const express = require("express");
const {
  getDashboard,
} = require("../services/dashboard.service");

const { allowedTo, protect } = require("../services/auth.service");

const router = express.Router();

// const {
//   getProductValidator,
//   createProductValidator,
//   updateProductValidator,
//   deleteProductValidator,.
// } = require("../utils/productsVaildator");
/**
 * Express Router for managing category-related routes.
 * @module routes/category
 */

/**
 * Route to get category data.
 * @name GET /category
 * @function
 * @memberof module:routes/category
 * @param {string} path - Express path.
 * @param {callback} middleware - Express middleware.
 * @returns {object} - The response object.
 */

// Define routes for handling category operations
router
  .route("/")
  .get(protect, allowedTo("manager"), getDashboard)

module.exports = router;
