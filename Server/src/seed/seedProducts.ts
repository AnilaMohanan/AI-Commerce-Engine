import { faker } from "@faker-js/faker";
import Product from "../models/Product";

const seedProducts = async () => {
  try {
    await Product.deleteMany();

    const products = [];

    for (let i = 0; i < 1000; i++) {
      products.push({
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: Number(faker.commerce.price()),
        category: faker.commerce.department(),
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