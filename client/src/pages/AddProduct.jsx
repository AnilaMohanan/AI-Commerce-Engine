import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddProduct() {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    image: "",
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/categories"
      );

      setCategories(res.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:5000/api/products",
        {
          ...formData,
          price: Number(formData.price),
          stock: Number(formData.stock),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Product Added Successfully!");

      navigate("/admin/products");
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Failed to add product."
      );
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-8">

      <h1 className="text-3xl font-bold mb-6">
        Add New Product
      </h1>

      <form onSubmit={handleSubmit} className="space-y-5">

        <div>
          <label className="block font-medium mb-2">
            Product Name
          </label>

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter product name"
            className="w-full border rounded-lg p-3"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-2">
            Category
          </label>

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          >
            <option value="">
              Select Category
            </option>

            {categories.map((category) => (
              <option
                key={category._id}
                value={category._id}
              >
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-5">

          <div>
            <label className="block font-medium mb-2">
              Price
            </label>

            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Enter price"
              className="w-full border rounded-lg p-3"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-2">
              Stock
            </label>

            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              placeholder="Enter stock"
              className="w-full border rounded-lg p-3"
              required
            />
          </div>

        </div>

        <div>
          <label className="block font-medium mb-2">
            Description
          </label>

          <textarea
            rows="4"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter product description"
            className="w-full border rounded-lg p-3"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-2">
            Product Image URL
          </label>

          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="Paste image URL"
            className="w-full border rounded-lg p-3"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
        >
          Add Product
        </button>

      </form>

    </div>
  );
}

export default AddProduct;