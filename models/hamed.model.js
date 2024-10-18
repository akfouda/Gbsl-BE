const mongoose = require("mongoose");

const { Schema } = mongoose;

const hamedSchema = new Schema({
  active: {
    type: Boolean,
    default:true

},

});

module.exports = mongoose.model("hamed", hamedSchema);
