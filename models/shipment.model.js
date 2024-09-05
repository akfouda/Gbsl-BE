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
      type: String,
    },
    hsCode: {
      type: String,
    },
    blWeight: {
      type: String,
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
      type: String,
    },
    invoiceAmount: {
      type: String,
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
      type: String,
      required: true,
    },
    customsCertificateNumber: {
      type: String,
    },
    form4Bank: {
      type: String,
    },
    dueDaysOfDemurrage: {
      type: String,
    },
    totalAmountReceived: {
      type: String,
    },
    Doc: {
      type: String,
    },
  },
  {
    timestamps: true,
    // to enable virtual populate
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
const setImageURL = (doc) => {
  console.log(doc, "docccccccccc");
  if (doc.DOC) {
    const imageUrl = doc.DOC;
    doc.image = imageUrl;
  }
};
// findOne, findAll and update
insertShipmentSchema.post("init", (doc) => {
  setImageURL(doc);
});

// create
insertShipmentSchema.post("save", (doc) => {
  setImageURL(doc);
});

module.exports = mongoose.model("InsertShippmentSchema", insertShipmentSchema);
