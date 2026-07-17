import { useNavigate } from "react-router-dom";
import { addToCart } from "../../api/cartApi";
import { addToWishlist } from "../../api/wishlistApi";

function ProductCard({ product }) {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const handleAddToCart = async () => {
    try {
      if (!user._id) {
        alert("Please login first.");
        return;
      }

      await addToCart({
        userId: user._id,
        productId: product._id,
        quantity: 1,
      });

      alert("Product added to cart successfully!");
    } catch (error) {
      console.error(error);
      alert(
        error.response?.data?.message ||
          "Failed to add product to cart."
      );
    }
  };

  const handleWishlist = async () => {
    try {
      if (!user._id) {
        alert("Please login first.");
        return;
      }

      const response = await addToWishlist({
        userId: user._id,
        productId: product._id,
      });

      alert(response.message);
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Failed to add to wishlist."
      );
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition p-4">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover rounded-lg"
      />

      <h2 className="text-lg font-bold mt-4">
        {product.name}
      </h2>

      <p className="text-gray-500 mt-2 line-clamp-2">
        {product.description}
      </p>

      <div className="mt-4">
        <span className="text-2xl font-bold text-blue-600">
          ₹{product.price}
        </span>
      </div>

      <div className="flex gap-2 mt-5">
        <button
          onClick={() => navigate(`/product/${product._id}`)}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
        >
          View
        </button>

        <button
          onClick={handleAddToCart}
          className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg"
        >
          🛒 Add
        </button>

        <button
          onClick={handleWishlist}
          className="bg-pink-500 hover:bg-pink-600 text-white px-4 rounded-lg"
        >
          ❤
        </button>
      </div>
    </div>
  );
}

export default ProductCard;