import { useEffect, useState } from "react";
import {
  getAllOrders,
  updateOrderStatus,
} from "../api/adminViewOrders";

import UpdateOrderModal from "../components/UpdateOrderModal";

function AdminViewOrders() {

  const [orders, setOrders] = useState([]);

  const [search, setSearch] = useState("");

  const [selectedOrder, setSelectedOrder] =
    useState(null);

  const [openModal, setOpenModal] =
    useState(false);

  const token = localStorage.getItem("token");

  const loadOrders = async () => {
    try {
      const res = await getAllOrders(token);

      setOrders(res.data.orders);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleUpdate = async (
    orderId,
    status
  ) => {

    try {

      await updateOrderStatus(
        orderId,
        status,
        token
      );

      alert("Status Updated Successfully");

      setOpenModal(false);

      loadOrders();

    } catch (error) {

      console.log(error);

    }
  };

  const filteredOrders = orders.filter((order) =>
    order.username
      ?.toLowerCase()
      .includes(search.toLowerCase())
  );

  const badgeColor = (status) => {

    switch (status) {

      case "Pending":
        return "bg-yellow-100 text-yellow-700";

      case "Confirmed":
        return "bg-blue-100 text-blue-700";

      case "Shipped":
        return "bg-purple-100 text-purple-700";

      case "Delivered":
        return "bg-green-100 text-green-700";

      case "Cancelled":
        return "bg-red-100 text-red-700";

      default:
        return "";
    }

  };

  return (
    <div className="p-8">

      <div className="flex justify-between mb-6">

        <h1 className="text-3xl font-bold">

          📦 Order Management

        </h1>

        <input
          placeholder="Search Customer..."
          className="border rounded-lg p-3 w-72"
          value={search}
          onChange={(e)=>
            setSearch(e.target.value)
          }
        />

      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="p-4 text-left">
                Order ID
              </th>

              <th>Customer</th>

              <th>Products</th>

              <th>Total</th>

              <th>Status</th>

              <th>Action</th>

            </tr>

          </thead>

          <tbody>

            {filteredOrders.map((order)=>(
              <tr
                key={order.orderId}
                className="border-t hover:bg-gray-50"
              >

                <td className="p-4">
                  {order.orderId}
                </td>

                <td>{order.username}</td>

                <td>

                  {order.products.map((p,index)=>(

                    <div key={index}>

                      {p.productName}

                      <span className="text-gray-500">

                        ({p.quantity})

                      </span>

                    </div>

                  ))}

                </td>

                <td>

                  ₹{order.totalPrice}

                </td>

                <td>

                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${badgeColor(order.status)}`}
                  >

                    {order.status}

                  </span>

                </td>

                <td>

                  <button

                    onClick={()=>{
                      setSelectedOrder(order);
                      setOpenModal(true);
                    }}

                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"

                  >

                    Update Status

                  </button>

                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

      <UpdateOrderModal

        isOpen={openModal}

        order={selectedOrder}

        onClose={()=>
          setOpenModal(false)
        }

        onUpdate={handleUpdate}

      />

    </div>
  );
}

export default AdminViewOrders;