const mongoose = require("mongoose");
const validator = require("validator");

const SubUser = new mongoose.Schema(
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
    userType: {
      type: String,
      default: "user",
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: [true, "Company is required"],
    },
    password: {
      type: String,
      validate: {
        validator: function (v) {
          return validator.isLength(v, { min: 6 });
        },
        message: "Password must be 6 or more characters",
      },
      require: [true, "Password is required"],
    },
  },
  { timestamps: true }
);

// SubUser.pre("save", function (next) {
//   if (!this.userType) {
//     this.userType = "user";
//   }
//   next();
// });

module.exports = mongoose.model("SubUser", SubUser);
