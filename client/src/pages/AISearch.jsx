import { useState } from "react";
import axios from "axios";

function AISearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) {
      alert("Please enter a search query.");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:5000/api/products/vector-search",
        {
          query,
        }
      );

      setResults(response.data.results);
    } catch (error) {
      console.error(error);
      alert("AI Search Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">
        🤖 AI Product Search
      </h1>

      <div className="flex gap-3 mb-8">
        <input
          type="text"
          placeholder="Search using natural language..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 border rounded-lg p-3"
        />

        <button
          onClick={handleSearch}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 rounded-lg"
        >
          Search
        </button>
      </div>

      {loading && (
        <p className="text-blue-600 font-semibold">
          Searching with AI...
        </p>
      )}

      {!loading && results.length === 0 && (
        <p className="text-gray-500">
          No products found. Try another search.
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {results.map((product) => (
          <div
            key={product._id}
            className="bg-white shadow-lg rounded-xl overflow-hidden"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-52 object-cover"
            />

            <div className="p-5">
              <h2 className="text-xl font-bold">
                {product.name}
              </h2>

              <p className="text-gray-500 mt-2">
                {product.description}
              </p>

              <p className="text-green-600 font-bold mt-3">
                ₹{product.price}
              </p>

              <p className="mt-2">
                Stock: {product.stock}
              </p>

              <p className="text-blue-600 mt-2 font-semibold">
                AI Score: {product.score.toFixed(3)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AISearch;