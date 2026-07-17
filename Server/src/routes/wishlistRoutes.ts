import express from "express";
import {
  addToWishlist,
  getWishlist,
  removeWishlistItem,
} from "../controllers/wishlistController";

const router = express.Router();

router.post("/add", addToWishlist);
router.get("/:userId", getWishlist);
router.delete("/:id", removeWishlistItem);

export default router;