const Order = require("../models/Order");
const User = require("../models/User");
const Product = require("../models/Product");

// ==============================
// Place Order
// ==============================
exports.placeOrder = async (req, res) => {
  try {
    const { user, items } = req.body;

    if (!user || !items || items.length === 0) {
      return res.status(400).json({
        message: "User and order items are required",
      });
    }

    // Check User
    const existingUser = await User.findById(user);

    if (!existingUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    let totalAmount = 0;
    const orderItems = [];

    for (const item of items) {
      const product = await Product.findById(item.product);

      if (!product) {
        return res.status(404).json({
          message: `Product not found : ${item.product}`,
        });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({
          message: `${product.title} is out of stock`,
        });
      }

      totalAmount += product.price * item.quantity;

      orderItems.push({
        product: product._id,
        quantity: item.quantity,
        price: product.price,
      });

      product.stock -= item.quantity;
      await product.save();
    }

    const order = await Order.create({
      user,
      items: orderItems,
      totalAmount,
    });

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==============================
// Get All Orders
// ==============================

exports.getAllOrders = async (req, res) => {
  try {

    const orders = await Order.find()
      .populate("user", "name")
      .populate("items.product", "name");

    const formattedOrders = orders.map(order => ({
      orderId: order._id,
      userId: order.user?._id,
      userName: order.user?.name,

      products: order.items.map(item => ({
        productId: item.product?._id,
        productName: item.product?.name,
        quantity: item.quantity
      })),

      totalAmount: order.totalAmount,
      status: order.status,
      createdAt: order.createdAt
    }));

    res.status(200).json({
      success: true,
      count: formattedOrders.length,
      orders: formattedOrders
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

// ==============================
// Get Order By Id
// ==============================

exports.getOrderById = async (req, res) => {
  try {

    const order = await Order.findById(req.params.id)
      .populate("user", "name email")
      .populate("items.product", "title price");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      order,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==============================
// Get Orders By User
// ==============================

exports.getOrdersByUser = async (req, res) => {
  try {

    const orders = await Order.find({
      user: req.params.userId,
    })
      .populate("user", "name email")
      .populate("items.product", "title price");

    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Total Revenue

exports.getTotalRevenue = async (req, res) => {
  try {

    const revenue = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: {
            $sum: "$totalAmount"
          },
          totalOrders: {
            $sum: 1
          }
        }
      }
    ]);

    res.status(200).json({
      success: true,
      analytics: revenue[0] || {
        totalRevenue: 0,
        totalOrders: 0
      }
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};


// ORDER PER DAY//

exports.getOrdersPerDay = async (req, res) => {
  try {

    const orders = await Order.aggregate([
      {
        $group: {
          _id: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$createdAt"
            }
          },
          totalOrders: {
            $sum: 1
          },
          revenue: {
            $sum: "$totalAmount"
          }
        }
      },
      {
        $sort: {
          _id: 1
        }
      }
    ]);

    res.status(200).json({
      success: true,
      orders
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

// BEST SELLING PRODUCTS //

exports.getBestSellingProducts = async (req, res) => {
  try {

    const products = await Order.aggregate([

      {
        $unwind: "$items"
      },

      {
        $group: {
          _id: "$items.product",
          totalSold: {
            $sum: "$items.quantity"
          }
        }
      },

      {
        $sort: {
          totalSold: -1
        }
      },

      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "_id",
          as: "product"
        }
      },

      {
        $unwind: "$product"
      },

      {
        $project: {
          _id: 0,
          productId: "$product._id",
          title: "$product.title",
          price: "$product.price",
          totalSold: 1
        }
      }

    ]);

    res.status(200).json({
      success: true,
      products
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

//assumes each product has a category field referencing the Category collection.

exports.getTopCategories = async (req, res) => {
  try {

    const categories = await Order.aggregate([

      {
        $unwind: "$items"
      },

      {
        $lookup: {
          from: "products",
          localField: "items.product",
          foreignField: "_id",
          as: "product"
        }
      },

      {
        $unwind: "$product"
      },

      {
        $group: {
          _id: "$product.category",
          totalSold: {
            $sum: "$items.quantity"
          }
        }
      },

      {
        $lookup: {
          from: "categories",
          localField: "_id",
          foreignField: "_id",
          as: "category"
        }
      },

      {
        $unwind: "$category"
      },

      {
        $project: {
          _id: 0,
          categoryId: "$category._id",
          categoryName: "$category.name",
          totalSold: 1
        }
      },

      {
        $sort: {
          totalSold: -1
        }
      }

    ]);

    res.status(200).json({
      success: true,
      categories
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};