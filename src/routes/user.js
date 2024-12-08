const express = require("express");
const app = express();
const router = express.Router();
const UserController = require("../controllers/UserController");
const UserValidation = require("../validations/UserValidation");
const verifyToken = require("../middleware/authMiddleware");

router.get("/", UserController.getAllUsers);
router.post("/", UserValidation.createValidation, UserController.createNewUser);
router.patch(
  "/:id",
  UserValidation.updateValidation,
  UserController.updateUser
);
router.delete("/:id", UserController.deleteUser);

module.exports = router;
