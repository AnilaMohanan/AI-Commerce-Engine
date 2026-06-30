const express = require("express");
const Wishlist= require("../models/Wishlist");

const router = express.Router();


// Add to Wishlist
router.post("/", async (req, res) => {
  try {
    
 const { userId, productId } = req.body;
 console.log(req.body);
    const wishlist = await Wishlist.create({
       userId,
      productId,
    });

    res.status(201).json(wishlist);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});


// GET Wishlist
router.get("/", async (req, res) => {
  try {
    const wishlist = await Wishlist.find();

    res.status(200).json(wishlist);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});



// DELETE wishlist
router.delete("/:id", async (req, res) => {
  try {
    const wishlist = await Wishlist.findByIdAndDelete(req.params.id);

    if (!wishlist) {
      return res.status(404).json({
        message: "wishlist item not found",
      });
    }

    res.status(200).json({
      message: "Wishlist Item Removed successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

module.exports = router;