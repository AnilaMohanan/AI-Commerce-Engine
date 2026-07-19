import axios from "axios";

const API_URL = "http://localhost:5000/api/users";

export const getProfile = async (userId) => {
  const response = await axios.get(`${API_URL}/${userId}`);
  return response.data;
};

export const updateProfile = async (userId, data) => {
  const response = await axios.put(
    `${API_URL}/${userId}`,
    data
  );

  return response.data;
};
