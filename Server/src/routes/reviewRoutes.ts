import express from "express";
import {
  addReview,
  getReviews,
  updateReview,
  deleteReview,
  getAverageRating,
  getUserReviews,
} from "../controllers/reviewController";

const router = express.Router();

router.post("/", addReview);
router.get("/rating/:productId", getAverageRating);
router.get("/user/:userId", getUserReviews);
router.get("/:productId", getReviews);
router.put("/", updateReview);
router.delete("/", deleteReview);

export default router;