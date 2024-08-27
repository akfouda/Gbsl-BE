// eslint-disable-next-line import/no-extraneous-dependencies
const multer = require("multer");
const ApiError = require("../utils/apiErorr");
const { put } = require('@vercel/blob');

// Multer configuration
const multerOptions = () => {
  const multerStorage = multer.memoryStorage(); // Store file in memory

  const multerFilter = function (req, file, cb) {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb(new ApiError("Only Images allowed", 400), false);
    }
  };

  return multer({ storage: multerStorage, fileFilter: multerFilter });
};

// Middleware to handle single image upload
exports.uploadSingleImage = (fieldName) => [
  multerOptions().single(fieldName),
  async (req, res, next) => {
    try {
      if (!req.file) return next(new ApiError("No file uploaded", 400));

      // Upload the file to Vercel Blob
      const blob = await put(req.file.originalname, req.file.buffer, {
        access: 'public',
        token: 'vercel_blob_rw_8zw5YhVH0ZFz5I2e_WajLX4PJlKrvbYxZcX2RB4lAP5zf5Z'
      });

      // Log the entire blob response to the console

      // Save the blob URL to req.file so it can be used in the next middleware or route handler
      req.file.url = blob.url;

      next(); // Pass control to the next middleware or route handler
    } catch (error) {
      console.error('Image upload error:', error);
      next(new ApiError(`Image upload failed: ${error.message}`, 500));
    }
  }
];


