import express from "express";
import {
  calculateCartTotal,
  addToCart,
  getCart,
  updateCartQuantity,
  removeCartItem,
} from "../controllers/cartController";


const router = express.Router();
/**
 * @swagger
 * /api/cart/total:
 *   post:
 *     summary: Calculate cart total
 *     tags: [Cart]
 *     responses:
 *       200:
 *         description: Cart total calculated successfully
 */
router.post("/total", calculateCartTotal);
/**
 * @swagger
 * /api/cart/add:
 *   post:
 *     summary: Add product to cart
 *     tags: [Cart]
 *     responses:
 *       201:
 *         description: Product added to cart
 */
router.post("/add", addToCart);

/**
 * @swagger
 * /api/cart/{userId}:
 *   get:
 *     summary: Get user's cart
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Cart fetched successfully
 */
router.get("/:userId", getCart);
/**
 * @swagger
 * /api/cart/{cartId}:
 *   put:
 *     summary: Update cart item quantity
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: cartId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Cart updated successfully
 */
router.put("/:cartId",updateCartQuantity);
/**
 * @swagger
 * /api/cart/{cartId}:
 *   delete:
 *     summary: Remove item from cart
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: cartId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Cart item removed successfully
 */
router.delete("/:cartId",removeCartItem);

export default router;