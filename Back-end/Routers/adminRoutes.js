// Routers/adminRoutes.js
const express = require("express");
const router = express.Router();

//getAllPropertiesAdmin
const { approvedproperty, deletepropertyAdmin, getAllpropertiesAdmin , getpropertyByIdAdmin  } = require("../Controllers/adminController");
const authMiddleware = require("../Middleware/authMiddleware");

// Method GET: /api/admin/properties (ดึงประกาศทั้งหมดสำหรับ Admin)
router.get("/properties", authMiddleware, getAllpropertiesAdmin);

// Method PUT: /api/admin/approve/{id} 
router.put("/approved/:id", authMiddleware, approvedproperty);

router.get("/properties/:id", authMiddleware, getpropertyByIdAdmin);

// Method DELETE: /api/admin/properties/{id}
router.delete("/properties/:id", authMiddleware, deletepropertyAdmin);

module.exports = router;