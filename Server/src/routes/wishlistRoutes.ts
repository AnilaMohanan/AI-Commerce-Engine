import express from "express";
import {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} from "../controllers/wishlistController";

const router = express.Router();

router.post("/", addToWishlist);
router.get("/:userId", getWishlist);
router.delete("/", removeFromWishlist);

export default router;