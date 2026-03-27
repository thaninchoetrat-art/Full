import { Link } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

function Navbar() {
    const { user, logout } = useAuth();
    const isAdmin = user?.role === "admin";
    const isSuperAdmin = user?.role === "superadmin";

    return (
        <nav className="bg-black p-6 flex justify-between items-center shadow-lg">
            <div className="flex items-center">
                <Link to="/" className="text-white text-2xl font-bold hover:text-gray-300 transition">
                    property Hub
                </Link>
            </div>
            
            <div className="flex gap-6 items-center flex-wrap">
                <Link to="/" className="text-white hover:text-gray-300 font-medium">
                    หน้าแรก
                </Link>

                {user ? (
                    <>
                        <span className="text-white font-medium"> {user.username || user.email}</span>
                        <button
                            onClick={logout}
                            className="text-black bg-white px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition"
                        >
                            ออกจากระบบ
                        </button>
                    </>
                ) : (
                    <Link to="/login" className="text-white hover:text-gray-300 font-medium border border-white px-4 py-2 rounded-lg transition">
                        ลงชื่อเข้าใช้
                    </Link>
                )}

                {isSuperAdmin && (
                    <Link 
                        to="/superadmin" 
                        className="bg-red-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-red-700 transition duration-300"
                    >
                        Superadmin Dashboard
                    </Link>
                )}

                {isAdmin && !isSuperAdmin && (
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