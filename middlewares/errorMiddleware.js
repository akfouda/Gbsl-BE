/**
 * Global error handler middleware.
 * @param {Error} err - The error object.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - The next middleware function in the stack.
 */
const globalError = (err, req, res, next) => {
    // Set default status code and status if not provided
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    // Construct error response JSON
    const errorResponse = {
        status: err.status,
        message: err.message || "Internal Server Error",
        error: err
    };

    // Include stack trace if available (only in development)
    if (process.env.NODE_ENV === 'development') {
        errorResponse.stack = err.stack;
    }

    // Send JSON response with appropriate status code
    res.status(err.statusCode).json(errorResponse);
};

module.exports = globalError;
