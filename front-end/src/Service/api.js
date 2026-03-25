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
// Admin APIs
export const getpropertiesAdmin = () => {
  return api.get("/admin/properties");
};

export const approvedproperty = (id) => {
  return api.put(`/admin/approved/${id}`, { status: 'approved' });
};

export const deletepropertyAdmin = (id) => {
  return api.delete(`/admin/properties/${id}`); 
};

export const getUsersAdmin = () => {
  return api.get(`/admin/users`); 
};

export const deleteUserAdmin = (id) => {
  return api.delete(`/admin/users/${id}`); 
};
export default api;