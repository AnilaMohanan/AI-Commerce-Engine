import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function EditProduct() {
  const { id } = useParams();
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
    fetchProduct();
    fetchCategories();
  }, []);

  const fetchProduct = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/products/${id}`
      );

      const product = res.data;

      setFormData({
        name: product.name,
        description: product.description,
        price: product.price,
        category: product.category?._id || product.category,
        stock: product.stock,
        image: product.image,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/categories"
      );

      setCategories(res.data);
    } catch (error) {
      console.error(error);
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

      await axios.put(
        `http://localhost:5000/api/products/${id}`,
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

      alert("Product Updated Successfully!");

      navigate("/admin/products");
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Failed to update product."
      );
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-8">
      <h1 className="text-3xl font-bold mb-6">
        Edit Product
      </h1>

      <form onSubmit={handleSubmit} className="space-y-5">

        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Product Name"
          className="w-full border rounded-lg p-3"
          required
        />

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
          required
        >
          <option value="">Select Category</option>

          {categories.map((category) => (
            <option
              key={category._id}
              value={category._id}
            >
              {category.name}
            </option>
          ))}
        </select>

        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price"
          className="w-full border rounded-lg p-3"
          required
        />

        <input
          type="number"
          name="stock"
          value={formData.stock}
          onChange={handleChange}
          placeholder="Stock"
          className="w-full border rounded-lg p-3"
          required
        />

        <textarea
          rows="4"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full border rounded-lg p-3"
          required
        />

        <input
          type="text"
          name="image"
          value={formData.image}
          onChange={handleChange}
          placeholder="Image URL"
          className="w-full border rounded-lg p-3"
        />

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
        >
          Update Product
        </button>

      </form>
    </div>
  );
}

export default EditProduct;