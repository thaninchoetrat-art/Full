# Superadmin API - Quick Start Guide

## 🚀 Quick Setup

### Test Credentials

**Superadmin Account:**
- Email: `superadmin@example.com`
- Password: `superadmin123`
- Token: `superadmintoken123456`
- Role: `superadmin`

**Admin Account (for comparison):**
- Email: `admin@example.com`
- Password: `admin123`
- Token: `sezoio5blpjmn7ixa7o`
- Role: `admin`

---

## ⚙️ Setup Instructions

### Backend Setup
```bash
cd "Project-Final-Q - Copy/Back-end"
npm install
npm start
```
✅ Server will run on http://localhost:5000

### Frontend Setup
```bash
cd "Project-Final-Q - Copy/front-end"
npm install
npm run dev
```
✅ Frontend will run on http://localhost:5173

---

## 🧪 Testing Guide

### Option 1: Web UI (Easy)
1. Open http://localhost:5173
2. Click "ลงชื่อเข้าใช้" (Login)
3. Use superadmin credentials:
   - Email: `superadmin@example.com`
   - Password: `superadmin123`
4. Click "Superadmin Dashboard" in navbar
5. Explore the dashboard:
   - View statistics
   - Manage users
   - Manage admins

### Option 2: API Endpoints (Advanced)

#### Get Statistics
```bash
curl -X GET http://localhost:5000/api/superadmin/statistics \
  -H "Authorization: Bearer superadmintoken123456"
```

#### Get All Users
```bash
curl -X GET http://localhost:5000/api/superadmin/users \
  -H "Authorization: Bearer superadmintoken123456"
```

#### Get All Admins
```bash
curl -X GET http://localhost:5000/api/superadmin/admins \
  -H "Authorization: Bearer superadmintoken123456"
```

#### Promote User to Admin
```bash
curl -X PUT http://localhost:5000/api/superadmin/promote/3 \
  -H "Authorization: Bearer superadmintoken123456"
```

#### Demote Admin to User
```bash
curl -X PUT http://localhost:5000/api/superadmin/demote/1 \
  -H "Authorization: Bearer superadmintoken123456"
```

#### Delete User
```bash
curl -X DELETE http://localhost:5000/api/superadmin/user/3 \
  -H "Authorization: Bearer superadmintoken123456"
```

### Option 3: Swagger UI
1. Open http://localhost:5000/api-docs
2. Scroll to "Superadmin" section
3. Expand any endpoint
4. Click "Try it out"
5. Add token in Authorization header
6. Click "Execute"

---

## ✨ Features Overview

### 📊 Statistics Dashboard
- Total users, admins, superadmins
- Total properties submitted
- Approved/Pending/Rejected properties
- Real-time updates

### 👥 User Management
- View all users with roles
- Promote regular users to admin
- Delete users (except superadmins)

### 🔐 Admin Management
- View all admins and superadmins
- Demote admins to regular users (except superadmins)
- Delete admins (except superadmins)

---

## 📁 New Files Added

### Backend
- ✅ `Back-end/Controllers/superadminController.js` → API logic
- ✅ `Back-end/Routers/superadminRoutes.js` → API routes

### Frontend
- ✅ `front-end/src/Pages/SuperAdminDashboard.jsx` → Dashboard UI
- ✅ `SUPERADMIN_API_DOCUMENTATION.md` → Full documentation

### Updated Files
- ✅ `Back-end/server.js` → Added superadmin routes
- ✅ `Back-end/Middleware/authMiddleware.js` → Added superadmin role support
- ✅ `Back-end/Data/users.json` → Added superadmin user
- ✅ `front-end/src/App.jsx` → Added superadmin route
- ✅ `front-end/src/Components/Navbar.jsx` → Added superadmin link
- ✅ `front-end/src/Service/api.js` → Added superadmin API functions

---

## 🔍 Features Demonstrated

### ✅ Complete CRUD Operations
- Create (promote users to admin)
- Read (get users, admins, statistics)
- Update (promote/demote roles)
- Delete (remove users/admins)

### ✅ Security
- Token-based authentication
- Role-based access control
- Superadmin protected from deletion/demotion

### ✅ User Experience
- Responsive dashboard
- Real-time updates
- Confirmation dialogs
- Success/error messages

---

## 🎯 What You Can Do Now

1. **View System Statistics** - See total users, admins, and properties
2. **Manage All Users** - Promote/delete users
3. **Manage All Admins** - Demote/delete admins
4. **Monitor Platform** - Keep track of all accounts and content
5. **Scale Operations** - Assign admin roles as needed

---

## ⚠️ Important Notes

- Superadmins **cannot be deleted** or **demoted**
- Only superadmins can access the superadmin dashboard
- Token `superadmintoken123456` is for testing only
- Passwords are stored in plain text (update for production)

---

## 📞 Need Help?

Refer to `SUPERADMIN_API_DOCUMENTATION.md` for:
- Detailed API documentation
- Response examples
- Error handling
- Database schema
- Security features

---

**Status:** ✅ Ready to Test
**Created:** March 26, 2026
