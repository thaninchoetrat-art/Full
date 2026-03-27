# Superadmin API Documentation

## Overview
A comprehensive superadmin API system has been added to both backend and frontend, allowing superadmins to manage users, admins, and view system statistics.

## Features Added

### Backend (Node.js/Express)

#### 1. New Controller: `superadminController.js`
Located at: `Back-end/Controllers/superadminController.js`

**Functions:**
- `getAllUsers()` - Get all users with their roles
- `getAllAdmins()` - Get all admins and superadmins
- `getUserById()` - Get user details by ID
- `promoteToAdmin()` - Promote a user to admin
- `demoteToUser()` - Demote an admin back to user
- `deleteUserSuperAdmin()` - Delete a user
- `getStatistics()` - Get system statistics

#### 2. New Router: `superadminRoutes.js`
Located at: `Back-end/Routers/superadminRoutes.js`

**Endpoints:**
- `GET /api/superadmin/users` - Get all users
- `GET /api/superadmin/admins` - Get all admins
- `GET /api/superadmin/user/:userId` - Get user details
- `GET /api/superadmin/statistics` - Get statistics
- `PUT /api/superadmin/promote/:userId` - Promote to admin
- `PUT /api/superadmin/demote/:userId` - Demote to user
- `DELETE /api/superadmin/user/:userId` - Delete user

#### 3. Updated Files
- **server.js** - Added superadmin router
- **authMiddleware.js** - Updated to allow superadmin access to admin endpoints

#### 4. New Test User
A superadmin user has been added to `Data/users.json`:
```json
{
  "id": "2",
  "username": "superadmin",
  "email": "superadmin@example.com",
  "password": "superadmin123",
  "role": "superadmin",
  "token": "superadmintoken123456"
}
```

### Frontend (React)

#### 1. New API Functions in `src/Service/api.js`
- `getAllUsersSuperAdmin()` - Fetch all users
- `getAllAdminsSuperAdmin()` - Fetch all admins
- `getUserBySuperAdmin(userId)` - Fetch specific user
- `getStatisticsSuperAdmin()` - Fetch system statistics
- `promoteToAdminSuperAdmin(userId)` - Promote user to admin
- `demoteToUserSuperAdmin(userId)` - Demote admin to user
- `deleteUserSuperAdmin(userId)` - Delete user

#### 2. New Page: `src/Pages/SuperAdminDashboard.jsx`
A complete dashboard with:
- **Statistics Tab**: Display system statistics (total users, admins, properties, etc.)
- **Users Tab**: Manage all users with promote/delete actions
- **Admins Tab**: Manage all admins with demote/delete actions
- Real-time data loading and error handling
- Success/error messages

#### 3. Updated Files
- **App.jsx** - Added route for superadmin dashboard at `/superadmin`
- **Navbar.jsx** - Added superadmin dashboard link (visible only to superadmins)

## How to Use

### Backend Testing
1. Start the backend server:
```bash
cd Back-end
npm install
npm start
```

2. Use the superadmin token in headers:
```
Authorization: Bearer superadmintoken123456
```

3. Test endpoints with Swagger UI at:
```
http://localhost:5000/api-docs
```

### Frontend Testing
1. Start the frontend:
```bash
cd front-end
npm install
npm run dev
```

2. Login with superadmin credentials:
   - Email: `superadmin@example.com`
   - Password: `superadmin123`

3. Access the dashboard at:
   ```
   http://localhost:5173/superadmin
   ```

## API Response Examples

### Get Statistics
**Request:**
```
GET /api/superadmin/statistics
Authorization: Bearer superadmintoken123456
```

**Response:**
```json
{
  "totalUsers": 5,
  "totalAdmins": 2,
  "totalSuperAdmins": 1,
  "totalProperties": 10,
  "approvedProperties": 7,
  "pendingProperties": 2,
  "rejectedProperties": 1
}
```

### Get All Users
**Request:**
```
GET /api/superadmin/users
Authorization: Bearer superadmintoken123456
```

**Response:**
```json
[
  {
    "id": "1",
    "username": "admin",
    "email": "admin@example.com",
    "role": "admin",
    "token": "sezoio5blpjmn7ixa7o"
  },
  {
    "id": "2",
    "username": "superadmin",
    "email": "superadmin@example.com",
    "role": "superadmin",
    "token": "superadmintoken123456"
  }
]
```

### Promote User to Admin
**Request:**
```
PUT /api/superadmin/promote/3
Authorization: Bearer superadmintoken123456
```

**Response:**
```json
{
  "message": "User promoted to admin successfully",
  "user": {
    "id": "3",
    "username": "john",
    "email": "john@example.com",
    "role": "admin"
  }
}
```

## Security Features

1. **Token-based Authentication** - All endpoints require valid token
2. **Role-based Access Control** - Only superadmins can access superadmin endpoints
3. **Protection** - Superadmins cannot be demoted or deleted by other superadmins
4. **Validation** - Input validation on all endpoints

## File Structure

```
Back-end/
├── Controllers/
│   └── superadminController.js (NEW)
├── Routers/
│   └── superadminRoutes.js (NEW)
├── Middleware/
│   └── authMiddleware.js (UPDATED)
├── Data/
│   └── users.json (UPDATED)
└── server.js (UPDATED)

front-end/
├── src/
│   ├── Pages/
│   │   └── SuperAdminDashboard.jsx (NEW)
│   ├── Service/
│   │   └── api.js (UPDATED)
│   ├── Components/
│   │   └── Navbar.jsx (UPDATED)
│   └── App.jsx (UPDATED)
```

## Next Steps / Enhancements

Consider adding:
1. Audit logs for superadmin actions
2. Role upgrade: User → Admin → Superadmin
3. Superadmin settings and preferences
4. User activity tracking
5. Email notifications for role changes
6. Permission-based system for fine-grained control

---
**Created Date:** March 26, 2026
**Status:** Ready for Testing
