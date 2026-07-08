const Rating = require("../models/Rating");
const Product = require("../models/Product");


// ==============================
// Add Rating
// ==============================

const addRating = async (req, res) => {
  try {
    const { user, product, rating, review } = req.body;

    // Check if product exists
    const productExists = await Product.findById(product);

    if (!productExists) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // One rating per user
    const alreadyRated = await Rating.findOne({
      user,
      product,
    });

    if (alreadyRated) {
      return res.status(400).json({
        success: false,
        message: "You have already rated this product",
      });
    }

    const newRating = await Rating.create({
      user,
      product,
      rating,
      review,
    });

    res.status(201).json({
      success: true,
      message: "Rating added successfully",
      data: newRating,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



// ==============================
// Get Product Ratings
// ==============================

const getProductRatings = async (req, res) => {
  try {
    const ratings = await Rating.find({
      product: req.params.productId,
    }).populate("user", "name email");

    res.status(200).json({
      success: true,
      totalRatings: ratings.length,
      data: ratings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



// ==============================
// Average Rating API
// ==============================

const getAverageRating = async (req, res) => {
  try {
    const productId = req.params.productId;

    const result = await Rating.aggregate([
      {
        $match: {
          product: Product.schema.path("_id").caster.cast(productId),
        },
      },
      {
        $group: {
          _id: "$product",
          averageRating: {
            $avg: "$rating",
          },
          totalRatings: {
            $sum: 1,
          },
        },
      },
    ]);

    if (result.length === 0) {
      return res.status(200).json({
        success: true,
        averageRating: 0,
        totalRatings: 0,
      });
    }

    res.status(200).json({
      success: true,
      averageRating: Number(result[0].averageRating.toFixed(2)),
      totalRatings: result[0].totalRatings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  addRating,
  getProductRatings,
  getAverageRating,
};