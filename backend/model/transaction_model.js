const moment = require("moment");
const mongoose = require("mongoose");
const validator = require("validator");

const TransactionSchema = new mongoose.Schema({
  quantity: {
    type: Number,
    min: 1,
    required: true,
  },
  measurement: {
    type: String,
    required: [true, "Measurement is required"],
    enum: ["KG", "g"],
  },
  material: {
    type: String,
    required: [true, "Material is required"],
    enum: ["Plastic", "Styrofoam", "Biodegradable"],
  },
  action: {
    type: String,
    required: [true, "Aciton is required"],
    enum: ["Recycled", "Raw"],
  },
});

module.exports = mongoose.model("Transactions", TransactionSchema);
