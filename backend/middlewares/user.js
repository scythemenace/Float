const { User } = require("../db/dbSchema");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(403).json({
      message: "Unauthorized Access",
    });
  }

  const array = authHeader.split(" ");
  const token = array[1];

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  if (decoded && Object.keys(decoded).length >= 1 && decoded.userId) {
    const userExists = await User.findOne({ _id: decoded.userId });
    if (userExists) {
      req.userId = decoded.userId;
      return next();
    } else {
      return res.status(404).json("User not found");
    }
  } else {
    return res.status(403).json({
      message: "Unauthorized Access",
    });
  }
};

module.exports = {
  authMiddleware,
};
