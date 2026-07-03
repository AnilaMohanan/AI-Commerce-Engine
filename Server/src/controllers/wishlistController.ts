import { Request, Response } from "express";
import Wishlist from "../models/Wishlist";

export const addToWishlist = async (
  req: Request,
  res: Response
) => {
  try {
    const { userId, productId } = req.body;

    const existingWishlist = await Wishlist.findOne({
      user: userId,
      product: productId,
    });

    if (existingWishlist) {
      return res.status(400).json({
        success: false,
        message: "Product already exists in wishlist",
      });
    }

    const wishlist = await Wishlist.create({
      user: userId,
      product: productId,
    });

    return res.status(201).json({
      success: true,
      message: "Product added to wishlist",
      wishlist,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to add product to wishlist",
    });
  }
};
export const getWishlist = async (
  req: Request,
  res: Response
) => {
  try {
    const { userId } = req.params;

    const wishlist = await Wishlist.find({
      user: userId,
    }).populate("product");

    return res.status(200).json({
      success: true,
      wishlist,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch wishlist",
    });
  }
};
export const removeFromWishlist = async (
  req: Request,
  res: Response
) => {
  try {
    const { userId, productId } = req.body;

    const wishlist = await Wishlist.findOneAndDelete({
      user: userId,
      product: productId,
    });

    if (!wishlist) {
      return res.status(404).json({
        success: false,
        message: "Product not found in wishlist",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product removed from wishlist",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to remove product from wishlist",
    });
  }
};