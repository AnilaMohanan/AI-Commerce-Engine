import { Request, Response } from "express";
import Cart from "../models/Cart";
import Order from "../models/Order";
import Product from "../models/Product";
import Coupon from "../models/Coupon";

export const checkout = async (
  req: Request,
  res: Response
) => {
  try {
    const { userId, couponCode } = req.body;

    const cartItems = await Cart.find({
      user: userId,
    }).populate("product");

    if (cartItems.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart is empty",
      });
    }

    const availableItems: any[] = [];
    const unavailableItems: any[] = [];

    for (const item of cartItems as any[]) {
      const product: any = item.product;

      if (product.stock >= item.quantity) {
        availableItems.push({
          product: product._id,
          quantity: item.quantity,
          price: product.price,
        });
      } else {
        unavailableItems.push({
          productId: product._id,
          name: product.name,
          requested: item.quantity,
          available: product.stock,
          reason: "Insufficient stock",
        });
      }
    }

    if (availableItems.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No items available for checkout",
        unavailableItems,
      });
    }

    const totalAmount = Number(
      availableItems
        .reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        )
        .toFixed(2)
    );
    let finalAmount = totalAmount;
let appliedCoupon = null;
let discount = 0;

if (couponCode) {
  const coupon = await Coupon.findOne({
    code: couponCode.toUpperCase(),
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

  if (totalAmount < coupon.minimumOrderAmount) {
    return res.status(400).json({
      success: false,
      message: `Minimum order amount is ₹${coupon.minimumOrderAmount}`,
    });
  }

  if (coupon.discountType === "Percentage") {
    discount = (totalAmount * coupon.discountValue) / 100;
  } else {
    discount = coupon.discountValue;
  }

  finalAmount = Number((totalAmount - discount).toFixed(2));
  appliedCoupon = coupon.code;
}
    const order = await Order.create({
  user: userId,
  items: availableItems,
  totalAmount: finalAmount,
});

    // Reduce product stock
    for (const item of availableItems) {
      await Product.findByIdAndUpdate(
        item.product,
        {
          $inc: {
            stock: -item.quantity,
          },
        }
      );
    }

    // Remove purchased items from cart
    for (const item of availableItems) {
      await Cart.findOneAndDelete({
        user: userId,
        product: item.product,
      });
    }

    return res.status(201).json({
      success: true,
      message: "Order created for available items only",
      order,
      unavailableItems,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Checkout failed",
    });
  }
};
export const getOrders = async (
  req: Request,
  res: Response
) => {
  try {
    const { userId } = req.params;

    const orders = await Order.find({ user: userId })
      .populate("items.product");

    return res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
    });
  }
};
export const updateOrderStatus = async (
  req: Request,
  res: Response
) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(
      orderId,
      { status },
      {
       new: true,
       runValidators: true,
      }
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      order,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to update order status",
    });
  }
};
export const cancelOrder = async (
  req: Request,
  res: Response
) => {
  try {
    const { orderId } = req.params;

    const order: any = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    if (order.status === "Cancelled") {
      return res.status(400).json({
        success: false,
        message: "Order is already cancelled",
      });
    }

    if (order.status === "Delivered") {
      return res.status(400).json({
        success: false,
        message: "Delivered orders cannot be cancelled",
      });
    }

    // Restore stock
    for (const item of order.items) {
      await Product.findByIdAndUpdate(
        item.product,
        {
          $inc: {
            stock: item.quantity,
          },
        }
      );
    }

    order.status = "Cancelled";
    await order.save();

    return res.status(200).json({
      success: true,
      message: "Order cancelled successfully",
      order,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to cancel order",
    });
  }
};