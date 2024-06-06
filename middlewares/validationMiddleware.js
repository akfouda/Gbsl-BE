const { validationResult } = require('express-validator');

/**
 * Middleware to handle validation errors.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - The next middleware function in the stack.
 */
const validationMiddleware = (req, res, next) => {
    // Extract validation errors from the request
    const errors = validationResult(req);

    // Check if there are any validation errors
    if (!errors.isEmpty()) {
        // If validation errors exist, respond with a 400 status code and the array of errors
        return res.status(400).json({ errors: errors.array() });
    }

    // If no validation errors, proceed to the next middleware in the stack
    next();
};

module.exports = validationMiddleware;
