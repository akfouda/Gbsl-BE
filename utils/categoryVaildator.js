const { check } = require("express-validator");
const validationMiddleware = require("../middlewares/validationMiddleware");

/**
 * Validation middleware for getting a category by ID.
 * @type {Array}
 */
const getCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid Category ID"), // Check if the ID is a valid MongoDB ObjectID
  validationMiddleware, // Apply general validation middleware
];

/**
 * Validation middleware for creating a new category.
 * @type {Array}
 */
const createCategoryValidator = [
  check("name")
    .notEmpty()
    .withMessage("Name is required") // Check if the name field is not empty
    .isLength({ min: 2 })
    .withMessage("Name is short "), // Check if the name length is within limits
  validationMiddleware, // Apply general validation middleware
];

/**
 * Validation middleware for updating an existing category.
 * @type {Array}
 */
const updateCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid Category ID"), // Check if the ID is a valid MongoDB ObjectID
  check("name")
    .optional() // Name is optional for updates
    .isLength({ min: 2 })
    .withMessage("Name is short ") // Check if the name length is within limits
    .custom((value, { req }) => {
      // Custom validation: Name must not be empty if provided
      if (req.body.name === undefined) return true; // Skip validation if name is not provided
      return !req.body.name.trim().length || req.body.name.trim().length > 0; // Check if name is not empty
    })
    .withMessage("Name cannot be empty"), // Error message if name is empty
  validationMiddleware, // Apply general validation middleware
];

/**
 * Validation middleware for deleting a category by ID.
 * @type {Array}
 */
const deleteCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid Category ID"), // Check if the ID is a valid MongoDB ObjectID
  validationMiddleware, // Apply general validation middleware
];

module.exports = {
  getCategoryValidator,
  createCategoryValidator,
  updateCategoryValidator,
  deleteCategoryValidator,
};
