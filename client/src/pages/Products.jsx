import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/CartContext";
import { addToCart as addToCartAPI } from "../api/cartApi";

function Products() {
  const navigate = useNavigate();
const { addToCart } = useCart();
const user = JSON.parse(localStorage.getItem("user"));

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/products"
      );

      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  const handleAddToCart = async (product) => {
  try {
    await addToCartAPI({
      userId: user._id,
      productId: product._id,
      quantity: 1,
    });

    // Keep local cart updated
    addToCart(product);

    alert("Product added to cart successfully!");
  } catch (error) {
    console.error(error);
    alert("Failed to add product to cart.");
  }
};

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `http://localhost:5000/api/products/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Product deleted successfully!");

setProducts((prevProducts) =>
  prevProducts.filter((product) => product._id !== id)
);
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Failed to delete product."
      );
    }
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          Products
        </h1>

        <input
          type="text"
          placeholder="🔍 Search Product..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-lg px-4 py-2 w-72"
        />
      </div>

      {/* Product Table */}
      <div className="bg-white rounded-xl shadow-md p-6 overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b text-left">
              <th className="p-3">Image</th>
              <th className="p-3">Product</th>
              <th className="p-3">Category</th>
              <th className="p-3">Price</th>
              <th className="p-3">Stock</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <tr
                  key={product._id}
                  className="border-b hover:bg-gray-100 transition"
                >
                  <td className="p-3">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-14 h-14 rounded-lg object-cover"
                    />
                  </td>

                  <td className="p-3 font-medium">
                    {product.name}
                  </td>

                  <td className="p-3">
                    {product.category?.name || "N/A"}
                  </td>

                  <td className="p-3">
                    ₹{product.price}
                  </td>

                  <td className="p-3">
                    {product.stock}
                  </td>

                  <td className="p-3">
                    {/*
  <button
    onClick={() => handleAddToCart(product)}
    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded mr-2"
  >
    🛒 Cart
  </button>
*/ }
  <button
    onClick={() =>
      navigate(`/admin/edit-product/${product._id}`)
    }
    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded mr-2"
  >
    Edit
  </button>

  <button
    onClick={() =>
      handleDelete(product._id)
    }
    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
  >
    Delete
  </button>
</td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="text-center p-6 text-gray-500"
                >
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Products;