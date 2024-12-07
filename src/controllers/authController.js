// controllers/authController.js
const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const responseFormatter = require("../utils/responseFormatter");
const { validationResult } = require("express-validator");

const authController = {
  // Register User
  register: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return responseFormatter.validationError(res, errors.array());
    }

    const { name, email, password } = req.body;

    try {
      // Enkripsi password
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.createUser(name, email, hashedPassword);
      responseFormatter.success(res, user, "User created successfully", 201);
    } catch (error) {
      responseFormatter.error(res, error, "User creation failed", 500);
    }
  },

  // Login User
  login: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return responseFormatter.validationError(res, errors.array());
    }
    const { email, password } = req.body;

    try {
      const user = await User.findUserByEmail(email);

      if (!user) {
        responseFormatter.error(res, null, "User not found", 404);
      }

      // Verifikasi password
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        responseFormatter.error(res, null, "Invalid password", 401);
      }

      // Generate JWT token
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      responseFormatter.success(res, { user, token }, "Login successful", 200);
    } catch (error) {
      res.status(500).json({ error: "Login failed" });
    }
  },
};

module.exports = authController;
