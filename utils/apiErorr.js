/**
 * Custom error class for API errors.
 * @class ApiError
 * @extends Error
 */
class ApiError extends Error {
    /**
     * Create an ApiError.
     * @constructor
     * @param {string} message - The error message.
     * @param {number} statusCode - The HTTP status code associated with the error.
     */
    constructor(message, statusCode) {
        super(message);
        /**
         * The HTTP status code associated with the error.
         * @member {number}
         */
        this.statusCode = statusCode;
        /**
         * The status of the error. 'fail' for client errors (4xx), 'error' for server errors (5xx).
         * @member {string}
         */
        this.status = `${statusCode}`.startsWith(4) ? 'fail' : 'error';
        /**
         * Indicates whether the error is operational (true) or programming/system-related (false).
         * @member {boolean}
         */
        this.isOperational = true;
    }
}

module.exports = ApiError;
