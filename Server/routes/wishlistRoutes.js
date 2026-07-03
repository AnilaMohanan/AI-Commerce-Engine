const express = require("express");

const router = express.Router();

const {
  addToWishlist,
  getWishlist,
  deleteWishlistItem,
} = require("../controllers/wishlistController");

// Add to Wishlist
router.post("/", addToWishlist);

// View Wishlist of User
router.get("/:userId", getWishlist);

// Delete Wishlist Item
router.delete("/:id", deleteWishlistItem);

module.exports = router;