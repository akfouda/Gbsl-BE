const factory = require("../utils/handlersFactory");
const Hamed = require("../models/hamed.model");

// @desc    Get list of Hamed
// @route   GET /api/v1/Hamed
// @access  Public
exports.getAll = factory.getAll(Hamed);

// @desc    Get specific Hamed by id
// @route   GET /api/v1/Hamed/:id
// @access  Public
exports.get = factory.getOne(Hamed);

// @desc    Create Hamed
// @route   POST  /api/v1/Hamed
// @access  Private
exports.create = factory.createOne(Hamed);

// @desc    Update specific Hamed
// @route   PUT /api/v1/Hamed/:id
// @access  Private
exports.update = factory.updateOne(Hamed);

// @desc    Delete specific Hamed
// @route   DELETE /api/v1/Hamed/:id
// @access  Private
exports.deleteOne = factory.deleteOne(Hamed);
