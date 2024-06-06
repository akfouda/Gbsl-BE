// Importing required modules
// eslint-disable-next-line import/no-extraneous-dependencies, node/no-extraneous-require
const express = require('express');
const { getCategorys, createCategory, getCategory, updateCategory, deleteCategory } = require('../services/category.service');

const router = express.Router();
const subCategoryRoute = require('./subCategoryRoute');
const {getCategoryValidator , createCategoryValidator,updateCategoryValidator,deleteCategoryValidator}  = require('../utils/categoryVaildator');
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
router.use('/:categoryid/subcategories',subCategoryRoute)
router.route('/').get(getCategorys).post(createCategoryValidator,createCategory); 
router.route('/:id').get(getCategoryValidator,getCategory).put(updateCategoryValidator,updateCategory).delete(deleteCategoryValidator,deleteCategory);

module.exports = router;
