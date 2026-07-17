import axios from "axios";

const API_URL = "http://localhost:5000/api/cart";

export const addToCart = async (data) => {
  const response = await axios.post(`${API_URL}/add`, data);
  return response.data;
};

export const getCart = async (userId) => {
  const response = await axios.get(`${API_URL}/${userId}`);
  return response.data;
};

export const updateCartQuantity = async (cartId, quantity) => {
  const response = await axios.put(`${API_URL}/${cartId}`, {
    quantity,
  });
  return response.data;
};

export const removeCartItem = async (cartId) => {
  const response = await axios.delete(`${API_URL}/${cartId}`);
  return response.data;
};

export const calculateCartTotal = async (items) => {
  const response = await axios.post(`${API_URL}/total`, {
    items,
  });
  return response.data;
};