console.log("Server.js started");
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const redisClient = require("./config/redis");
const mongoose = require("mongoose");
//const authRoutes = require("./routes/authRoutes");

const categoryRoutes = require("./routes/categoryRoutes");
const orderRoutes = require("./routes/orderRoutes");
const wishlistRoutes = require("./routes/wishlistRoutes");
const userRoutes = require("./routes/userRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const ratingRoutes = require("./routes/ratingRoutes");
const productRoutes = require("./routes/productRoutes");




const app = express();
app.use(cors());
app.use(express.json());
//app.use(express.json());


app.use("/api/categories", categoryRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/wishlist",wishlistRoutes);
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/ratings", ratingRoutes);




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





