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
/**
 * @swagger
 * /api/reviews:
 *   post:
 *     summary: Add a review
 *     tags: [Reviews]
 *     responses:
 *       201:
 *         description: Review added successfully
 */
router.post("/", addReview);
/**
 * @swagger
 * /api/reviews/rating/{productId}:
 *   get:
 *     summary: Get average product rating
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Average rating fetched successfully
 */
router.get("/rating/:productId", getAverageRating);
/**
 * @swagger
 * /api/reviews/user/{userId}:
 *   get:
 *     summary: Get reviews by user
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User reviews fetched successfully
 */
router.get("/user/:userId", getUserReviews);
/**
 * @swagger
 * /api/reviews/{productId}:
 *   get:
 *     summary: Get reviews for a product
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product reviews fetched successfully
 */
router.get("/:productId", getReviews);
/**
 * @swagger
 * /api/reviews:
 *   put:
 *     summary: Update a review
 *     tags: [Reviews]
 *     responses:
 *       200:
 *         description: Review updated successfully
 */
router.put("/", updateReview);
/**
 * @swagger
 * /api/reviews:
 *   delete:
 *     summary: Delete a review
 *     tags: [Reviews]
 *     responses:
 *       200:
 *         description: Review deleted successfully
 */
router.delete("/", deleteReview);

export default router;