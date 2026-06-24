import Product from "../models/Product";
import redisClient from "../config/redis";

export const getProducts = async (req: any, res: any) => {
  try {
    const cachedProducts = await redisClient.get("products:all");

    if (cachedProducts) {
      console.log("Serving from Redis Cache");
      return res.json(JSON.parse(cachedProducts));
    }

    const products = await Product.find();

await redisClient.setEx(
  "products:all",
  3600,
  JSON.stringify(products)
);
    console.log("Serving from MongoDB");

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
    export const updateProduct = async (req: any, res: any) => {
  try {
    await Product.findByIdAndUpdate(req.params.id, req.body);

    await redisClient.del("products:all");

    res.json({ message: "Product updated and cache cleared" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });

  }
};
export const deleteProduct = async (req: any, res: any) => {
  try {
    await Product.findByIdAndDelete(req.params.id);

    await redisClient.del("products:all");

    res.json({
      message: "Product deleted and cache cleared",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",});

  }
};
export const createProduct = async (req: any, res: any) => {
  try {
    const product = await Product.create(req.body);

    await redisClient.del("products:all");

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};
