// Routers/adminRoutes.js
const express = require("express");
const router = express.Router();

//getAllPropertiesAdmin
const { approvedproperty, deletepropertyAdmin, getAllpropertiesAdmin , getpropertyByIdAdmin  } = require("../Controllers/adminController");
const authMiddleware = require("../Middleware/authMiddleware");

/**
 * @swagger
 * /api/admin/properties:
 *   get:
 *     summary: Get all properties for admin
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Admin access required
 */
router.get("/properties", authMiddleware, getAllpropertiesAdmin);

/**
 * @swagger
 * /api/admin/approved/{id}:
 *   put:
 *     summary: Approve a property
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.put("/approved/:id", authMiddleware, approvedproperty);

/**
 * @swagger
 * /api/admin/properties/{id}:
 *   get:
 *     summary: Get property by id (admin)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Not found
 */
router.get("/properties/:id", authMiddleware, getpropertyByIdAdmin);

/**
 * @swagger
 * /api/admin/properties/{id}:
 *   delete:
 *     summary: Delete property (admin)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Deleted
 *       404:
 *         description: Not found
 */
router.delete("/properties/:id", authMiddleware, deletepropertyAdmin);

const { getAllUsers, deleteUser } = require("../Controllers/userController");

/**
 * @swagger
 * /api/admin/users:
 *   get:
 *     summary: Get all users (admin)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/users", authMiddleware, getAllUsers);

/**
 * @swagger
 * /api/admin/users/{id}:
 *   delete:
 *     summary: Delete user (admin)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Deleted
 *       404:
 *         description: Not found
 */
router.delete("/users/:id", authMiddleware, deleteUser);

module.exports = router;