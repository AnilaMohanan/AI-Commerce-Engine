require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db");
const redisClient = require("./config/redis");
const productRoutes = require("./routes/productRoutes");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const orderRoutes = require("./routes/orderRoutes");
const wishlistRoutes = require("./routes/wishlistRoutes");


const app = express();
app.use(express.json());



app.use("/auth", authRoutes);
app.use("/categories", categoryRoutes);
app.use("/orders", orderRoutes);
app.use("/wishlist",wishlistRoutes);
app.use("/products", productRoutes);

connectDB();

(async () => {
  try {
    await redisClient.connect();
    console.log("Redis Connected");
  } catch (error) {
    console.error("Redis Connection Error:", error.message);
  }
})();

app.get("/", (req, res) => {
  res.send("API Running");
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});





