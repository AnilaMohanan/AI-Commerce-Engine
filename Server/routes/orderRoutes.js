const express = require("express");

const router = express.Router();

const {
  placeOrder,
  getAllOrders,
  getOrderById,
  getOrdersByUser,
  getTotalRevenue,
  getOrdersPerDay,
 getTopCategories,
  getBestSellingProducts
} = require("../controllers/orderController");

// Place Order
router.post("/", placeOrder);

// Get All Orders
router.get("/", getAllOrders);

// Get Orders of a User
router.get("/user/:userId", getOrdersByUser);




router.get("/get-totalrevenue", getTotalRevenue);

router.get("/get-orders-per-day", getOrdersPerDay);

router.get("/top-categories", getTopCategories);

router.get("/best-selling-products", getBestSellingProducts);

// Get Order By Id
router.get("/:id", getOrderById);


module.exports = router;