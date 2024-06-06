// Importing required modules
// eslint-disable-next-line import/no-extraneous-dependencies, node/no-extraneous-require
const express = require("express");
const {
  Createsubcategory,
  getsubsubcategories,
  getSubsubcategory,
  deletesubcategory,
  updatesubcategory,
  setcategoryidToBody,
  filterSubCategoryById
} = require("../services/subCategory.service");

const router = express.Router({ mergeParams: true });
const {
  getsubCategoryValidator,
  createsubCategoryValidator,
  updatesubCategoryValidator,
  deletesubCategoryValidator,
} = require("../utils/subCategoryVaildator");
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
  .get(filterSubCategoryById,getsubsubcategories)
  .post(setcategoryidToBody, createsubCategoryValidator,Createsubcategory);
router
  .route("/:id")
  .get(getsubCategoryValidator,getSubsubcategory)
  .put(updatesubCategoryValidator,updatesubcategory)
  .delete(deletesubCategoryValidator,deletesubcategory);

module.exports = router;
