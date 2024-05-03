const mongoose = require("mongoose");
const validator = require("validator");

const supplierSchema = new mongoose.Schema(
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
    phone: {
      type: String,
      unique: false,
      validate: {
        validator: function (v) {
          return validator.isLength(v, { min: 11, max: 11 });
        },
        message: "Phone Number must be 11 characters",
      },
      require: [true, "Phone Number is required"],
    },
    email: {
      type: String,
      unique: true,
      validate: {
        validator: validator.isEmail,
        message: "Invalid email",
      },
      require: [true, "Email is required"],
    },
    supplier: {
      type: String,
      validate: {
        validator: function (v) {
          return validator.isLength(v, { min: 3 });
        },
        message: "Supplier must be 3 or more characters",
      },
      require: [true, "Supplier is required"],
    },
    address: {
      type: String,
      require: [true, "Address is required"],
    },
    website: {
      type: String,
      require: [true, "Website is required"],
    },
    paymentType: {
      type: String,
      require: [true, "Payment type is required"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Supplier", supplierSchema);
