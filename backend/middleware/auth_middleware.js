const jwt = require("jsonwebtoken");
const User = require("../model/user_model");

const protect = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Access token is missing" });
  }

  // Verify the token
  jwt.verify(token, "inventro8080", async (err, decoded) => {
    if (err) {
      return res.status(403).json({ success: false, message: "Invalid token" });
    }

    try {
      // Find the user associated with the token
      const user = await User.findById(decoded.id);

      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      }

      // Attach the user object to the request for further processing
      req.user = user;

      // Proceed to the next middleware or route handler
      next();
    } catch (error) {
      console.error("Error authenticating token:", error);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  });
  // let token;
  // if (
  //   req.headers.authorization &&
  //   req.headers.authorization.startsWith("Bearer")
  // ) {
  //   try {
  //     token = req.headers.authorization.split(" ")[1];

  //     let decode = jwt.verify(token, process.env.JWT_KEY);

  //     req.user = await User.findById(decode.id).select("-password");

  //     next();
  //   } catch (error) {
  //     console.log(error);
  //     res.status(401);
  //     throw new Error("Not authorized");
  //   }
  // } else {
  //   res.status(401).json({
  //     success: false,
  //     message: "Not authorized",
  //   });
  //   throw new Error("Error unauthorized");
  // }

  // if (!token) {
  //   console.log(error);
  //   res.status(401).json({
  //     message: "Not authorized",
  //   });
  //   throw new Error(error.message ?? "Error unauthorized");
  // }
};

module.exports = { protect };
