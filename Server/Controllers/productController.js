const Product = require("../models/Product");
const redisClient = require("../config/redis");

// ADD PRODUCT
exports.addProduct= async (req, res) => {
  try {
    const product = await Product.create(req.body);

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


//---Read All Product with Redis cache--//
exports.getAllProduct=async (req, res) => {
  try {
    const cachedProducts =
      await redisClient.get("products");

    if (cachedProducts) {
      console.log("Cache Hit");

      return res.json(
        JSON.parse(cachedProducts)
      );
    }

    console.log("Cache Miss");

    const products =
      await Product.find();

    await redisClient.setEx(
      "products",
      60,
      JSON.stringify(products)
    );

    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Read Single Product ///

exports.getProductById=async (req, res) => {
  try {
    const product =
      await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Update Product

exports.updateProduct=async (req, res) => {
  try {
    const product =
      await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true,runValidators: true }
      );

    await redisClient.del("products");

    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Delete Product


exports.deleteProduct=async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(
      req.params.id
    );

    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    await redisClient.del("products");

    res.json({
      message: "Product deleted"
    });
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};
