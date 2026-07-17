import { Request, Response } from "express";
import Order from "../models/Order";
import Product from "../models/Product";
import User from "../models/User";

export const getDashboardStats = async (
  req: Request,
  res: Response
) => {
  try {
    const totalProducts = await Product.countDocuments();

    const totalOrders = await Order.countDocuments();

    const totalUsers = await User.countDocuments();

    const revenueResult = await Order.aggregate([
      {
        $match: {
          status: { $ne: "Cancelled" },
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$totalAmount" },
        },
      },
    ]);

    const totalRevenue =
      revenueResult.length > 0
        ? revenueResult[0].totalRevenue
        : 0;

    const recentOrders = await Order.find()
      .populate("user", "name")
      .sort({ createdAt: -1 })
      .limit(5);

    return res.status(200).json({
      success: true,
      stats: {
        totalProducts,
        totalOrders,
        totalUsers,
        totalRevenue,
        recentOrders,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to load dashboard statistics",
    });
  }
};