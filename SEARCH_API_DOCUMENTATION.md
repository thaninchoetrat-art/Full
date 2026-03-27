# Superadmin Search API - Documentation

## 🔍 New Search Features

Two powerful search endpoints have been added to the Superadmin API to quickly find users and properties.

---

## 📋 Backend Endpoints

### 1. Search Users
**Endpoint:** `GET /api/superadmin/search/users`

**Description:** Search for users by username, email, or role

**Query Parameters:**
- `query` (required) - Search term
- `type` (optional) - Search scope: `username`, `email`, `role`, or empty for all

**Example Requests:**

```bash
# Search all fields
curl -X GET "http://localhost:5000/api/superadmin/search/users?query=admin" \
  -H "Authorization: Bearer superadmintoken123456"

# Search by username only
curl -X GET "http://localhost:5000/api/superadmin/search/users?query=john&type=username" \
  -H "Authorization: Bearer superadmintoken123456"

# Search by email
curl -X GET "http://localhost:5000/api/superadmin/search/users?query=test@example.com&type=email" \
  -H "Authorization: Bearer superadmintoken123456"

# Search by role
curl -X GET "http://localhost:5000/api/superadmin/search/users?query=admin&type=role" \
  -H "Authorization: Bearer superadmintoken123456"
```

**Response:**
```json
{
  "count": 2,
  "data": [
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
}
```

---

### 2. Search Properties
**Endpoint:** `GET /api/superadmin/search/properties`

**Description:** Search for properties by title, description, or location

**Query Parameters:**
- `query` (required) - Search term (title, description, location)
- `status` (optional) - Filter by status: `approved`, `pending`, `rejected`

**Example Requests:**

```bash
# Search all properties
curl -X GET "http://localhost:5000/api/superadmin/search/properties?query=apartment" \
  -H "Authorization: Bearer superadmintoken123456"

# Search with status filter
curl -X GET "http://localhost:5000/api/superadmin/search/properties?query=apartment&status=approved" \
  -H "Authorization: Bearer superadmintoken123456"

# Search pending properties only
curl -X GET "http://localhost:5000/api/superadmin/search/properties?query=villa&status=pending" \
  -H "Authorization: Bearer superadmintoken123456"
```

**Response:**
```json
{
  "count": 3,
  "data": [
    {
      "id": "prop1",
      "title": "Beautiful Apartment",
      "description": "Modern apartment in city center",
      "location": "Bangkok",
      "status": "approved"
    }
  ]
}
```

---

## 🎨 Frontend Implementation

### Search API Functions
Located in `src/Service/api.js`:

```javascript
// Search users by query term and optional type
export const searchUsersSuperAdmin = (query, type = null) => {
  const params = { query };
  if (type) params.type = type;
  return api.get("/superadmin/search/users", { params });
};

// Search properties by query and optional status
export const searchPropertiesSuperAdmin = (query, status = null) => {
  const params = { query };
  if (status) params.status = status;
  return api.get("/superadmin/search/properties", { params });
};
```

### Using Search in React Components

```javascript
import { searchUsersSuperAdmin } from '../Service/api';

// Search users
const handleSearch = async (searchQuery, searchType) => {
  try {
    const res = await searchUsersSuperAdmin(searchQuery, searchType);
    console.log(`Found ${res.data.count} results:`, res.data.data);
  } catch (error) {
    console.error('Search failed:', error);
  }
};
```

---

## 🖥️ Superadmin Dashboard UI

### Users Tab - Search Bar
The Users tab now includes an enhanced search interface:

1. **Search Input Field**
   - Placeholder: "ป้อนชื่อผู้ใช้ อีเมล หรือบทบาท..."
   - Real-time input capture

2. **Search Type Dropdown**
   - ค้นหาทั้งหมด (Search all fields)
   - ชื่อผู้ใช้งาน (Username)
   - อีเมล (Email)
   - บทบาท (Role)

3. **Action Buttons**
   - Search Button - Executes the search
   - Clear Button - Resets search and returns to full user list

4. **Results Display**
   - Shows count of results found
   - Displays results in table format
   - "ไม่พบผลลัพธ์" message if no matches

### Features
- ✅ Real-time search input
- ✅ Filter by search type
- ✅ Results count display
- ✅ Clear search functionality
- ✅ Error handling with messages
- ✅ Loading state during search

---

## 🧪 Testing in Swagger UI

### 1. Access Swagger UI
```
http://localhost:5000/api-docs
```

### 2. Find Search Endpoints
Look under the **Superadmin** tag:
- `GET /api/superadmin/search/users`
- `GET /api/superadmin/search/properties`

### 3. Test Search Users
1. Click on `GET /api/superadmin/search/users`
2. Click "Try it out"
3. Enter parameters:
   - `query`: "admin"
   - `type`: "username"
4. Click "Execute"
5. View JSON response with results

### 4. Test Search Properties
1. Click on `GET /api/superadmin/search/properties`
2. Click "Try it out"
3. Enter parameters:
   - `query`: "apartment"
   - `status`: "approved"
4. Click "Execute"
5. View filtered results

---

## 📊 Swagger Documentation

Both search endpoints include comprehensive Swagger documentation:

### Search Users
```yaml
tags:
  - Superadmin
description: Search for users using a query string. Can search by specific field or across all fields.
parameters:
  - name: query
    in: query
    required: true
    description: Search term (username, email, or role)
  - name: type
    in: query
    required: false
    description: Search by specific field (username, email, role)
responses:
  200:
    description: Search results retrieved successfully
    schema:
      properties:
        count: integer
        data: array
```

### Search Properties
```yaml
tags:
  - Superadmin
description: Search for properties using a query string. Can optionally filter by status.
parameters:
  - name: query
    in: query
    required: true
    description: Search term (title, description, or location)
  - name: status
    in: query
    required: false
    description: Filter by property status
responses:
  200:
    description: Search results retrieved successfully
```

---

## 🔐 Security

- ✅ Requires Bearer token authentication
- ✅ Superadmin role required
- ✅ Input validation (query must not be empty)
- ✅ Case-insensitive searching
- ✅ XSS protection through API

---

## 📈 Search Features Summary

| Feature | Users Search | Properties Search |
|---------|---------------|--------------------|
| Search by text | ✅ | ✅ |
| Multiple fields | ✅ (username, email, role) | ✅ (title, description, location) |
| Filter options | 3 types | Status filter |
| Case-sensitive | No | No |
| Results count | ✅ | ✅ |
| Empty result handling | ✅ | ✅ |
| Error handling | ✅ | ✅ |

---

## 🧑‍💻 Usage Examples

### Frontend - Search Users
```javascript
// Search by username
const result = await searchUsersSuperAdmin("john", "username");

// Search all fields
const result = await searchUsersSuperAdmin("admin");

// Search by role
const result = await searchUsersSuperAdmin("admin", "role");
```

### Frontend - Search Properties
```javascript
// Search approved apartments
const result = await searchPropertiesSuperAdmin("apartment", "approved");

// Search all properties
const result = await searchPropertiesSuperAdmin("villa");
```

### Backend - Direct API Calls
```bash
# Find all admins
GET /api/superadmin/search/users?query=admin&type=role

# Find pending properties
GET /api/superadmin/search/properties?query=&status=pending

# Search by email
GET /api/superadmin/search/users?query=test@example.com&type=email
```

---

## ❌ Error Handling

### Empty Query
**Response:** 400 Bad Request
```json
{
  "message": "Search query is required"
}
```

### Unauthorized
**Response:** 401 Unauthorized
```json
{
  "message": "Invalid token"
}
```

### Not Superadmin
**Response:** 403 Forbidden
```json
{
  "message": "Superadmin access required"
}
```

### Server Error
**Response:** 500 Internal Server Error
```json
{
  "message": "Server error"
}
```

---

## 📝 Files Modified

### Backend
- ✅ `Back-end/Controllers/superadminController.js` - Added `searchUsers()` and `searchProperties()` functions
- ✅ `Back-end/Routers/superadminRoutes.js` - Added two new routes with Swagger documentation

### Frontend
- ✅ `front-end/src/Service/api.js` - Added `searchUsersSuperAdmin()` and `searchPropertiesSuperAdmin()` functions
- ✅ `front-end/src/Pages/SuperAdminDashboard.jsx` - Added search UI with state management and handlers

---

## 🎯 Next Steps / Enhancements

Consider adding:
1. Advanced search filters (date range, price range)
2. Search history
3. Saved searches
4. Bulk operations on search results
5. Export search results to CSV
6. Search analytics and reports

---

**Status:** ✅ Ready for Testing
**Created:** March 26, 2026
**Last Updated:** March 26, 2026
