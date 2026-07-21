import express from "express";
import {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} from "../controllers/wishlistController";

const router = express.Router();
/**
 * @swagger
 * /api/wishlist:
 *   post:
 *     summary: Add product to wishlist
 *     tags: [Wishlist]
 *     responses:
 *       201:
 *         description: Product added to wishlist
 */
router.post("/", addToWishlist);
/**
 * @swagger
 * /api/wishlist/{userId}:
 *   get:
 *     summary: Get user's wishlist
 *     tags: [Wishlist]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Wishlist fetched successfully
 */
router.get("/:userId", getWishlist);
/**
 * @swagger
 * /api/wishlist:
 *   delete:
 *     summary: Remove product from wishlist
 *     tags: [Wishlist]
 *     responses:
 *       200:
 *         description: Product removed from wishlist
 */
router.delete("/:id", removeFromWishlist);

export default router;