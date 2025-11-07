require("dotenv").config();

module.exports = {
  BACKEND_URL: process.env.BACKEND_URL || "http://localhost:4000",
  PORT: process.env.PORT || 3000,
};
