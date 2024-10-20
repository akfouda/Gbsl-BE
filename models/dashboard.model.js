/* eslint-disable import/no-extraneous-dependencies */
const mongoose = require("mongoose");

const DashboardSchema = new mongoose.Schema(
  {
    totalUser: {
      type: number,
    },
    totalShipment: {
      type: number,
    },
    freeShipment: {
      type: number,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Dashboard = mongoose.model("Dashboard", DashboardSchema);

module.exports = Dashboard;
