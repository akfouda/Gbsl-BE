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
  },
  { timestamps: true }
);


const Dashboard = mongoose.model("Dashboard", DashboardSchema);

module.exports = Dashboard;
