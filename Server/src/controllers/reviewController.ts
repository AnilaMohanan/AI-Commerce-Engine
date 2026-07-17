import { Request, Response } from "express";
import Review from "../models/Review";

export const addReview = async (
  req: Request,
  res: Response
) => {
  try {
    const { userId, productId, rating, comment } = req.body;

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
    }).populate("user", "name");

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
