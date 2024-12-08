const { body } = require("express-validator");
const UserModel = require("../models/UserModel");
const { param } = require("express-validator");
const responseFormatter = require("../utils/responseFormatter");
const createValidation = [
  body("name")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters long"),

  body("email")
    .isEmail()
    .withMessage("Invalid email format")
    .custom(async (email) => {
      const existingUser = await UserModel.findUserByEmail(email);
      if (existingUser) {
        throw new Error("Email is already taken");
      }
      return true;
    }),

  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

const updateValidation = [
  body("name")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters long"),

  body("email").isEmail().withMessage("Invalid email format"),
];

const deleteValidation = [
  param("id").isInt().withMessage("ID must be an integer").toInt(),
];

module.exports = { createValidation, updateValidation, deleteValidation };
