import { useState } from 'react'
import {BrowserRouter , Routes ,Route} from "react-router-dom"
import './App.css'
import Home from "./Pages/Home"
import AdminDashboard from "./Pages/AdminDashboard"
import SuperAdminDashboard from "./Pages/SuperAdminDashboard"
import AuthPage from "./Pages/AuthPage"
import { AuthProvider } from "./Context/AuthContext"


function App() {
  return (
    <>
     <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/superadmin" element={<SuperAdminDashboard />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/login" element={<AuthPage />} />
          <Route path="/register" element={<AuthPage />} />
        </Routes>
      </AuthProvider>
     </BrowserRouter>
    </>
  )
}

export default App
