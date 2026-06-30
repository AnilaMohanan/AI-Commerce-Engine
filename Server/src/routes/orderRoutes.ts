import express from "express";
import {
  checkout,
  getOrders,
  updateOrderStatus,
  cancelOrder,
} from "../controllers/orderController";

const router = express.Router();

router.post("/checkout", checkout);
router.get("/:userId", getOrders);
router.patch("/:orderId/status", updateOrderStatus);
router.patch("/:orderId/cancel", cancelOrder);

export default router;