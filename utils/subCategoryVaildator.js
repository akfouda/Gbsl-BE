const { check } = require("express-validator");
const validationMiddleware = require("../middlewares/validationMiddleware");

/**
 * Validation middleware for getting a subCategory by ID.
 * @type {Array}
 */
const getsubCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid subCategory ID"), // Check if the ID is a valid MongoDB ObjectID
  validationMiddleware, // Apply general validation middleware
];

/**
 * Validation middleware for creating a new subCategory.
 * @type {Array}
 */
const createsubCategoryValidator = [
  check("name")
    .notEmpty()
    .withMessage("Name is required") // Check if the name field is not empty
    .isLength({ min: 2})
    .withMessage("Name is short "), // Check if the name length is within limits

  check("category").isMongoId().withMessage("invaild id"),

  validationMiddleware, // Apply general validation middleware
];

/**
 * Validation middleware for updating an existing subCategory.
 * @type {Array}
 */
const updatesubCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid subCategory ID"), // Check if the ID is a valid MongoDB ObjectID
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
 * Validation middleware for deleting a subCategory by ID.
 * @type {Array}
 */
const deletesubCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid subCategory ID"), // Check if the ID is a valid MongoDB ObjectID
  validationMiddleware, // Apply general validation middleware
];

module.exports = {
  getsubCategoryValidator,
  createsubCategoryValidator,
  updatesubCategoryValidator,
  deletesubCategoryValidator,
};
