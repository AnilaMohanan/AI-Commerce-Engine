import { faker } from "@faker-js/faker";
import Product from "../models/Product";
import Category from "../models/Category";
import { generateEmbedding } from "../services/embeddingService";

const seedProducts = async () => {
  try {
    await Product.deleteMany();

    const categories = await Category.find();

      const productData = [
  {
    category: "Mobiles",
    name: "Samsung Galaxy S24 Ultra",
    description: "Samsung Galaxy S24 Ultra - Premium Mobile product.",
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf",
    price: 2500,
    stock: 50,
  },
  {
    category: "Laptops",
    name: "MacBook Air M3",
    description: "MacBook Air M3 - Premium Laptop product.",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853",
    price: 4000,
    stock: 50,
  },
  {
    category: "Electronics",
    name: "Sony WH-1000XM5 Headphones",
    description: "Sony WH-1000XM5 Headphones - Premium Electronic product.",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    price: 5500,
    stock: 50,
  },
  {
    category: "Books",
    name: "Clean Code",
    description: "Clean Code - Premium Book product.",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794",
    price: 7000,
    stock: 50,
  },
  {
    category: "Clothing",
    name: "Nike Dri-FIT T-Shirt",
    description: "Nike Dri-FIT T-Shirt - Premium Clothing product.",
   image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
    price: 8500,
    stock: 50,
  },
  {
    category: "Mobiles",
    name: "Google Pixel 9",
    description: "Google Pixel 9 - Premium Mobile product.",
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97",
    price: 10000,
    stock: 50,
  },
  {
    category: "Laptops",
    name: "Dell XPS 13",
    description: "Dell XPS 13 - Premium Laptop product.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    price: 11500,
    stock: 50,
  },
  {
    category: "Electronics",
    name: "Apple AirPods Pro 2",
    description: "Apple AirPods Pro 2 - Premium Electronic product.",
    image: "https://images.unsplash.com/photo-1545454675-3531b543be5d",
    price: 13000,
    stock: 50,
  },
  {
    category: "Books",
    name: "Atomic Habits",
    description: "Atomic Habits - Premium Book product.",
    image: "/images/atomic-habits.jpg",
    price: 14500,
    stock: 50,
  },
  {
    category: "Clothing",
    name: "Levis 511 Slim Jeans",
    description: "Levis 511 Slim Jeans - Premium Clothing product.",
    image: "/images/levis-511.jpg",
    price: 16000,
    stock: 50,
  },
  {
    category: "Mobiles",
    name: "iPhone 16 Pro",
    description: "iPhone 16 Pro - Premium Mobile product.",
    image: "/images/iphone-16-pro.jpg",
    price: 17500,
    stock: 50,
  },
  {
    category: "Laptops",
    name: "HP Spectre x360",
    description: "HP Spectre x360 - Premium Laptop product.",
    image: "/images/hp-spectre-x360.jpg",
    price: 19000,
    stock: 50,
  },
  {
    category: "Electronics",
    name: "JBL Flip 6",
    description: "JBL Flip 6 - Premium Electronic product.",
    image: "/images/jbl-flip6.jpg",
    price: 20500,
    stock: 50,
  },
  {
    category: "Books",
    name: "Python Crash Course",
    description: "Python Crash Course - Premium Book product.",
    image: "/images/python-crash-course.jpg",
    price: 22000,
    stock: 50,
  },
  {
    category: "Clothing",
    name: "Adidas Essentials Hoodie",
    description: "Adidas Essentials Hoodie - Premium Clothing product.",
    image: "/images/adidas-hoodie.jpg",
    price: 23500,
    stock: 50,
  },
  {
    category: "Mobiles",
    name: "OnePlus 13",
    description: "OnePlus 13 - Premium Mobile product.",
    image: "/images/oneplus-13.jpg",
    price: 25000,
    stock: 50,
  },
  {
    category: "Laptops",
    name: "Lenovo ThinkPad X1 Carbon",
    description: "Lenovo ThinkPad X1 Carbon - Premium Laptop product.",
    image: "/images/thinkpad-x1.jpg",
    price: 26500,
    stock: 50,
  },
  {
    category: "Electronics",
    name: "Samsung Galaxy Buds3 Pro",
    description: "Samsung Galaxy Buds3 Pro - Premium Electronic product.",
    image: "/images/buds3-pro.jpg",
    price: 28000,
    stock: 50,
  },
  {
    category: "Books",
    name: "The Pragmatic Programmer",
    description: "The Pragmatic Programmer - Premium Book product.",
    image: "/images/pragmatic-programmer.jpg",
    price: 29500,
    stock: 50,
  },
  {
    category: "Clothing",
    name: "Puma Running Shoes",
    description: "Puma Running Shoes - Premium Clothing product.",
    image: "/images/puma-running-shoes.jpg",
    price: 31000,
    stock: 50,
  },
  {
    category: "Mobiles",
    name: "Xiaomi 15 Ultra",
    description: "Xiaomi 15 Ultra - Premium Mobile product.",
    image: "/images/xiaomi-15-ultra.jpg",
    price: 32500,
    stock: 50,
  },
  {
    category: "Laptops",
    name: "ASUS ROG Zephyrus G16",
    description: "ASUS ROG Zephyrus G16 - Premium Laptop product.",
    image: "/images/rog-g16.jpg",
    price: 34000,
    stock: 50,
  },
  {
    category: "Electronics",
    name: "Apple Watch Series 10",
    description: "Apple Watch Series 10 - Premium Electronic product.",
    image: "/images/apple-watch-10.jpg",
    price: 35500,
    stock: 50,
  },
  {
    category: "Books",
    name: "Rich Dad Poor Dad",
    description: "Rich Dad Poor Dad - Premium Book product.",
    image: "/images/rich-dad-poor-dad.jpg",
    price: 37000,
    stock: 50,
  },
  {
    category: "Clothing",
    name: "Allen Solly Casual Shirt",
    description: "Allen Solly Casual Shirt - Premium Clothing product.",
    image: "/images/allen-solly-shirt.jpg",
    price: 38500,
    stock: 50,
  },
  {
    category: "Mobiles",
    name: "Vivo X200 Pro",
    description: "Vivo X200 Pro - Premium Mobile product.",
    image: "/images/vivo-x200-pro.jpg",
    price: 40000,
    stock: 50,
  },
  {
    category: "Laptops",
    name: "Acer Swift Go 14",
    description: "Acer Swift Go 14 - Premium Laptop product.",
    image: "/images/acer-swift-go14.jpg",
    price: 41500,
    stock: 50,
  },
  {
    category: "Electronics",
    name: "Logitech MX Master 3S",
    description: "Logitech MX Master 3S - Premium Electronic product.",
    image: "/images/mx-master-3s.jpg",
    price: 43000,
    stock: 50,
  },
  {
    category: "Books",
    name: "Deep Learning with Python",
    description: "Deep Learning with Python - Premium Book product.",
    image: "/images/deep-learning-python.jpg",
    price: 44500,
    stock: 50,
  },
  {
    category: "Clothing",
    name: "Nike Air Max Sneakers",
    description: "Nike Air Max Sneakers - Premium Clothing product.",
    image: "/images/nike-air-max.jpg",
    price: 46000,
    stock: 50,
  },
  {
    category: "Mobiles",
    name: "OPPO Find X8 Pro",
    description: "OPPO Find X8 Pro - Premium Mobile product.",
    image: "/images/oppo-find-x8-pro.jpg",
    price: 47500,
    stock: 50,
  },
  {
    category: "Laptops",
    name: "MSI Stealth 16 AI Studio",
    description: "MSI Stealth 16 AI Studio - Premium Laptop product.",
    image: "/images/msi-stealth16.jpg",
    price: 49000,
    stock: 50,
  },
  {
    category: "Electronics",
    name: "Amazon Echo Dot 5",
    description: "Amazon Echo Dot 5 - Premium Electronic product.",
    image: "/images/echo-dot5.jpg",
    price: 50500,
    stock: 50,
  },
  {
    category: "Books",
    name: "The Psychology of Money",
    description: "The Psychology of Money - Premium Book product.",
    image: "/images/psychology-money.jpg",
    price: 52000,
    stock: 50,
  },
  {
    category: "Clothing",
    name: "Van Heusen Formal Shirt",
    description: "Van Heusen Formal Shirt - Premium Clothing product.",
    image: "/images/van-heusen-shirt.jpg",
    price: 53500,
    stock: 50,
  },
  {
    category: "Mobiles",
    name: "Motorola Edge 60 Pro",
    description: "Motorola Edge 60 Pro - Premium Mobile product.",
    image: "/images/moto-edge60.jpg",
    price: 55000,
    stock: 50,
  },
  {
    category: "Laptops",
    name: "Samsung Galaxy Book5 Pro",
    description: "Samsung Galaxy Book5 Pro - Premium Laptop product.",
    image: "/images/galaxy-book5.jpg",
    price: 56500,
    stock: 50,
  },
  {
    category: "Electronics",
    name: "Anker 737 Power Bank",
    description: "Anker 737 Power Bank - Premium Electronic product.",
    image: "/images/anker737.jpg",
    price: 58000,
    stock: 50,
  },
  {
    category: "Books",
    name: "Introduction to Algorithms",
    description: "Introduction to Algorithms - Premium Book product.",
    image: "/images/clrs.jpg",
    price: 59500,
    stock: 50,
  },
  {
    category: "Clothing",
    name: "Peter England Chinos",
    description: "Peter England Chinos - Premium Clothing product.",
    image: "/images/peter-england-chinos.jpg",
    price: 61000,
    stock: 50,
  },
  {
    category: "Mobiles",
    name: "Nothing Phone 3",
    description: "Nothing Phone 3 - Premium Mobile product.",
    image: "/images/nothing-phone3.jpg",
    price: 62500,
    stock: 50,
  },
  {
    category: "Laptops",
    name: "Microsoft Surface Laptop 7",
    description: "Microsoft Surface Laptop 7 - Premium Laptop product.",
    image: "/images/surface-laptop7.jpg",
    price: 64000,
    stock: 50,
  },
  {
    category: "Electronics",
    name: "Logitech C920 Webcam",
    description: "Logitech C920 Webcam - Premium Electronic product.",
    image: "/images/c920.jpg",
    price: 65500,
    stock: 50,
  },
  {
    category: "Books",
    name: "The Alchemist",
    description: "The Alchemist - Premium Book product.",
    image: "/images/the-alchemist.jpg",
    price: 67000,
    stock: 50,
  },
  {
    category: "Clothing",
    name: "US Polo Polo T-Shirt",
    description: "US Polo Polo T-Shirt - Premium Clothing product.",
    image: "/images/us-polo.jpg",
    price: 68500,
    stock: 50,
  },
  {
    category: "Mobiles",
    name: "Realme GT 7 Pro",
    description: "Realme GT 7 Pro - Premium Mobile product.",
    image: "/images/realme-gt7pro.jpg",
    price: 70000,
    stock: 50,
  },
  {
    category: "Laptops",
    name: "ASUS Vivobook S15",
    description: "ASUS Vivobook S15 - Premium Laptop product.",
    image: "/images/vivobook-s15.jpg",
    price: 71500,
    stock: 50,
  },
  {
    category: "Electronics",
    name: "Sony SRS-XB100 Speaker",
    description: "Sony SRS-XB100 Speaker - Premium Electronic product.",
    image: "/images/sony-xb100.jpg",
    price: 73000,
    stock: 50,
  },
  {
    category: "Books",
    name: "Think and Grow Rich",
    description: "Think and Grow Rich - Premium Book product.",
    image: "/images/think-grow-rich.jpg",
    price: 74500,
    stock: 50,
  },
  {
    category: "Clothing",
    name: "Tommy Hilfiger Jacket",
    description: "Tommy Hilfiger Jacket - Premium Clothing product.",
    image: "/images/tommy-jacket.jpg",
    price: 76000,
    stock: 50,
  },
];



    const products = [];

for (const product of productData) {
  const category = categories.find(
    (c) => c.name === product.category
  );

  if (!category) continue;

  const embeddings = await generateEmbedding(
    `${product.name} ${product.description}`
  );

  products.push({
    name: product.name,
    description: product.description,
    price: product.price,
    category: category._id,
    stock: product.stock,
    image: product.image,
    embeddings,
  });
}

await Product.insertMany(products);

console.log("50 Products Seeded Successfully");
  } catch (error) {
    console.log(error);
  }
};

export default seedProducts;