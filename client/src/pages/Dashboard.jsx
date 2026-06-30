import StatsCard from "../components/StatsCard";
import ProductTable from "../components/ProductTable";

function Dashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800">
        Dashboard
      </h1>

      <p className="text-gray-500 mt-2 mb-8">
        Welcome back! Here's an overview of your store.
      </p>

      <div className="grid grid-cols-3 gap-6">
        <StatsCard title="📦 Total Products" value="1000" />
        <StatsCard title="📂 Categories" value="12" />
        <StatsCard title="🛒 Orders" value="250" />
      </div>

      <ProductTable />
    </div>
  );
}

export default Dashboard;