
const express = require("express");

const router = express.Router();

const {
  registerUser,
  loginUser,
  getUserById,
  updateUser

} = require("../controllers/userController");

// Login
router.post("/login", loginUser);


// Register User
router.post("/", registerUser);



// Get User By ID
router.get("/:id", getUserById);

// Update User
router.put("/:id", updateUser);


module.exports = router;