import axios from "axios";

const API_URL = "http://localhost:5000/api/orders";

export const checkout = async (userId) => {
  const response = await axios.post(`${API_URL}/checkout`, {
    userId,
  });

  return response.data;
};

export const getOrders = async (userId) => {
  const response = await axios.get(`${API_URL}/${userId}`);
  return response.data;
};

export const cancelOrder = async (orderId) => {
  const response = await axios.patch(
    `${API_URL}/${orderId}/cancel`
  );

  return response.data;
};