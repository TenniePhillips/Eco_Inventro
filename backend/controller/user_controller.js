const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/user_model");

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!email || !password) {
      console.log("req", req.body);
      return res.status(400).json({
        message: "Invalid input",
        success: false,
      });
    }

    if (user && (await bcrypt.compare(password, user.password))) {
      res.status(200).json({
        message: "Logged in",
        data: await User.findOne({ email }).select("-password"),
        token: generateToken(user.id),
        success: true,
      });
    } else {
      // console.log("user data".blue, user.message);
      res.status(400).json({
        message: "Invalid login credential",
        success: false,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message ?? "Invalid login credentials",
      success: false,
    });
  }
};

const fetchUsers = async (req, res) => {
  try {
    const user = await User.find().limit(100);

    if (user) {
      res.status(200).json({
        success: true,
        message: "User found successfully",
        data: user,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
  } catch (error) {
    res.status(400).json({
      message: error.message ?? "Error",
      success: false,
    });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByIdAndDelete(id);

    if (user) {
      res.status(200).json({
        success: true,
        message: "User deleted successfully",
      });
    } else {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
  } catch (error) {
    res.status(400).json({
      message: error.message ?? "Invalid User",
      success: false,
    });
  }
};

const register = async (req, res) => {
  const { name, phone, email, password, userType } = req.body;

  const userExist = await User.findOne({ email });

  if (!name || !phone || !email || !password) {
    res.status(400).json({
      message: "All input fields required",
      success: false,
    });
  }

  if (userExist) {
    // console.log("user data".bgYellow, userExist);
    return res.status(400).json({
      message: "User already exist",
      success: false,
    });
  }

  try {
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    const user = await User.create({
      name,
      phone,
      password: hashPassword,
      email,
      userType,
    })
      .then(async (data) => {
        console.log("register data", data);
        const userData = await User.findOne({ email }).select("-password");
        res.status(200).json({
          message: "Register successfully",
          success: true,
          data: userData,
          token: generateToken(userData._id),
        });
      })
      .catch((error) => {
        res.status(400).json({
          message: error.message ?? "invalid login credentials",
          success: false,
        });
      });
  } catch (error) {
    res.status(500).json({
      message: error.message ?? "Internal server error",
      success: false,
    });
  }
};

generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_KEY, { expiresIn: "30d" });
};

module.exports = {
  login,
  register,
  fetchUsers,
  deleteUser,
};
