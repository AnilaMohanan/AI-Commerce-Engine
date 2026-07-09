import express from "express";
import {
  checkout,
  getOrders,
  updateOrderStatus,
  cancelOrder,
} from "../controllers/orderController";

const router = express.Router();
/**
 * @swagger
 * /api/orders/checkout:
 *   post:
 *     summary: Checkout and place an order
 *     tags: [Orders]
 *     responses:
 *       201:
 *         description: Order placed successfully
 */
router.post("/checkout", checkout);
/**
 * @swagger
 * /api/orders/{userId}:
 *   get:
 *     summary: Get user's orders
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Orders fetched successfully
 */
router.get("/:userId", getOrders);
/**
 * @swagger
 * /api/orders/{orderId}/status:
 *   patch:
 *     summary: Update order status
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order status updated successfully
 */
router.patch("/:orderId/status", updateOrderStatus);
/**
 * @swagger
 * /api/orders/{orderId}/cancel:
 *   patch:
 *     summary: Cancel an order
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order cancelled successfully
 */
router.patch("/:orderId/cancel", cancelOrder);

export default router;