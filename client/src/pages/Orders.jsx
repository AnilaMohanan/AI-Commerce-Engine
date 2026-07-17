import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getOrders,
  cancelOrder,
} from "../api/orderApi";

function Orders() {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await getOrders(user._id);

      setOrders(response.orders);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = async (orderId) => {
    try {
      const response = await cancelOrder(orderId);

      alert(response.message);

      fetchOrders();
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Unable to cancel order."
      );
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">

      <h1 className="text-4xl font-bold mb-8">
        My Orders
      </h1>

      {orders.length === 0 ? (
        <div className="bg-white rounded-xl shadow p-8">
          No orders found.
        </div>
      ) : (
        <div className="space-y-6">

          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <div className="flex justify-between">

                <div>
                  <h2 className="text-xl font-bold">
                    Order #{order._id.slice(-6)}
                  </h2>

                  <p className="text-gray-500">
                    Status: {order.status}
                  </p>

                  <p className="text-gray-500">
                    Date:{" "}
                    {new Date(
                      order.createdAt
                    ).toLocaleDateString()}
                  </p>
                </div>

                <div className="text-right">
                  <h2 className="text-2xl font-bold text-green-600">
                    ₹{order.totalAmount}
                  </h2>

                  <div className="mt-4 flex gap-3">

  {order.status !== "Cancelled" &&
    order.status !== "Delivered" && (
      <button
        onClick={() => handleCancel(order._id)}
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
      >
        Cancel Order
      </button>
    )}

  <button
    onClick={() => navigate(`/invoice/${order._id}`)}
    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
  >
    🧾 View Invoice
  </button>

</div>
                </div>

              </div>

              <hr className="my-5" />

              {order.items.map((item, index) => (
  <div
    key={index}
    className="flex justify-between py-2"
  >
    <span>
      {item.product?.name || "Product Not Available"}
    </span>

    <span>
      {item.quantity} × ₹{item.price}
    </span>
  </div>
))}
            </div>
          ))}

        </div>
      )}

    </div>
  );
}

export default Orders;