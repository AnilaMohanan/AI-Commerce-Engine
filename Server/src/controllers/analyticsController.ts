import { Request, Response } from "express";
import Order from "../models/Order";

export const getAnalytics = async (
  req: Request,
  res: Response
) => {
  try {
    const totalOrders = await Order.countDocuments();

    const totalRevenueResult = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$totalAmount" },
        },
      },
    ]);

    const totalRevenue =
      totalRevenueResult.length > 0
        ? totalRevenueResult[0].totalRevenue
        : 0;

    const orderStatus = await Order.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    return res.status(200).json({
      success: true,
      analytics: {
        totalOrders,
        totalRevenue,
        orderStatus,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch analytics",
    });
  }
};
export const getTopSellingProducts = async (
  req: Request,
  res: Response
) => {
  try {
    const topProducts = await Order.aggregate([
      {
        $unwind: "$items",
      },
      {
        $group: {
          _id: "$items.product",
          totalSold: {
            $sum: "$items.quantity",
          },
          revenue: {
            $sum: {
              $multiply: [
                "$items.quantity",
                "$items.price",
              ],
            },
          },
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "_id",
          as: "product",
        },
      },
      {
        $unwind: "$product",
      },
      {
        $project: {
          _id: 0,
          productId: "$product._id",
          name: "$product.name",
          totalSold: 1,
          revenue: 1,
        },
      },
      {
        $sort: {
          totalSold: -1,
        },
      },
      {
        $limit: 5,
      },
    ]);

    return res.status(200).json({
      success: true,
      topProducts,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch top selling products",
    });
  }
};
export const getMonthlySales = async (
  req: Request,
  res: Response
) => {
  try {
    const monthlySales = await Order.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          totalOrders: { $sum: 1 },
          totalRevenue: { $sum: "$totalAmount" },
        },
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
        },
      },
    ]);

    return res.status(200).json({
      success: true,
      monthlySales,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch monthly sales",
    });
  }
};
export const getTopCategories = async (
  req: Request,
  res: Response
) => {
  try {
    const topCategories = await Order.aggregate([
      {
        $unwind: "$items",
      },
      {
        $lookup: {
          from: "products",
          localField: "items.product",
          foreignField: "_id",
          as: "product",
        },
      },
      {
        $unwind: "$product",
      },
      {
        $group: {
          _id: "$product.category",
          totalSold: {
            $sum: "$items.quantity",
          },
          revenue: {
            $sum: {
              $multiply: [
                "$items.quantity",
                "$items.price",
              ],
            },
          },
        },
      },
      {
        $sort: {
          totalSold: -1,
        },
      },
    ]);

    return res.status(200).json({
      success: true,
      topCategories,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch top categories",
    });
  }
};