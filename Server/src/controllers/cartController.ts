import { Request, Response } from "express";
import mongoose from "mongoose";
import Product from "../models/Product";
import Category from "../models/Category";
import Cart from "../models/Cart";

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

  const products = await Product.aggregate([
  {
    $match: {
      _id: { $in: productIds },
    },
  },
  {
    $lookup: {
      from: "categories",
      localField: "category",
      foreignField: "_id",
      as: "category",
    },
  },
  {
    $unwind: "$category",
  },
  {
    $project: {
      _id: 1,
      name: 1,
      price: 1,
      stock: 1,
      category: {
        _id: "$category._id",
        name: "$category.name",
      },
    },
  },
  {
  $addFields: {
    lineTotal: "$price",
  },
},
]);

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
    category: product.category,
    stock: product.stock,
    quantity: item.quantity,
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
export const addToCart = async (req: Request, res: Response) => {
  try {
    const { userId, productId, quantity } = req.body;

    const existingCartItem = await Cart.findOne({
      user: userId,
      product: productId,
    });

    if (existingCartItem) {
      existingCartItem.quantity += quantity;
      await existingCartItem.save();

      return res.status(200).json({
        success: true,
        message: "Cart updated successfully",
        cartItem: existingCartItem,
      });
    }

    const cartItem = await Cart.create({
      user: userId,
      product: productId,
      quantity,
    });

    return res.status(201).json({
      success: true,
      message: "Item added to cart",
      cartItem,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to add item to cart",
    });
  }
};
export const getCart = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const cart = await Cart.find({ user: userId })
      .populate({
        path: "product",
        populate: {
          path: "category",
          select: "name",
        },
      });

    return res.status(200).json({
      success: true,
      cart,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch cart",
    });
  }
};
export const updateCartQuantity = async (
  req: Request,
  res: Response
) => {
  try {
    const { cartId } = req.params;
    const { quantity } = req.body;

    const cartItem = await Cart.findById(cartId);

    if (!cartItem) {
      return res.status(404).json({
        success: false,
        message: "Cart item not found",
      });
    }

    cartItem.quantity = quantity;
    await cartItem.save();

    return res.status(200).json({
      success: true,
      message: "Cart updated successfully",
      cartItem,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to update cart",
    });
  }
};
export const removeCartItem = async (
  req: Request,
  res: Response
) => {
  try {
    const { cartId } = req.params;

    const cartItem = await Cart.findById(cartId);

    if (!cartItem) {
      return res.status(404).json({
        success: false,
        message: "Cart item not found",
      });
    }

    await Cart.findByIdAndDelete(cartId);

    return res.status(200).json({
      success: true,
      message: "Cart item removed successfully",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to remove cart item",
    });
  }
};