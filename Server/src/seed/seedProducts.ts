import { faker } from "@faker-js/faker";
import Product from "../models/Product";
import Category from "../models/Category";
import axios from "axios";

const seedProducts = async () => {
  try {
    await Product.deleteMany();

    const categories = await Category.find();

    const products = [];

    for (let i = 0; i < 1000; i++) {
      const randomCategory =
        categories[Math.floor(Math.random() * categories.length)];

      products.push({
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: Number(faker.commerce.price()),
        category: randomCategory._id,
        stock: faker.number.int({ min: 1, max: 100 }),
        image: faker.image.url(),
      });
    }

    await Product.insertMany(products);

    console.log("1000 Products Seeded Successfully");
  } catch (error) {
    console.log(error);
  }
};

export default seedProducts;