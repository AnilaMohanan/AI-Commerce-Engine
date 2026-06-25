import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import { connectRedis } from "./config/redis";
import authRoutes from "./routes/authRoutes"; 
import productRoutes from "./routes/productRoutes";


dotenv.config();

connectDB();
connectRedis();

const app = express();

app.use(express.json());
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);


app.get("/", (req, res) => {
  res.send("Server Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});