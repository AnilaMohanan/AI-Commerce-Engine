import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getCart,
  updateCartQuantity,
  removeCartItem,
  calculateCartTotal,
} from "../api/cartApi";

function Cart() {
    const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [subtotal, setSubtotal] = useState(0);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (user?._id) {
      fetchCart();
    }
  }, []);

  const fetchCart = async () => {
    try {
      const response = await getCart(user._id);

      const cartItems = response.cart || [];

      setCart(cartItems);

      if (cartItems.length > 0) {
        const total = await calculateCartTotal(
          cartItems.map((item) => ({
            productId: item.product._id,
            quantity: item.quantity,
          }))
        );

        setSubtotal(total.subtotal);
      } else {
        setSubtotal(0);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const increase = async (item) => {
    await updateCartQuantity(item._id, item.quantity + 1);
    fetchCart();
  };

  const decrease = async (item) => {
    if (item.quantity <= 1) return;

    await updateCartQuantity(item._id, item.quantity - 1);
    fetchCart();
  };

  const remove = async (item) => {
    await removeCartItem(item._id);
    fetchCart();
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">
        Shopping Cart
      </h1>

      {cart.length === 0 ? (
        <div className="bg-white rounded-xl shadow p-8 text-center">
          Your cart is empty.
        </div>
      ) : (
        <>
          <div className="space-y-5">
            {cart.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-xl shadow p-5 flex justify-between items-center"
              >
                <div className="flex gap-5">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-24 h-24 rounded-lg object-cover"
                  />

                  <div>
                    <h2 className="font-bold text-xl">
                      {item.product.name}
                    </h2>

                    <p className="text-gray-500">
                      ₹{item.product.price}
                    </p>

                    <div className="flex gap-3 mt-4">
                      <button
                        onClick={() => decrease(item)}
                        className="px-3 py-1 bg-gray-200 rounded"
                      >
                        −
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        onClick={() => increase(item)}
                        className="px-3 py-1 bg-gray-200 rounded"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => remove(item)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-xl shadow p-6 mt-8">
            <h2 className="text-2xl font-bold">
              Total : ₹{subtotal}
            </h2>

            <button
  onClick={() => navigate("/checkout")}
  className="mt-5 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
>
  Proceed to Checkout
</button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;