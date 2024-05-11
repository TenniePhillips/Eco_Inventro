const moment = require("moment");
const mongoose = require("mongoose");
const validator = require("validator");

const InventorySchema = new mongoose.Schema(
  {
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
    quantity: {
      type: Number,
      min: 1,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    supplier: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Supplier",
      require: [true, "Supplier is required"],
    },
    orderDate: {
      type: Date,
      required: true,
    },
    deliveryDate: {
      type: Date,
      validate: {
        validator: function (value) {
          return value >= this.orderDate;
        },
        message: "Delivery date must be after or equal to order date",
      },
      required: true,
    },
    measurement: {
      type: String,
      required: [true, "Measurement is required"],
      enum: ["KG", "g"],
    },
    status: {
      type: String,
      default: "pending",
      enum: ["pending", "delivered"],
    },
    material: {
      type: String,
      required: [true, "Material is required"],
      enum: ["Plastic", "Styrofoam", "Biodegradable"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Inventory", InventorySchema);
