import mongoose from "mongoose";
import { Request, Response } from "express";
import Review from "../models/Review";

export const addReview = async (
  req: Request,
  res: Response
) => {
  try {
    const { userId, productId, rating, comment } = req.body;

    const existingReview = await Review.findOne({
      user: userId,
      product: productId,
    });

    if (existingReview) {
      return res.status(400).json({
        success: false,
        message: "You have already reviewed this product",
      });
    }

    const review = await Review.create({
      user: userId,
      product: productId,
      rating,
      comment,
    });

    return res.status(201).json({
      success: true,
      message: "Review added successfully",
      review,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to add review",
    });
  }
};
export const getReviews = async (
  req: Request,
  res: Response
) => {
  try {
    const { productId } = req.params;

    const reviews = await Review.find({
      product: productId,
    }).populate("user", "name email");

    return res.status(200).json({
      success: true,
      reviews,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch reviews",
    });
  }
};
export const updateReview = async (
  req: Request,
  res: Response
) => {
  try {
    const { userId, productId, rating, comment } = req.body;

    const review = await Review.findOneAndUpdate(
      {
        user: userId,
        product: productId,
      },
      {
        rating,
        comment,
      },
      {
        new: true,
      }
    );

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Review updated successfully",
      review,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to update review",
    });
  }
};
export const deleteReview = async (
  req: Request,
  res: Response
) => {
  try {
    const { userId, productId } = req.body;

    const review = await Review.findOneAndDelete({
      user: userId,
      product: productId,
    });

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Review deleted successfully",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete review",
    });
  }
};
export const getAverageRating = async (
  req: Request,
  res: Response
) => {
  try {
    const productId = String(req.params.productId);

    const result = await Review.aggregate([
      {
        $match: {
          product: new mongoose.Types.ObjectId(productId),
        },
      },
      {
        $group: {
          _id: "$product",
          averageRating: {
            $avg: "$rating",
          },
          totalReviews: {
            $sum: 1,
          },
        },
      },
    ]);

    if (result.length === 0) {
      return res.status(200).json({
        success: true,
        rating: {
          averageRating: 0,
          totalReviews: 0,
        },
      });
    }

    return res.status(200).json({
      success: true,
      rating: result[0],
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch average rating",
    });
  }
};
export const getUserReviews = async (
  req: Request,
  res: Response
) => {
  try {
    const { userId } = req.params;

    const reviews = await Review.find({
      user: userId,
    }).populate("product", "name");

    return res.status(200).json({
      success: true,
      reviews,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch user reviews",
    });
  }
};