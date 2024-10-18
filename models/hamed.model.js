/* eslint-disable import/no-extraneous-dependencies */
const mongoose = require("mongoose");

const HamedSchema = new mongoose.Schema(
{
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);



const User = mongoose.model("Hamed", HamedSchema);

module.exports = User;
