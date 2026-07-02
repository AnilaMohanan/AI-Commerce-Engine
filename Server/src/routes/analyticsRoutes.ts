import express from "express";
import {
  getAnalytics,
  getTopSellingProducts,
  getMonthlySales,
  getTopCategories,
} from "../controllers/analyticsController";

const router = express.Router();

router.get("/", getAnalytics);
router.get("/top-products", getTopSellingProducts);
router.get("/monthly-sales", getMonthlySales);
router.get("/top-categories", getTopCategories);

export default router;