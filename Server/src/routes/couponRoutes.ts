import express from "express";
import {
  createCoupon,
  getCoupons,
  applyCoupon
} from "../controllers/couponController";

const router = express.Router();
/**
 * @swagger
 * /api/coupons:
 *   post:
 *     summary: Create a new coupon
 *     tags: [Coupons]
 *     responses:
 *       201:
 *         description: Coupon created successfully
 */
router.post("/", createCoupon);
/**
 * @swagger
 * /api/coupons:
 *   get:
 *     summary: Get all coupons
 *     tags: [Coupons]
 *     responses:
 *       200:
 *         description: List of all coupons
 */
router.get("/", getCoupons);
/**
 * @swagger
 * /api/coupons/apply:
 *   post:
 *     summary: Apply a coupon
 *     tags: [Coupons]
 *     responses:
 *       200:
 *         description: Coupon applied successfully
 *       400:
 *         description: Invalid coupon
 */
router.post("/apply", applyCoupon);

export default router;