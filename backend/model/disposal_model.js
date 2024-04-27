const mongoose = require("mongoose");
const validator = require("validator");

const disposalSchema = mongoose.Schema({
  name: {
    type: String,
    require: [true, "Name is required"],
  },
});

module.exports = mongoose.model("Disposal", disposalSchema);
