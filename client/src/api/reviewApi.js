import axios from "axios";

const API_URL = "http://localhost:5000/api/reviews";

export const addReview = async (data) => {
  const response = await axios.post(
    `${API_URL}/add`,
    data
  );

  return response.data;
};

export const getReviews = async (productId) => {
  const response = await axios.get(
    `${API_URL}/${productId}`
  );

  return response.data;
};