import express from "express";
import {
  createCoupon,
  getCoupons,
  applyCoupon
} from "../controllers/couponController";

const router = express.Router();

router.post("/", createCoupon);
router.get("/", getCoupons);
router.post("/apply", applyCoupon);

export default router;