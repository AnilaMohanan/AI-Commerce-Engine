import express from "express";
import {
  checkout,
  getOrders,
  updateOrderStatus,
  cancelOrder,
  getInvoice,
} from "../controllers/orderController";

const router = express.Router();

router.post("/checkout", checkout);

// Invoice route (must come before /:userId)
router.get("/invoice/:orderId", getInvoice);

router.get("/:userId", getOrders);

router.patch("/:orderId/status", updateOrderStatus);

router.patch("/:orderId/cancel", cancelOrder);

export default router;