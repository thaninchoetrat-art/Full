import axios from "axios";

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

export const getproperties = (params) => api.get("/properties", { params });

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

// User APIs
export const registerUser = (data) => {
  return api.post("/users/register", data);
};

export const loginUser = (data) => {
  return api.post("/users/login", data);
};

export const getMeUser = () => {
  return api.get("/users/me");
};

// Superadmin APIs
export const getAllUsersSuperAdmin = () => {
  return api.get("/superadmin/users");
};

export const getAllAdminsSuperAdmin = () => {
  return api.get("/superadmin/admins");
};

export const getUserBySuperAdmin = (userId) => {
  return api.get(`/superadmin/user/${userId}`);
};

export const getStatisticsSuperAdmin = () => {
  return api.get("/superadmin/statistics");
};

export const promoteToAdminSuperAdmin = (userId) => {
  return api.put(`/superadmin/promote/${userId}`);
};

export const demoteToUserSuperAdmin = (userId) => {
  return api.put(`/superadmin/demote/${userId}`);
};

export const deleteUserSuperAdmin = (userId) => {
  return api.delete(`/superadmin/user/${userId}`);
};

// Search APIs
export const searchUsersSuperAdmin = (query, type = null) => {
  const params = { query };
  if (type) params.type = type;
  return api.get("/superadmin/search/users", { params });
};

export const searchPropertiesSuperAdmin = (query, status = null) => {
  const params = { query };
  if (status) params.status = status;
  return api.get("/superadmin/search/properties", { params });
};

export default api;