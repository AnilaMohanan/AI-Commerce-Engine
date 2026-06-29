import { Request, Response } from "express";
import mongoose from "mongoose";
import Product from "../models/Product";

export const calculateCartTotal = async (
  req: Request,
  res: Response
) => {
  try {
    const { items } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart is empty",
      });
    }

    const productIds = items.map(
      (item: any) => new mongoose.Types.ObjectId(item.productId)
    );

    const products = await Product.find({
  _id: { $in: productIds },
});

const cartItems = products.map((product: any) => {
  const item = items.find(
    (i: any) => i.productId === product._id.toString()
  );

  const quantity = item ? item.quantity : 0;
  const total = product.price * quantity;

  return {
    productId: product._id,
    name: product.name,
    price: product.price,
    quantity,
    total,
  };
});

const subtotal = cartItems.reduce(
  (sum, item) => sum + item.total,
  0
);

return res.status(200).json({
  success: true,
  message: "Cart total calculated successfully",
  cartItems,
  subtotal,
});
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to calculate cart total",
    });
  }
};