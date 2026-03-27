# SearchBar API - Documentation

## 🔍 SearchBar Overview

The SearchBar component provides a powerful property search interface with multiple filtering options. Users can search properties by keyword, property type, price range, and number of bedrooms.

---

## 🌐 Frontend Component

### Location
`front-end/src/Components/SearchBar.jsx`

### Component Props
```javascript
<SearchBar 
  onSearch={(params) => {}} // Callback when search is performed
  loading={false}            // Loading state indicator
/>
```

### Search Parameters
The SearchBar supports the following filter parameters:

| Parameter | Type | Description |
|-----------|------|-------------|
| `q` | string | Search query (property name, location, description) |
| `type` | string | Property type: `all`, `Condominium`, `House`, `Townhouse`, `Land` |
| `minPrice` | number | Minimum price in Baht (฿) |
| `maxPrice` | number | Maximum price in Baht (฿) |
| `bedrooms` | number | Number of bedrooms |

---

## 📋 Backend Search Endpoint

### 1. Search Properties
**Endpoint:** `GET /api/properties`

**Description:** Search and filter properties based on multiple criteria

**Query Parameters:**
```
q           - (optional) Search term for title, description, location
type        - (optional) Property type filter
minPrice    - (optional) Minimum price range
maxPrice    - (optional) Maximum price range
bedrooms    - (optional) Number of bedrooms
```

**Example Requests:**

```bash
# Basic search by keyword
curl -X GET "http://localhost:5000/api/properties?q=apartment" \
  -H "Authorization: Bearer YOUR_TOKEN"

# Search with property type
curl -X GET "http://localhost:5000/api/properties?type=Condominium" \
  -H "Authorization: Bearer YOUR_TOKEN"

# Search with price range filter
curl -X GET "http://localhost:5000/api/properties?minPrice=500000&maxPrice=2000000" \
  -H "Authorization: Bearer YOUR_TOKEN"

# Search with multiple filters
curl -X GET "http://localhost:5000/api/properties?q=apartment&type=Condominium&minPrice=1000000&maxPrice=5000000&bedrooms=2" \
  -H "Authorization: Bearer YOUR_TOKEN"

# Search by bedrooms only
curl -X GET "http://localhost:5000/api/properties?bedrooms=3" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**Response Schema:**
```json
[
  {
    "id": "prop001",
    "title": "Modern Condo Near BTS",
    "description": "Spacious 2-bedroom condo with modern amenities",
    "location": "Silom, Bangkok",
    "type": "Condominium",
    "price": 3500000,
    "bedrooms": 2,
    "bathrooms": 2,
    "area": 120,
    "images": ["image1.jpg", "image2.jpg"],
    "status": "approved",
    "createdAt": "2024-01-15T10:30:00Z"
  },
  {
    "id": "prop002",
    "title": "House with Garden",
    "description": "3-bedroom house with private garden",
    "location": "Ratchaphruek, Bangkok",
    "type": "House",
    "price": 4200000,
    "bedrooms": 3,
    "bathrooms": 2,
    "area": 180,
    "images": ["image3.jpg"],
    "status": "approved",
    "createdAt": "2024-01-10T14:20:00Z"
  }
]
```

**HTTP Status Codes:**
- `200 OK` - Search completed successfully
- `400 Bad Request` - Invalid query parameters
- `500 Internal Server Error` - Server error

---

## 🎨 Frontend Implementation

### SearchBar Component Features

#### 1. **Search Input**
- Text input field with icon 🔍
- Placeholder: "ค้นหาโครงการ, ทำเล, คำอธิบาย..." (Search project, location, description...)
- Real-time state management

#### 2. **Filter Toggle Button**
- Filter button (⚙️) to show/hide advanced filters
- Badge indicator showing active filters count

#### 3. **Advanced Filters Panel**
When filter button is clicked, displays:

```
┌─────────────────────────────────────────────────┐
│ ประเภท              │ ราคาต่ำสุด  │ ราคาสูงสุด │ ห้องนอน
│ [Dropdown]         │ [Input]    │ [Input]   │ [Input]
└─────────────────────────────────────────────────┘
```

**Property Types (ประเภท):**
- ทุกประเภท (All)
- คอนโด (Condominium)
- บ้าน (House)
- ทาวน์เฮ้าส์ (Townhouse)
- ที่ดิน (Land)

#### 4. **Search Actions**
- **Search Button**: Triggers search with current parameters
- **Reset Button**: Clears all filters and search terms

---

## 🔄 Search Flow Diagram

```
User Input
    ↓
SearchBar Component
    ├─ Query (q)
    ├─ Property Type (type)
    ├─ Min Price (minPrice)
    ├─ Max Price (maxPrice)
    └─ Bedrooms (bedrooms)
    ↓
handleSearch() / handleReset()
    ↓
onSearch callback (parent component)
    ↓
API Request: GET /api/properties
    ↓
Backend Processing
    ↓
Response: Array of matching properties
    ↓
Parent Component (PropertyList)
    ├─ Update display with results
    └─ Show loading state
```

---

## 💻 Usage Example

### In Parent Component (Home.jsx / Dashboard)

```javascript
import SearchBar from '../Components/SearchBar';
import PropertyList from '../Components/PropertyList';
import { useState } from 'react';

export default function Home() {
  const [searchParams, setSearchParams] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSearch = async (params) => {
    setLoading(true);
    try {
      // Call API with search params
      const response = await getproperties(params);
      setSearchParams(params);
      // Pass results to PropertyList
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} loading={loading} />
      <PropertyList params={searchParams} />
    </div>
  );
}
```

---

## ⚙️ API Integration Details

### API Endpoint Code
Located in `front-end/src/Service/api.js`:

```javascript
export const getproperties = (params) => api.get("/properties", { params });
```

### Request Interceptor
Automatically includes Bearer token:
```javascript
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

### Making a Search Request

```javascript
import { getproperties } from '../Service/api';

// Search with filters
const results = await getproperties({
  q: 'apartment',
  type: 'Condominium',
  minPrice: 1000000,
  maxPrice: 5000000,
  bedrooms: 2
});

console.log(results.data); // Array of matching properties
```

---

## 🔐 Authentication

All SearchBar API requests require authentication:

1. **Get Token**: Login with user credentials
   ```javascript
   const response = await loginUser({
     email: 'user@example.com',
     password: 'password123'
   });
   const token = response.data.token;
   ```

2. **Store Token**: Automatically stored in localStorage
   ```javascript
   localStorage.setItem('token', token);
   ```

3. **Auto Authorization**: Token is automatically added to all requests

---

## 📊 Swagger UI Testing

### Access Swagger
```
http://localhost:5000/api-docs
```

### Test SearchBar Endpoints

#### Step 1: Authorize
1. Click "Authorize" button (top right)
2. Enter: `Bearer YOUR_AUTH_TOKEN`
3. Click "Authorize"

#### Step 2: Test Property Search
1. Find the **Properties** section in Swagger
2. Look for `GET /properties` endpoint
3. Click "Try it out"
4. Add query parameters:
   ```
   q: apartment
   type: Condominium
   minPrice: 1000000
   maxPrice: 5000000
   bedrooms: 2
   ```
5. Click "Execute"
6. View the response

### Test Cases

**Test Case 1: Search All Properties**
```
No parameters - Returns all approved properties
```

**Test Case 2: Keyword Search**
```
Parameter: q=apartment
Returns all properties matching "apartment"
```

**Test Case 3: Property Type Filter**
```
Parameter: type=House
Returns only house properties
```

**Test Case 4: Price Range Filter**
```
Parameters: 
  minPrice=1000000
  maxPrice=5000000
Returns properties within price range
```

**Test Case 5: Combined Filters**
```
Parameters:
  q=modern
  type=Condominium
  minPrice=2000000
  maxPrice=4000000
  bedrooms=2
Returns filtered results matching all criteria
```

---

## 🎯 Filter Logic

### Filter Combination Rules
- All filters are **AND** logic (all must match)
- Empty filters are treated as "no filter" (not applied)
- `type: "all"` is treated as no type filter

### Example Logic
```javascript
const params = {};
if (q.trim()) params.q = q.trim();              // Only if not empty
if (type !== "all") params.type = type;          // Only if not "all"
if (minPrice) params.minPrice = minPrice;        // Only if provided
if (maxPrice) params.maxPrice = maxPrice;        // Only if provided
if (bedrooms) params.bedrooms = bedrooms;        // Only if provided
```

---

## ⚡ Performance Tips

1. **Debounce Search**: For auto-search on input change, use debouncing to reduce API calls
2. **Cache Results**: Store search results to avoid redundant requests
3. **Pagination**: For large result sets, implement pagination
4. **Loading State**: Show loading indicator during search

---

## 🐛 Error Handling

### Common Errors

| Error | Cause | Solution |
|-------|-------|----------|
| 400 Bad Request | Invalid filter values | Check parameter format |
| 401 Unauthorized | Missing/invalid token | Login again to get new token |
| 500 Server Error | Backend issue | Check server logs |
| No Results | No matching properties | Try broader search criteria |

### Error Handling Example
```javascript
try {
  const results = await getproperties(params);
  updateUI(results.data);
} catch (error) {
  if (error.response?.status === 401) {
    // Redirect to login
  } else if (error.response?.status === 400) {
    // Show validation error
  } else {
    // Show generic error
  }
}
```

---

## 📝 Notes

- SearchBar is a **UI component** only, not directly connected to backend
- Actual API calls are made by **parent components** using `getproperties()`
- The component manages **UI state** and passes selected filters to parent
- Parent is responsible for **API calls** and **result handling**

---

## 🔗 Related Files

- **Component**: [SearchBar.jsx](front-end/src/Components/SearchBar.jsx)
- **API Service**: [api.js](front-end/src/Service/api.js)
- **Parent Component**: [Home.jsx](front-end/src/Pages/Home.jsx)
- **Property List**: [PropertyList.jsx](front-end/src/Components/PropertyList.jsx)
- **Main API Documentation**: [SEARCH_API_DOCUMENTATION.md](SEARCH_API_DOCUMENTATION.md)
