import axios from "axios";

const API = "http://localhost:5000/api/dashboard";

export const getDashboardStats = async () => {
  const response = await axios.get(`${API}/stats`);
  return response.data;
};