import { useState } from "react";

function UpdateOrderModal({
  isOpen,
  onClose,
  order,
  onUpdate,
}) {
  const [status, setStatus] = useState(order?.status);

  if (!isOpen) return null;

  const handleSave = () => {
    onUpdate(order.orderId, status);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

      <div className="bg-white rounded-xl shadow-xl w-[450px] p-6">

        <h2 className="text-2xl font-bold mb-5">
          Update Order Status
        </h2>

        <div className="space-y-4">

          <div>
            <label className="font-semibold">
              Order ID
            </label>

            <p className="text-gray-500 break-all">
              {order.orderId}
            </p>
          </div>

          <div>
            <label className="font-semibold">
              Customer
            </label>

            <p>{order.username}</p>
          </div>

          <div>
            <label className="font-semibold">
              Current Status
            </label>

            <p className="text-blue-600 font-bold">
              {order.status}
            </p>
          </div>

          <div>
            <label className="font-semibold block mb-2">
              New Status
            </label>

            <select
              className="border rounded-lg w-full p-3"
              value={status}
              onChange={(e) =>
                setStatus(e.target.value)
              }
            >
              <option>Pending</option>
              <option>Confirmed</option>
              <option>Shipped</option>
              <option>Delivered</option>
              <option>Cancelled</option>
            </select>
          </div>

        </div>

        <div className="flex justify-end gap-3 mt-8">

          <button
            onClick={onClose}
            className="px-5 py-2 bg-gray-300 rounded-lg"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Update
          </button>

        </div>

      </div>

    </div>
  );
}

export default UpdateOrderModal;