// Importing required modules
// eslint-disable-next-line import/no-extraneous-dependencies, node/no-extraneous-require
const express = require("express");
const {
create,
get,
deleteOne,
getAll,
update
} = require("../services/hamed.service");

const { allowedTo, protect } = require("../services/auth.service");

const router = express.Router();

// Define routes for handling category operations
router
  .route("/")
  .get( getAll)
  .post(create);
router
  .route("/:id")
  .get( get)
  .put(update)
  .delete( deleteOne);

module.exports = router;
