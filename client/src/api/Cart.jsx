import { useEffect, useState } from "react";
import {
  getCart,
  updateCartQuantity,
  removeCartItem,
  calculateCartTotal,
} from "../api/cartApi";

function Cart() {
  const [cart, setCart] = useState([]);
  const [subtotal, setSubtotal] = useState(0);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const response = await getCart(user._id);

      const cartItems = response.cart || [];

      setCart(cartItems);

      calculateTotal(cartItems);
    } catch (error) {
      console.error(error);
    }
  };

  const calculateTotal = async (cartItems) => {
    try {
      const items = cartItems.map((item) => ({
        productId: item.product._id,
        quantity: item.quantity,
      }));

      const response = await calculateCartTotal(items);

      setSubtotal(response.subtotal);
    } catch (error) {
      console.error(error);
    }
  };

  const increase = async (item) => {
    await updateCartQuantity(item._id, item.quantity + 1);
    fetchCart();
  };

  const decrease = async (item) => {
    if (item.quantity === 1) return;

    await updateCartQuantity(item._id, item.quantity - 1);
    fetchCart();
  };

  const remove = async (id) => {
    await removeCartItem(id);
    fetchCart();
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">
        Shopping Cart
      </h1>

      {cart.length === 0 ? (
        <div className="bg-white rounded-xl p-8 shadow">
          <h2 className="text-xl text-gray-500">
            Your cart is empty.
          </h2>
        </div>
      ) : (
        <>
          <div className="space-y-6">
            {cart.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-xl shadow p-6 flex justify-between items-center"
              >
                <div className="flex gap-4">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-24 h-24 rounded-lg object-cover"
                  />

                  <div>
                    <h2 className="text-xl font-bold">
                      {item.product.name}
                    </h2>

                    <p className="text-gray-500">
                      ₹{item.product.price}
                    </p>

                    <div className="flex items-center gap-3 mt-4">
                      <button
                        onClick={() => decrease(item)}
                        className="bg-gray-200 px-3 rounded"
                      >
                        -
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        onClick={() => increase(item)}
                        className="bg-gray-200 px-3 rounded"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => remove(item._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="bg-white shadow rounded-xl p-6 mt-8">
            <h2 className="text-2xl font-bold">
              Total: ₹{subtotal}
            </h2>

            <button className="mt-4 bg-green-600 text-white px-6 py-3 rounded-lg">
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;