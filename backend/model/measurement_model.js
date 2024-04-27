const mongoose = require("mongoose");
const validator = require("validator");

const measurementSchema = mongoose.Schema({
  name: {
    type: String,
    require: [true, "Name is required"],
  },
  shortName: {
    type: String,
    require: [true, "Short Name is required"],
  },
  unit: {
    type: number,
    require: [true, "Unit is required"],
  },
});

module.exports = mongoose.model("Material", measurementSchema);
