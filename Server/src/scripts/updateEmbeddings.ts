import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "../models/Product";

dotenv.config();

const updateEmbeddings = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);

    const products = await Product.find();

    for (const product of products) {
      product.embeddings = Array.from(
        { length: 20 },
        () => Math.random()
      );

      await product.save();
    }

    console.log("Embeddings added successfully");
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

updateEmbeddings();