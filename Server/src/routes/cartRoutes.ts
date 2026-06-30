import express from "express";
import {
  calculateCartTotal,
  addToCart,
  getCart,
  updateCartQuantity,
  removeCartItem,
} from "../controllers/cartController";


const router = express.Router();

router.post("/total", calculateCartTotal);
router.post("/add", addToCart);
router.get("/:userId", getCart);
router.put("/:cartId",updateCartQuantity);
router.delete("/:cartId",removeCartItem);

export default router;