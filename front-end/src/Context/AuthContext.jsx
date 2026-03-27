import { createContext, useContext, useState, useEffect } from "react";
import { loginUser, registerUser, getMeUser } from "../Service/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);       // ข้อมูล user ที่ login อยู่
  const [loading, setLoading] = useState(true); // กำลังเช็ค token ตอน load ครั้งแรก

  // ตอนเปิดแอปใหม่ เช็ค token ที่เก็บไว้
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getMeUser()
        .then((res) => setUser(res.data.user))
        .catch(() => localStorage.removeItem("token"))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  // Register
  const register = async (username, email, password) => {
    const res = await registerUser({ username, email, password });
    localStorage.setItem("token", res.data.token);
    setUser(res.data.user);
    return res.data;
  };

  // Login
  const login = async (email, password) => {
    const res = await loginUser({ email, password });
    localStorage.setItem("token", res.data.token);
    setUser(res.data.user);
    return res.data;
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook ใช้งานง่าย
export const useAuth = () => useContext(AuthContext);
