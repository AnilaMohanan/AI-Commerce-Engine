import { Request, Response } from "express";
import Wishlist from "../models/Wishlist";

export const addToWishlist = async (req: Request, res: Response) => {
  try {
    const { userId, productId } = req.body;

    const existing = await Wishlist.findOne({
      user: userId,
      product: productId,
    });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Product already in wishlist",
      });
    }

    const wishlist = await Wishlist.create({
      user: userId,
      product: productId,
    });

    return res.status(201).json({
      success: true,
      message: "Added to wishlist",
      wishlist,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to add to wishlist",
    });
  }
};

export const getWishlist = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const wishlist = await Wishlist.find({
  user: userId,
}).populate("product");

// Remove invalid wishlist items
const validWishlist = wishlist.filter(
  (item: any) => item.product
);

return res.status(200).json({
  success: true,
  wishlist: validWishlist,
});
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch wishlist",
    });
  }
};

export const removeWishlistItem = async (
  req: Request,
  res: Response
) => {
  try {
    await Wishlist.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Removed from wishlist",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to remove wishlist item",
    });
  }
};