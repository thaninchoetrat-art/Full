import React, { useEffect, useState } from 'react';
import { getpropertiesAdmin, approvedproperty, deletepropertyAdmin, getUsersAdmin, deleteUserAdmin} from  "../Service/api";
import Navbar from "../Components/Navbar";

const AdminDashboard = () => {
    const [properties, setProperties] = useState([]);
    const [users, setUsers] = useState([]);
    const [tab, setTab] = useState("properties"); // สลับหน้าประกาศกับหน้า user

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        const propRes = await getpropertiesAdmin(); 
        setProperties(propRes.data);
        
        try {
            const userRes = await getUsersAdmin();
            setUsers(userRes.data);
        } catch (e) { console.log("ยังไม่มีข้อมูล User") }
    };

    const handleDeleteProperty = async (id) => {
        if (window.confirm("คุณต้องการลบประกาศนี้อย่างถาวรใช่หรือไม่?")) {
            await deletepropertyAdmin(id);
            loadData();
        }
    };

    const handleDeleteUser = async (id) => {
        if (window.confirm("คุณต้องการลบผู้ใช้งานนี้ใช่หรือไม่?")) {
            await deleteUserAdmin(id);
            loadData();
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            <Navbar />
            <div className="container mx-auto p-10">
                <div className="flex gap-4 mb-8">
                    <button 
                        onClick={() => setTab("properties")}
                        className={`px-6 py-2 rounded-lg font-bold ${tab === "properties" ? 'bg-black text-white' : 'bg-white border'}`}
                    >
                        จัดการประกาศ
                    </button>
                    <button 
                        onClick={() => setTab("users")}
                        className={`px-6 py-2 rounded-lg font-bold ${tab === "users" ? 'bg-black text-white' : 'bg-white border'}`}
                    >
                        จัดการผู้ใช้งาน
                    </button>
                </div>

                {tab === "properties" ? (
                    <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
                        <table className="min-w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="p-4 text-left">หัวข้อ</th>
                                    <th className="p-4 text-left">สถานะ</th>
                                    <th className="p-4 text-center">จัดการ</th>
                                </tr>
                            </thead>
                            <tbody>
                                {properties.map(item => (
                                    <tr key={item._id || item.id} className="border-t">
                                        <td className="p-4">{item.title}</td>
                                        <td className="p-4">
                                            <span className={`px-2 py-1 rounded text-xs ${item.status === 'approved' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                                {item.status}
                                            </span>
                                        </td>
                                        <td className="p-4 flex justify-center gap-2">
                                            {(item.status === "pending" || item.status === "pedding") && (
                                                <button onClick={() => approvedproperty(item.id).then(loadData)} className="bg-green-500 text-white px-3 py-1 rounded">approved</button>
                                            )}
                                            <button onClick={() => handleDeleteProperty(item.id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">ลบ</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
                        <table className="min-w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="p-4 text-left">ชื่อผู้ใช้ / อีเมล</th>
                                    <th className="p-4 text-center">จัดการ</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.length > 0 ? users.map(user => (
                                    <tr key={user._id || user.id} className="border-t">
                                        <td className="p-4">{user.username || user.email}</td>
                                        <td className="p-4 text-center">
                                            <button onClick={() => handleDeleteUser(user.id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">ลบผู้ใช้งาน</button>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr><td colSpan="2" className="p-10 text-center text-gray-400">ยังไม่มีรายชื่อผู้ใช้งาน</td></tr>
                                )}
                            </tbody>
                            
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
//localStorage.setItem("token", "admin-secret-token");