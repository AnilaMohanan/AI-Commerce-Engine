import { useEffect, useState } from "react";
import axios from "axios";

import StatsCard from "../components/StatsCard";
import ProductTable from "../components/ProductTable";

function Dashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalCategories: 0,
    totalStock: 0,
    lowStock: 0,
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          axios.get("http://localhost:5000/api/products"),
          axios.get("http://localhost:5000/api/categories"),
        ]);

        const products = productsRes.data;
        const categories = categoriesRes.data;

        const totalStock = products.reduce(
          (sum, product) => sum + product.stock,
          0
        );

        const lowStock = products.filter(
          (product) => product.stock < 10
        ).length;

        setStats({
          totalProducts: products.length,
          totalCategories: categories.length,
          totalStock,
          lowStock,
        });
      } catch (error) {
        console.error("Dashboard Error:", error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800">
        Dashboard
      </h1>

      <p className="text-gray-500 mt-2 mb-8">
        Welcome back! Here's an overview of your store.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <StatsCard
          title="📦 Total Products"
          value={stats.totalProducts}
        />

        <StatsCard
          title="📂 Categories"
          value={stats.totalCategories}
        />

        <StatsCard
          title="📦 Total Stock"
          value={stats.totalStock}
        />

        <StatsCard
          title="⚠️ Low Stock"
          value={stats.lowStock}
        />
      </div>

      <div className="mt-8">
        <ProductTable />
      </div>
    </div>
  );
}

export default Dashboard;