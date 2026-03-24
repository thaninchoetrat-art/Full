import axios from "axios";
import.meta.env.VITE_API_URL


  
const baseURL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const api = axios.create({
  baseURL: baseURL + "/api", 
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getproperties = () => api.get("/properties");

export const getpropertyById = (id) => {
  return api.get(`/properties/${id}`);
};

export const createproperty = (data) =>
  api.post("/properties", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const deleteproperty = (id) => {
  return api.delete(`/properties/${id}`);
};

export default api;