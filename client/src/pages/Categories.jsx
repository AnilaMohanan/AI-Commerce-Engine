import { useEffect, useState } from "react";
import axios from "axios";

function Categories() {
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/categories"
        );

        //setCategories(response.data);
        setCategories(response.data.categories || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  /*const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(search.toLowerCase())
  );*/
const filteredCategories = categories.filter((category) =>
  (category.name || "")
    .toLowerCase()
    .includes(search.toLowerCase())
);
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Categories</h1>

        <input
          type="text"
          placeholder="🔍 Search Category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-lg px-4 py-2 w-72"
        />
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b text-left">
              <th className="p-3">Image</th>
              <th className="p-3">Category</th>
              <th className="p-3">Description</th>
            </tr>
          </thead>

          <tbody>
            {filteredCategories.length > 0 ? (
              filteredCategories.map((category) => (
                <tr
                  key={category._id}
                  className="border-b hover:bg-gray-100"
                >
                  <td className="p-3">
                    <td className="p-3">
  {category.image ? (
    <img
      src={category.image}
      alt={category.name}
      className="w-12 h-12 object-cover rounded"
    />
  ) : (
    "No Image"
  )}
</td>
                  </td>

                  <td className="p-3 font-medium">
                    {category.name}
                  </td>

                  <td className="p-3">
                    {category.description}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="3"
                  className="text-center p-6 text-gray-500"
                >
                  No Categories Found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Categories;