import { useEffect, useState } from "react";
import axios from "axios";

import Hero from "../components/store/Hero";
import CategorySection from "../components/store/CategorySection";
import ProductCard from "../components/store/ProductCard";

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/products?limit=8"
      );

      // Store only the first 8 products
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  return (
    <div className="space-y-10">
      {/* Hero Section */}
      <Hero />

      {/* Categories */}
      <CategorySection />

      {/* Featured Products */}
      <div>
        <h2 className="text-3xl font-bold mb-6">
          Featured Products
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;