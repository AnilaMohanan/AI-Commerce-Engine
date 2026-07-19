import { useEffect, useState } from "react";
import {
  getWishlist,
  removeWishlistItem,
} from "../api/wishlistApi";
import { addToCart } from "../api/cartApi";

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);

  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      const response = await getWishlist(user._id);
console.log(response.wishlist);
      setWishlist(response.wishlist || []);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemove = async (id) => {
    try {
      const response = await removeWishlistItem(id);

      alert(response.message);

      fetchWishlist();
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Failed to remove item."
      );
    }
  };

  const handleMoveToCart = async (item) => {
    try {
      await addToCart({
        userId: user._id,
        productId: item.product._id,
        quantity: 1,
      });

      await removeWishlistItem(item._id);

      alert("Moved to cart successfully!");

      fetchWishlist();
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Failed to move item."
      );
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">

      <h1 className="text-4xl font-bold mb-8">
        My Wishlist
      </h1>

      {wishlist.length === 0 ? (
        <div className="bg-white rounded-xl shadow p-8 text-center">
          Your wishlist is empty.
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {wishlist.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-xl shadow-lg p-5"
            >
              <img
                src={item.product.image}
                alt={item.product.name}
                className="w-full h-48 object-cover rounded-lg"
              />

              <h2 className="text-xl font-bold mt-4">
                {item.product.name}
              </h2>

              <p className="text-blue-600 font-bold mt-2">
                ₹{item.product.price}
              </p>

              <div className="flex gap-2 mt-5">

                <button
                  onClick={() => handleMoveToCart(item)}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg"
                >
                  🛒 Move to Cart
                </button>

                <button
                  onClick={() => handleRemove(item._id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 rounded-lg"
                >
                  Remove
                </button>

              </div>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}

export default Wishlist;