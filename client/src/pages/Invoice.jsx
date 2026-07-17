import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Invoice() {
  const { orderId } = useParams();

  const [order, setOrder] = useState(null);

  useEffect(() => {
    fetchOrder();
  }, []);

  const fetchOrder = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/orders/invoice/${orderId}`
      );

      setOrder(response.data.order);
    } catch (error) {
      console.error(error);
    }
  };

  if (!order) {
    return (
      <div className="p-8">
        Loading Invoice...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-8">

      <h1 className="text-4xl font-bold text-center mb-8">
        AI Commerce Invoice
      </h1>

      <div className="mb-8">
        <p>
          <strong>Order ID:</strong> {order._id}
        </p>

        <p>
          <strong>Status:</strong> {order.status}
        </p>

        <p>
          <strong>Date:</strong>{" "}
          {new Date(order.createdAt).toLocaleDateString()}
        </p>
      </div>

      <table className="w-full border">

        <thead>

          <tr className="bg-gray-100">

            <th className="p-3 text-left">
              Product
            </th>

            <th className="p-3">
              Qty
            </th>

            <th className="p-3">
              Price
            </th>

            <th className="p-3">
              Total
            </th>

          </tr>

        </thead>

        <tbody>

          {order.items.map((item) => (

            <tr key={item._id} className="border-t">

              <td className="p-3">
                {item.product?.name}
              </td>

              <td className="text-center">
                {item.quantity}
              </td>

              <td className="text-center">
                ₹{item.price}
              </td>

              <td className="text-center">
                ₹{item.price * item.quantity}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

      <h2 className="text-right text-3xl font-bold mt-8">
        Grand Total : ₹{order.totalAmount}
      </h2>

      <button
        onClick={() => window.print()}
        className="mt-8 bg-blue-600 text-white px-6 py-3 rounded-lg"
      >
        Print Invoice
      </button>

    </div>
  );
}

export default Invoice;