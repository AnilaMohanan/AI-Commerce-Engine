const express = require("express");
const Product = require("../models/Product");
const redisClient = require("../config/redis");
const router = express.Router();

//---Create Product---//

router.post("/", async (req, res) => {
  try {
    const product = await Product.create(req.body);

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


//---Read All Product with Redis cache--//



router.get("/", async (req, res) => {
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
});

//Read Single Product ///
router.get("/:id", async (req, res) => {
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
});


//Update Product//
router.put("/:id", async (req, res) => {
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
});

//Delete Product//

router.delete("/:id", async (req, res) => {
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
});



module.exports = router;