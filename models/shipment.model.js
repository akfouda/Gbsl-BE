const mongoose = require("mongoose");

const insertShipmentSchema = new mongoose.Schema(
  {
    clientName: {
      type: String,
      required: true,
      trim: true,
      minlength: [3, "Too short clientName"],
      maxlength: [20, "Too long clientName"],
    },
    slug: {
      type: String,
      required: true,
      lowercase: true,
    },
    checked: {
      type: Boolean,
      default: false,
    },
    blNumber: {
      type: Number,
    },
    hsCode: {
      type: String,
    },
    blWeight: {
      type: Number,
    },
    manufacturerName: {
      type: String,
      trim: true,
    },
    notifyPartyName: {
      type: String,
    },
    cargoxUploadDate: {
      type: Date,
    },

    containersNumber: {
      type: String,
    },
    invoiceDate: {
      type: Date,
    },
    invoiceNumber: {
      type: Number,
    },
    invoiceAmount: {
      type: Number,
    },
    invoiceDueDate: {
      type: Date,
    },
    brokerName: {
      type: String,
    },
    kgPrice: {
      type: String,
    },
    freeDays: {
      type: String,
    },
    pod: {
      type: String,
    },
    podArriveDate: {
      type: Date,
    },
    form4Status: {
      type: String,
    },
    storageInvFees: {
      type: String,
    },
    docAtOfficeDate: {
      type: Date,
    },
    material: {
      type: String,
    },
    customsFinishingDate: {
      type: Date,
    },
    customsFeesReceivingDate: {
      type: Date,
    },
    acidNumber: {
      type: Number,
      required: true,
    },
    customsCertificateNumber: {
      type: Number,
    },
    form4Bank: {
      type: String,
    },
    dueDaysOfDemurrage: {
      type: String,
    },
    totalAmountReceived: {
      type: Number,
    },
  },
  {
    timestamps: true,
    // to enable virtual populate
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

module.exports = mongoose.model("InsertShippmentSchema", insertShipmentSchema);
