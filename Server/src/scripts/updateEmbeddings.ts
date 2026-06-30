import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "../models/Product";
import { generateEmbedding } from "../services/embeddingService";

dotenv.config();

const updateEmbeddings = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);

    console.log("MongoDB Connected");

    const products = await Product.find();

    console.log(`Found ${products.length} products`);

    for (const product of products) {
      const text = `${product.name} ${product.description}`;

      const embedding = await generateEmbedding(text);

      (product as any).embeddings = embedding;

      await product.save();

      console.log(`Updated: ${product.name}`);
    }

    console.log("All product embeddings updated successfully!");

    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

updateEmbeddings();