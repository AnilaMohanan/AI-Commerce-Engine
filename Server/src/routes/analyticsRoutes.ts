import express from "express";
import {
  getAnalytics,
  getTopSellingProducts,
  getMonthlySales,
  getTopCategories,
} from "../controllers/analyticsController";

const router = express.Router();
/**
 * @swagger
 * /api/analytics:
 *   get:
 *     summary: Get overall analytics
 *     tags: [Analytics]
 *     responses:
 *       200:
 *         description: Analytics fetched successfully
 */
router.get("/", getAnalytics);
/**
 * @swagger
 * /api/analytics/top-products:
 *   get:
 *     summary: Get top selling products
 *     tags: [Analytics]
 *     responses:
 *       200:
 *         description: Top selling products fetched successfully
 */
router.get("/top-products", getTopSellingProducts);
/**
 * @swagger
 * /api/analytics/monthly-sales:
 *   get:
 *     summary: Get monthly sales report
 *     tags: [Analytics]
 *     responses:
 *       200:
 *         description: Monthly sales fetched successfully
 */
router.get("/monthly-sales", getMonthlySales);
/**
 * @swagger
 * /api/analytics/top-categories:
 *   get:
 *     summary: Get top categories
 *     tags: [Analytics]
 *     responses:
 *       200:
 *         description: Top categories fetched successfully
 */
router.get("/top-categories", getTopCategories);

export default router;