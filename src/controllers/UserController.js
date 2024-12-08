const { validationResult } = require("express-validator");
const UserModel = require("../models/UserModel");
const responseFormatter = require("../utils/responseFormatter");
const bcrypt = require("bcrypt");
const getAllUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const { users, pagination } = await UserModel.getAllUsers(page, limit);

    responseFormatter.success(
      res,
      users,
      "Users fetched successfully",
      200,
      pagination
    );
  } catch (error) {
    responseFormatter.error(res, error.message, "Failed to fetch users");
  }
};

const createNewUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return responseFormatter.validationError(res, errors.array());
  }

  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const dataBody = { name, email, password: hashedPassword };
    const user = await UserModel.createNewUser(dataBody);
    responseFormatter.success(res, user, "User created successfully", 201);
  } catch (error) {
    responseFormatter.error(res, error.message, "Failed to create user");
  }
};

const updateUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return responseFormatter.validationError(res, errors.array());
  }

  const user = await UserModel.findById(req.params.id);
  if (!user) {
    return responseFormatter.error(res, null, "User not found", 404);
  }

  try {
    const { name, email, password } = req.body;
    let dataBody;
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      dataBody = { name, email, password: hashedPassword };
    } else {
      dataBody = { name, email };
    }
    const user = await UserModel.updateUser(req.params.id, dataBody);
    responseFormatter.success(res, user, "User updated successfully", 200);
  } catch (error) {
    responseFormatter.error(res, error.message, "Failed to update user");
  }
};

const deleteUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return responseFormatter.validationError(res, errors.array());
  }
  const user = await UserModel.findById(req.params.id);
  if (!user) {
    return responseFormatter.error(res, null, "User not found", 404);
  }
  try {
    await UserModel.deleteUser(req.params.id);
    responseFormatter.success(res, null, "User deleted successfully", 200);
  } catch (error) {
    responseFormatter.error(res, error.message, "Failed to delete user");
  }
};

module.exports = {
  getAllUsers,
  createNewUser,
  updateUser,
  deleteUser,
};
