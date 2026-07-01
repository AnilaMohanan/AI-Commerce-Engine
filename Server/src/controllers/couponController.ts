import { Request, Response } from "express";
import Coupon from "../models/Coupon";

export const createCoupon = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      code,
      discountType,
      discountValue,
      minimumOrderAmount,
      expiryDate,
    } = req.body;

    const coupon = await Coupon.create({
      code,
      discountType,
      discountValue,
      minimumOrderAmount,
      expiryDate,
    });

    return res.status(201).json({
      success: true,
      message: "Coupon created successfully",
      coupon,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to create coupon",
    });
  }
};
export const getCoupons = async (
  req: Request,
  res: Response
) => {
  try {
    const coupons = await Coupon.find();

    return res.status(200).json({
      success: true,
      coupons,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch coupons",
    });
  }
};
export const applyCoupon = async (
  req: Request,
  res: Response
) => {
  try {
    const { code, orderAmount } = req.body;

    const coupon = await Coupon.findOne({
      code: code.toUpperCase(),
    });

    if (!coupon) {
      return res.status(404).json({
        success: false,
        message: "Coupon not found",
      });
    }

    if (!coupon.isActive) {
      return res.status(400).json({
        success: false,
        message: "Coupon is inactive",
      });
    }

    if (new Date() > coupon.expiryDate) {
      return res.status(400).json({
        success: false,
        message: "Coupon has expired",
      });
    }

    if (orderAmount < coupon.minimumOrderAmount) {
      return res.status(400).json({
        success: false,
        message: `Minimum order amount is ₹${coupon.minimumOrderAmount}`,
      });
    }

    let discount = 0;

    if (coupon.discountType === "Percentage") {
      discount = (orderAmount * coupon.discountValue) / 100;
    } else {
      discount = coupon.discountValue;
    }

    const finalAmount = orderAmount - discount;

    return res.status(200).json({
      success: true,
      coupon: coupon.code,
      discount,
      finalAmount,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to apply coupon",
    });
  }
};