function StatsCard({ title, value }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition">
      <h2 className="text-gray-500 text-lg">
        {title}
      </h2>

      <h1 className="text-4xl font-bold mt-3 text-blue-600">
        {value}
      </h1>
    </div>
  );
}

export default StatsCard;