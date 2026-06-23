require("dotenv").config();

const mongoose = require("mongoose");
const Product = require("../models/Product");

async function seedProducts() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const products = [];

    const categories = [
      "Electronics",
      "Fashion",
      "Books",
      "Sports",
      "Home"
    ];

    for (let i = 1; i <= 10000; i++) {
      products.push({
        name: `Product ${i}`,
        category:
          categories[
            Math.floor(
              Math.random() * categories.length
            )
          ],
        brand: `Brand ${Math.ceil(Math.random()*20)}`,
        price:
          Math.floor(Math.random()*5000)+100,
        stock:
          Math.floor(Math.random()*100),
        rating:
          (Math.random()*5).toFixed(1),
        description:
          `Description for Product ${i}`,
        image:
          "https://dummyimage.com/300x300"
      });
    }

    await Product.deleteMany({});

    await Product.insertMany(products);

    console.log(
      `${products.length} products inserted`
    );

    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

seedProducts();