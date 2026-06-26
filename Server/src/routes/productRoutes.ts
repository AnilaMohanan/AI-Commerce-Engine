import express from "express";
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

router.get("/", getProducts);

router.get("/search", searchProducts);

router.get("/:id", getProductById);

router.post("/", protect, admin, createProduct);

router.put("/:id", protect, admin, updateProduct);

router.delete("/:id", protect, admin, deleteProduct);

export default router;