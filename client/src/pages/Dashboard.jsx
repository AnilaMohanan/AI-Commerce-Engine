import { useEffect, useState } from "react";
import axios from "axios";
import { getDashboardStats } from "../api/dashboardApi";

import StatsCard from "../components/StatsCard";
import ProductTable from "../components/ProductTable";
import BarChart from "../components/charts/BarChart";
import PieChart from "../components/charts/PieChart";
import LineChart from "../components/charts/LineChart";

function Dashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalCategories: 0,
    totalStock: 0,
    lowStock: 0,
  });
  const [adminStats, setAdminStats] = useState({
  totalOrders: 0,
  totalUsers: 0,
  totalRevenue: 0,
  recentOrders: [],
});

  const [barChartData, setBarChartData] = useState({
    labels: [],
    values: [],
  });

  const [pieChartData, setPieChartData] = useState({
    labels: [],
    values: [],
  });

  const [lineChartData, setLineChartData] = useState({
    labels: [],
    values: [],
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [productsRes, categoriesRes] = await Promise.all([
        axios.get("http://localhost:5000/api/products?limit=1000"),
        axios.get("http://localhost:5000/api/categories"),
      ]);

      const products = productsRes.data;
      console. log(productsRes.data)
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

      // -------- Bar Chart --------
      const categoryCounts = {};

      products.forEach((product) => {
        const category =
          product.category?.name || "Unknown";

        categoryCounts[category] =
          (categoryCounts[category] || 0) + 1;
      });

      setBarChartData({
        labels: Object.keys(categoryCounts),
        values: Object.values(categoryCounts),
      });

      // -------- Pie Chart --------
      const inStock = products.filter(
        (product) => product.stock >= 10
      ).length;

      const lowStockProducts = products.filter(
        (product) => product.stock < 10
      ).length;

      setPieChartData({
        labels: ["In Stock", "Low Stock"],
        values: [inStock, lowStockProducts],
      });

      // -------- Line Chart --------
      const sortedProducts = [...products]
        .sort((a, b) => a.name.localeCompare(b.name))
        .slice(0, 10);

      setLineChartData({
        labels: sortedProducts.map(
          (product) => product.name
        ),
        values: sortedProducts.map(
          (product) => product.stock
        ),
      });
const dashboard = await getDashboardStats();

setAdminStats({
  totalOrders: dashboard.stats.totalOrders,
  totalUsers: dashboard.stats.totalUsers,
  totalRevenue: dashboard.stats.totalRevenue,
  recentOrders: dashboard.stats.recentOrders,
});
    } catch (error) {
      console.error("Dashboard Error:", error);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800">
        Dashboard
      </h1>

      <p className="text-gray-500 mt-2 mb-8">
        Welcome back! Here's an overview of your store.
      </p>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">

  <StatsCard
    title="🧾 Total Orders"
    value={adminStats.totalOrders}
  />

  <StatsCard
    title="👥 Total Users"
    value={adminStats.totalUsers}
  />

  <StatsCard
    title="💰 Revenue"
    value={`₹${adminStats.totalRevenue}`}
  />

</div>
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

      {/* Bar + Pie Charts */}
      <div className="grid md:grid-cols-2 gap-6 mt-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <BarChart chartData={barChartData} />
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <PieChart chartData={pieChartData} />
        </div>
      </div>

      {/* Line Chart */}
<div className="bg-white rounded-xl shadow-lg p-6 mt-8">
  <LineChart chartData={lineChartData} />
</div>

{/* Recent Orders */}
<div className="bg-white rounded-xl shadow-lg p-6 mt-8">
  <h2 className="text-2xl font-bold mb-4">
    Recent Orders
  </h2>

  {adminStats.recentOrders.length === 0 ? (
    <p>No recent orders.</p>
  ) : (
    adminStats.recentOrders.map((order) => (
      <div
        key={order._id}
        className="flex justify-between border-b py-3"
      >
        <span>{order.user?.name || "Unknown User"}</span>
        <span>₹{order.totalAmount}</span>
        <span>{order.status}</span>
      </div>
    ))
  )}
</div>

{/* Product Table */}
<div className="mt-8">
  <ProductTable />
</div>
    </div>
  );
}

export default Dashboard;