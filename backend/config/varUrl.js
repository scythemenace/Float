require("dotenv").config();

module.exports = {
  frontendUrl:
    process.env.FRONTEND_URL ||
    process.env.CLIENT_URL ||
    "http://localhost:5173",
};
