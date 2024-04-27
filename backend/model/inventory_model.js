const mongoose = require("mongoose");
const validator = require("validator");

const InventorySchema = new mongoose.Schema({
  name: {
    type: String,
    validate: {
      validator: function (v) {
        return validator.isLength(v, { min: 3 });
      },
      message: "Name must be 3 or more characters",
    },
    require: [true, "Name is required"],
  },
  quatity: {
    type: Number,
    min: 1,
    required: true,
  },
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Supplier",
    require: [true, "Supplier is required"],
  },
  orderDate: {
    type: Date,
    validate: {
      validator: function (value) {
        // Custom validation function to check if the date is not in the past
        return value >= new Date();
      },
      message: "Date cannot be in the past",
    },
    required: true,
  },
  deliveryDate: {
    type: Date,
    validate: {
      validator: function (value) {
        // Custom validation function to check if the date is not in the past
        return value >= new Date();
      },
      message: "Date cannot be in the past",
    },
    required: true,
  },
  disposal: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Disposal",
  },
  measurement: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Measurement",
  },
  material: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Material",
  },
});

module.exports = mongoose.model("User", InventorySchema);
