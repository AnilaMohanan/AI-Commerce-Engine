import dotenv from "dotenv";
import connectDB from "../config/db";
import seedProducts from "./seedProducts";

dotenv.config();

const runSeed = async () => {
  await connectDB();
  await seedProducts();
  process.exit();
};

runSeed();