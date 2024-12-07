const { body } = require("express-validator");
const User = require("../models/UserModel");

// Validasi untuk register
const registerValidation = [
  body("name")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters long"),

  body("email")
    .isEmail()
    .withMessage("Invalid email format")
    .custom(async (email) => {
      const existingUser = await User.findUserByEmail(email);
      if (existingUser) {
        throw new Error("Email is already taken");
      }
      return true;
    }),

  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

// Validasi untuk login
const loginValidation = [
  body("email")
    .isEmail()
    .withMessage("Invalid email format")
    .custom(async (email) => {
      const existingUser = await User.findUserByEmail(email);
      if (!existingUser) {
        throw new Error("Email not registered");
      }
      return true;
    }),

  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

module.exports = { registerValidation, loginValidation };
