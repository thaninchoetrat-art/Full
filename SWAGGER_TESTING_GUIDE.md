# Superadmin API - Swagger Testing Guide

## 🚀 How to Access Swagger UI

1. Start the backend server:
```bash
cd Back-end
npm start
```

2. Open Swagger UI in your browser:
```
http://localhost:5000/api-docs
```

---

## 🔍 Finding Superadmin Endpoints

In the Swagger UI, you'll see the following tags (categories) on the left side:
- **Users** - User registration and login
- **Properties** - Property management
- **Admin** - Admin controls
- **Superadmin** ✨ NEW - Click this to expand and see all superadmin endpoints

---

## 🔐 Authentication Setup

Before testing any superadmin endpoint:

1. **Get the Superadmin Token**
   - Login using the superadmin credentials:
     - Email: `superadmin@example.com`
     - Password: `superadmin123`
   - Save the token returned
   - Default token: `superadmintoken123456`

2. **Authorize in Swagger**
   - Click the **"Authorize"** button (top right of Swagger UI)
   - Paste your token in the format: `Bearer superadmintoken123456`
   - Click "Authorize"
   - You're now authenticated for all protected endpoints

---

## 📋 Available Superadmin Endpoints

### 1. **Get All Users**
**Endpoint:** `GET /api/superadmin/users`

**What it does:** Retrieve all users in the system with their roles

**Try it out:**
1. Click on the endpoint
2. Click "Try it out"
3. Click "Execute"
4. View the response containing all users

**Expected Response:**
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

---

### 2. **Get All Admins**
**Endpoint:** `GET /api/superadmin/admins`

**What it does:** Retrieve only admin and superadmin users

**Try it out:**
1. Click on the endpoint
2. Click "Try it out"
3. Click "Execute"
4. View the response

**Expected Response:**
```json
[
  {
    "id": "1",
    "username": "admin",
    "email": "admin@example.com",
    "role": "admin"
  },
  {
    "id": "2",
    "username": "superadmin",
    "email": "superadmin@example.com",
    "role": "superadmin"
  }
]
```

---

### 3. **Get User By ID**
**Endpoint:** `GET /api/superadmin/user/{userId}`

**What it does:** Get details about a specific user

**Try it out:**
1. Click on the endpoint
2. Click "Try it out"
3. Enter a user ID in the `userId` field (e.g., "1")
4. Click "Execute"
5. View the user details

**Example:**
- Parameter: `userId = 1`
- Response: User details for ID 1

---

### 4. **Get Statistics**
**Endpoint:** `GET /api/superadmin/statistics`

**What it does:** Get comprehensive system statistics

**Try it out:**
1. Click on the endpoint
2. Click "Try it out"
3. Click "Execute"
4. View detailed statistics

**Expected Response:**
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

---

### 5. **Promote User to Admin**
**Endpoint:** `PUT /api/superadmin/promote/{userId}`

**What it does:** Upgrade a regular user to admin role

**Try it out:**
1. Click on the endpoint
2. Click "Try it out"
3. Enter a user ID to promote (e.g., "3")
4. Click "Execute"
5. Confirm the user role changed to admin

**Example:**
- Parameter: `userId = 3`
- Response: User details with new role "admin"

⚠️ **Note:** You need another user account to test this. Create one by registering first.

---

### 6. **Demote Admin to User**
**Endpoint:** `PUT /api/superadmin/demote/{userId}`

**What it does:** Downgrade an admin to regular user role

**Try it out:**
1. Click on the endpoint
2. Click "Try it out"
3. Enter an admin ID to demote (e.g., "1")
4. Click "Execute"
5. Confirm the user role changed to user

**ProtectION:** Cannot demote superadmins - will return error 403

---

### 7. **Delete User**
**Endpoint:** `DELETE /api/superadmin/user/{userId}`

**What it does:** Permanently delete a user from the system

**Try it out:**
1. Click on the endpoint
2. Click "Try it out"
3. Enter a user ID to delete (e.g., "3")
4. Click "Execute"
5. Confirm deletion with response message

**PROTECTION:** Cannot delete superadmins - will return error 403

**⚠️ WARNING:** This is permanent and cannot be undone!

---

## 🧪 Complete Testing Workflow

### Step 1: Create Test Users
1. Go to **Users** section
2. Use `POST /api/users/register` to create test accounts:
   ```json
   {
     "username": "testuser1",
     "email": "test1@example.com",
     "password": "password123"
   }
   ```

### Step 2: Test View Operations (Read)
1. Use `GET /api/superadmin/users` - View all users
2. Use `GET /api/superadmin/statistics` - View system stats
3. Use `GET /api/superadmin/user/{userId}` - View specific user

### Step 3: Test Modify Operations (Update)
1. Use `PUT /api/superadmin/promote/{userId}` - Make user an admin
2. Use `PUT /api/superadmin/demote/{userId}` - Downgrade admin

### Step 4: Test Delete Operations
1. Use `DELETE /api/superadmin/user/{userId}` - Delete test users

---

## 📊 Testing Statistics Endpoint

**Scenario:** Monitor system changes

1. Get initial statistics:
   ```
   GET /api/superadmin/statistics
   ```
   Note the numbers

2. Create a new property, or promote users

3. Get statistics again:
   ```
   GET /api/superadmin/statistics
   ```
   Compare the changes

---

## ✅ Error Handling Examples

### Example 1: Invalid Token
**Request:** Without authorization or invalid token
**Response:** 
```json
{
  "message": "Invalid token"
}
Status: 401
```

### Example 2: Non-Superadmin User
**Request:** Admin trying to access superadmin endpoints
**Response:**
```json
{
  "message": "Superadmin access required"
}
Status: 403
```

### Example 3: User Not Found
**Request:** `GET /api/superadmin/user/999`
**Response:**
```json
{
  "message": "User not found"
}
Status: 404
```

### Example 4: Cannot Delete Superadmin
**Request:** `DELETE /api/superadmin/user/2` (trying to delete superadmin)
**Response:**
```json
{
  "message": "Cannot delete superadmin"
}
Status: 403
```

---

## 🎯 Quick Testing Checklist

- [ ] Can access Swagger UI at http://localhost:5000/api-docs
- [ ] Can authorize with superadmin token
- [ ] Can fetch all users
- [ ] Can fetch all admins
- [ ] Can get user details by ID
- [ ] Can view statistics
- [ ] Can promote user to admin
- [ ] Can demote admin to user
- [ ] Can delete a test user
- [ ] Cannot delete superadmin (403 error)
- [ ] Cannot demote superadmin (403 error)
- [ ] Unauthorized access returns 401
- [ ] Non-superadmin access returns 403

---

## 💡 Pro Tips

1. **Copy Response as cURL:** Swagger has a "Copy as cURL" option for testing in terminal
2. **Download OpenAPI Spec:** Available as `openapi.json` from Swagger UI
3. **Try Functionality Buttons:** Each endpoint has "Try it out" button for easy testing
4. **Authorization Persists:** Once authorized, all following requests include the token
5. **Response Codes:** Color-coded (200 = green/success, 400+ = red/error)

---

## 📝 Testing Notes

**Date:** March 26, 2026
**Status:** ✅ Ready for testing
**Superadmin Account:** 
- Email: superadmin@example.com
- Password: superadmin123
- Token: superadmintoken123456
