const factory = require("../utils/handlersFactory");
const hamed = require("../models/hamed.model");

// @desc    Get list of hamed
// @route   GET /api/v1/hamed
// @access  Public
exports.getAll = factory.getAll(hamed);

// @desc    Get specific hamed by id
// @route   GET /api/v1/hamed/:id
// @access  Public
exports.get = factory.getOne(hamed);

// @desc    Create hamed
// @route   POST  /api/v1/hamed
// @access  Private
exports.create = factory.createOne(hamed);

// @desc    Update specific hamed
// @route   PUT /api/v1/hamed/:id
// @access  Private
exports.update = factory.updateOne(hamed);

// @desc    Delete specific hamed
// @route   DELETE /api/v1/hamed/:id
// @access  Private
exports.deleteOne = factory.deleteOne(hamed);
