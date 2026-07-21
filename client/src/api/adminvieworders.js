import axios from "axios";

const API = "http://localhost:5000/api/orders";

// Get all orders (Admin)
export const getAllOrders = async (token) => {
  return axios.get(`${API}/admin`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Update order status
export const updateOrderStatus = async (id, status, token) => {
  return axios.put(
    `${API}/admin/${id}/status`,
    { status },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};