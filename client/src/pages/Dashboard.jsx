import StatsCard from "../components/StatsCard";

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

      <div className="mt-10 bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4">
          Recent Products
        </h2>

        <p className="text-gray-500">
          Product table will be displayed here.
        </p>
      </div>
    </div>
  );
}

export default Dashboard;