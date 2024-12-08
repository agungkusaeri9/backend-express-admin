const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const responseFormatter = require("../utils/responseFormatter");
dotenv.config();

// Middleware untuk memverifikasi JWT
const verifyToken = (req, res, next) => {
  // Ambil token dari header Authorization
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return responseFormatter.error(res, null, "Token is not provided", 401);
  }

  // Verifikasi token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Menyimpan informasi user pada req.user
    next(); // Lanjutkan ke handler berikutnya
  } catch (error) {
    return responseFormatter.error(res, null, "Invalid token", 401);
  }
};

module.exports = verifyToken;
