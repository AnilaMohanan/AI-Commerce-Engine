import express from "express";
import { vectorSearchProducts } from "../controllers/productController";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProducts,
} from "../controllers/productController";

import { protect } from "../middleware/authMiddleware";
import { admin } from "../middleware/adminMiddleware";

const router = express.Router();
/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: List of all products
 */

 
router.get("/", getProducts);

/**
 * @swagger
 * /api/products/search:
 *   get:
 *     summary: Search products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Products fetched successfully
 */

router.get("/search", searchProducts);
/**
 * @swagger
 * /api/products/vector-search:
 *   post:
 *     summary: Search products using AI vector search
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Matching products found
 */

router.post("/vector-search", vectorSearchProducts);
/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Get product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product fetched successfully
 *       404:
 *         description: Product not found
 */

router.get("/:id", getProductById);
/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     responses:
 *       201:
 *         description: Product created successfully
 */

router.post("/", protect, admin, createProduct);
/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Update a product
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       404:
 *         description: Product not found
 */

router.put("/:id", protect, admin, updateProduct);
/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Delete a product
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       404:
 *         description: Product not found
 */

router.delete("/:id", protect, admin, deleteProduct);

export default router;