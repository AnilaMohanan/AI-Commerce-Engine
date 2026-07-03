const express = require("express");

const router = express.Router();

const {
  placeOrder,
  getAllOrders,
  getOrderById,
  getOrdersByUser,
} = require("../controllers/orderController");

// Place Order
router.post("/", placeOrder);

// Get All Orders
router.get("/", getAllOrders);

// Get Orders of a User
router.get("/user/:userId", getOrdersByUser);

// Get Order By Id
router.get("/:id", getOrderById);

module.exports = router;