import express from "express";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController";

import { protect } from "../middleware/authMiddleware";
import { admin } from "../middleware/adminMiddleware";

const router = express.Router();

router.get("/", getProducts);

router.post("/", protect, admin, createProduct);

router.put("/:id", protect, admin, updateProduct);

router.delete("/:id", protect, admin, deleteProduct);

export default router;