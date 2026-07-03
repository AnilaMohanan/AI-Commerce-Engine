const express = require("express");

const router = express.Router();

const {
  registerUser,
  getUserById,
  updateUser,
} = require("../controllers/userController");

// Register User
router.post("/", registerUser);

// Get User By ID
router.get("/:id", getUserById);

// Update User
router.put("/:id", updateUser);

module.exports = router;