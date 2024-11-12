const JWT_SECRET = require("../config/jwt_secret");
const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(403).json({
      message: "Unauthorized Access",
    });
  }

  const array = authHeader.split(" ");
  const token = array[1];

  const decoded = jwt.verify(token, JWT_SECRET);

  if (decoded && Object.keys(decoded).length >= 1 && decoded.username) {
    const userExists = await User.findOne({ username: decoded.username });
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
