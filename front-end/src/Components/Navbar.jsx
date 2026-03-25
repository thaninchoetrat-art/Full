import { Link } from "react-router-dom";

function Navbar() {
    // ตรวจสอบสถานะ Admin โดยเช็คจาก token ใน localStorage 
    // (อ้างอิงจากไฟล์ api.js ที่ใช้ "admin-secret-token" เป็นค่าเริ่มต้น)
    const isAdmin = localStorage.getItem("token") === "admin-secret-token";

    return (
        <nav className="bg-black p-6 flex justify-between items-center shadow-lg">
            <div className="flex items-center">
                <Link to="/" className="text-white text-2xl font-bold hover:text-gray-300 transition">
                    property Hub
                </Link>
            </div>
            
            <div className="flex gap-6 items-center">
                <Link to="/" className="text-white hover:text-gray-300 font-medium">
                    หน้าแรก
                </Link>
                
                {/*Admin เหน เท่านั้น */}
                {isAdmin && (
                    <Link 
                        to="/admin" 
                        className="bg-red-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-red-700 transition duration-300"
                    >
                        ระบบตรวจสอบ (Admin)
                    </Link>
                )}
            </div>
        </nav>
    );
}

export default Navbar;