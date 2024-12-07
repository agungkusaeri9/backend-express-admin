const UserModel = require("../models/UserModel");
const responseFormatter = require("../utils/responseFormatter");

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

module.exports = {
  getAllUsers,
};
