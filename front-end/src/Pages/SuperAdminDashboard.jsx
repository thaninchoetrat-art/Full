import React, { useEffect, useState } from 'react';
import {
  getAllUsersSuperAdmin,
  getAllAdminsSuperAdmin,
  getUserBySuperAdmin,
  getStatisticsSuperAdmin,
  promoteToAdminSuperAdmin,
  demoteToUserSuperAdmin,
  deleteUserSuperAdmin,
} from '../Service/api';
import Navbar from '../Components/Navbar';

const SuperAdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [statistics, setStatistics] = useState(null);
  const [tab, setTab] = useState('statistics');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      // Load statistics
      const statsRes = await getStatisticsSuperAdmin();
      setStatistics(statsRes.data);

      // Load users
      const usersRes = await getAllUsersSuperAdmin();
      setUsers(usersRes.data);

      // Load admins
      const adminsRes = await getAllAdminsSuperAdmin();
      setAdmins(adminsRes.data);

      setLoading(false);
    } catch (err) {
      console.error('Error loading data:', err);
      setLoading(false);
      showMessage('เกิดข้อผิดพลาดในการโหลดข้อมูล', 'error');
    }
  };

  const showMessage = (msg, type) => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => setMessage(''), 3000);
  };

  const handlePromoteToAdmin = async (userId) => {
    if (window.confirm('คุณต้องการให้ผู้ใช้งานคนนี้เป็นแอดมินใช่หรือไม่?')) {
      try {
        await promoteToAdminSuperAdmin(userId);
        showMessage('อัพเกรดเป็นแอดมินสำเร็จ', 'success');
        loadData();
      } catch (err) {
        showMessage('การอัพเกรดล้มเหลว', 'error');
      }
    }
  };

  const handleDemoteToUser = async (userId) => {
    if (window.confirm('คุณต้องการให้แอดมินคนนี้เป็นผู้ใช้งานทั่วไปใช่หรือไม่?')) {
      try {
        await demoteToUserSuperAdmin(userId);
        showMessage('ดาวน์เกรดเป็นผู้ใช้งานสำเร็จ', 'success');
        loadData();
      } catch (err) {
        showMessage('การดาวน์เกรดล้มเหลว', 'error');
      }
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('คุณต้องการลบผู้ใช้งานนี้อย่างถาวรใช่หรือไม่?')) {
      try {
        await deleteUserSuperAdmin(userId);
        showMessage('ลบผู้ใช้งานสำเร็จ', 'success');
        loadData();
      } catch (err) {
        showMessage('การลบล้มเหลว', 'error');
      }
    }
  };

  const StatisticsCard = ({ label, value, color }) => (
    <div className={`${color} rounded-lg p-6 text-white shadow-lg`}>
      <p className="text-sm font-semibold opacity-80">{label}</p>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="container mx-auto p-10">
        <h1 className="text-3xl font-bold mb-8">Superadmin Dashboard</h1>

        {/* Message Alert */}
        {message && (
          <div
            className={`mb-6 p-4 rounded-lg ${
              messageType === 'success'
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
            }`}
          >
            {message}
          </div>
        )}

        {/* Tab Navigation */}
        <div className="flex gap-4 mb-8 flex-wrap">
          <button
            onClick={() => setTab('statistics')}
            className={`px-6 py-2 rounded-lg font-bold transition ${
              tab === 'statistics'
                ? 'bg-blue-600 text-white'
                : 'bg-white border border-gray-300 hover:bg-gray-100'
            }`}
          >
            สถิติ
          </button>
          <button
            onClick={() => setTab('users')}
            className={`px-6 py-2 rounded-lg font-bold transition ${
              tab === 'users'
                ? 'bg-blue-600 text-white'
                : 'bg-white border border-gray-300 hover:bg-gray-100'
            }`}
          >
            จัดการผู้ใช้งาน
          </button>
          <button
            onClick={() => setTab('admins')}
            className={`px-6 py-2 rounded-lg font-bold transition ${
              tab === 'admins'
                ? 'bg-blue-600 text-white'
                : 'bg-white border border-gray-300 hover:bg-gray-100'
            }`}
          >
            จัดการแอดมิน
          </button>
        </div>

        {loading ? (
          <div className="text-center py-10">
            <p className="text-gray-500">กำลังโหลดข้อมูล...</p>
          </div>
        ) : (
          <>
            {/* Statistics Tab */}
            {tab === 'statistics' && statistics && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatisticsCard
                  label="จำนวนผู้ใช้งานทั้งหมด"
                  value={statistics.totalUsers}
                  color="bg-blue-500"
                />
                <StatisticsCard
                  label="จำนวนแอดมิน"
                  value={statistics.totalAdmins}
                  color="bg-purple-500"
                />
                <StatisticsCard
                  label="จำนวน Superadmin"
                  value={statistics.totalSuperAdmins}
                  color="bg-red-500"
                />
                <StatisticsCard
                  label="จำนวนประกาศทั้งหมด"
                  value={statistics.totalProperties}
                  color="bg-green-500"
                />
                <StatisticsCard
                  label="ประกาศอนุมัติ"
                  value={statistics.approvedProperties}
                  color="bg-green-600"
                />
                <StatisticsCard
                  label="ประกาศรอดำเนินการ"
                  value={statistics.pendingProperties}
                  color="bg-yellow-500"
                />
                <StatisticsCard
                  label="ประกาศถูกปฏิเสธ"
                  value={statistics.rejectedProperties}
                  color="bg-red-600"
                />
              </div>
            )}

            {/* Users Tab */}
            {tab === 'users' && (
              <div className="bg-white rounded-lg shadow-lg overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="p-4 text-left">ชื่อ</th>
                      <th className="p-4 text-left">อีเมล</th>
                      <th className="p-4 text-left">บทบาท</th>
                      <th className="p-4 text-left">การกระทำ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id} className="border-b hover:bg-gray-50">
                        <td className="p-4">{user.username}</td>
                        <td className="p-4">{user.email}</td>
                        <td className="p-4">
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-semibold ${
                              user.role === 'admin'
                                ? 'bg-blue-100 text-blue-800'
                                : user.role === 'superadmin'
                                ? 'bg-red-100 text-red-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            {user.role || 'user'}
                          </span>
                        </td>
                        <td className="p-4 flex gap-2">
                          {user.role !== 'admin' && user.role !== 'superadmin' && (
                            <button
                              onClick={() => handlePromoteToAdmin(user.id)}
                              className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition text-sm"
                            >
                              ขึ้นแรงค์
                            </button>
                          )}
                          {user.role !== 'superadmin' && (
                            <button
                              onClick={() => handleDeleteUser(user.id)}
                              className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition text-sm"
                            >
                              ลบ
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Admins Tab */}
            {tab === 'admins' && (
              <div className="bg-white rounded-lg shadow-lg overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="p-4 text-left">ชื่อ</th>
                      <th className="p-4 text-left">อีเมล</th>
                      <th className="p-4 text-left">บทบาท</th>
                      <th className="p-4 text-left">การกระทำ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {admins.map((admin) => (
                      <tr key={admin.id} className="border-b hover:bg-gray-50">
                        <td className="p-4">{admin.username}</td>
                        <td className="p-4">{admin.email}</td>
                        <td className="p-4">
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-semibold ${
                              admin.role === 'superadmin'
                                ? 'bg-red-100 text-red-800'
                                : 'bg-blue-100 text-blue-800'
                            }`}
                          >
                            {admin.role}
                          </span>
                        </td>
                        <td className="p-4 flex gap-2">
                          {admin.role !== 'superadmin' && (
                            <>
                              <button
                                onClick={() => handleDemoteToUser(admin.id)}
                                className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition text-sm"
                              >
                                ลดแรงค์
                              </button>
                              <button
                                onClick={() => handleDeleteUser(admin.id)}
                                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition text-sm"
                              >
                                ลบ
                              </button>
                            </>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
