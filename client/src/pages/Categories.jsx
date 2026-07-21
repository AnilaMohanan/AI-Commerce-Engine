import { useEffect, useState } from "react";
import axios from "axios";
import AddCategoryModal from "../components/AddCategoryModal";
import EditCategoryModal from "../components/EditCategoryModal";

function Categories() {
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
const deleteCategory = async (id) => {
  const token = localStorage.getItem("token");

  if (!window.confirm("Delete this category?")) return;

  try {
    await axios.delete(
      `http://localhost:5000/api/categories/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    fetchCategories();

    alert("Category deleted successfully");
  } catch (error) {
    console.log(error);

    alert("Delete failed");
  }
};
  const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/categories"
        );

        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

  useEffect(() => {
    
    fetchCategories();
  }, []);

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(search.toLowerCase())
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
        <button
    onClick={() => setShowModal(true)}
    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
>
    + Add Category
</button>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b text-left">
             
             <th className="p-3">
        Category
    </th>

    <th className="p-3">
        Description
    </th>

    <th className="p-3 text-center">
        Action
    </th>

            </tr>
          </thead>

          <tbody>
            {filteredCategories.length > 0 ? (
              filteredCategories.map((category) => (
<tr
key={category._id}
className="border-b hover:bg-gray-50"
>

    <td className="p-3 font-semibold">
        {category.name}
    </td>

    <td className="p-3">
        {category.description}
    </td>

    <td className="p-3">

        <div className="flex gap-3 justify-center">

            <button
                onClick={()=>{
                    setSelectedCategory(category);
                    setShowEditModal(true);
                }}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg"
            >
                Edit
            </button>

            <button
                onClick={() =>
                    deleteCategory(category._id)
                }
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
            >
                Delete
            </button>

        </div>

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
      <AddCategoryModal

    show={showModal}

    onClose={() => setShowModal(false)}

    onCategoryAdded={fetchCategories}

/>
<EditCategoryModal

show={showEditModal}

category={selectedCategory}

onClose={() =>
    setShowEditModal(false)
}

onCategoryUpdated={fetchCategories}

/>
    </div>
  );
}

export default Categories;