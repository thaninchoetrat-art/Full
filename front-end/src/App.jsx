import { useState } from 'react'
import {BrowserRouter , Routes ,Route} from "react-router-dom"
import './App.css'
import Home from "./Pages/Home"
import AdminDashboard from "./Pages/AdminDashboard"

function App() {
const [count, setCount] = useState(0)

  return (
    <>
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
