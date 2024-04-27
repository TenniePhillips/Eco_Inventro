const mongoose = require("mongoose");
const validator = require("validator");

const materialSchema = mongoose.Schema({
  name: {
    type: String,
    require: [true, "Name is required"],
  },
  measurement: {
    type: String,
    require: [true, "Measure is required"],
  },
  carbon: {
    type: number,
    require: [true, "Carbon is required"],
  },
});

module.exports = mongoose.model("Material", materialSchema);
