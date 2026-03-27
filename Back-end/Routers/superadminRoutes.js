// Routers/superadminRoutes.js
const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  getAllAdmins,
  promoteToAdmin,
  demoteToUser,
  deleteUserSuperAdmin,
  getStatistics,
  getUserById,
  searchUsers,
  searchProperties,
} = require("../Controllers/superadminController");
const authMiddleware = require("../Middleware/authMiddleware");

// Middleware to check superadmin role
const superadminMiddleware = (req, res, next) => {
  if (req.user.role !== "superadmin") {
    return res.status(403).json({ message: "Superadmin access required" });
  }
  next();
};

/**
 * @swagger
 * /api/superadmin/users:
 *   get:
 *     summary: Get all users in the system
 *     description: Retrieve a list of all users with their roles and information. Only accessible to superadmins.
 *     tags: [Superadmin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all users retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   username:
 *                     type: string
 *                   email:
 *                     type: string
 *                   role:
 *                     type: string
 *                     enum: [user, admin, superadmin]
 *                   token:
 *                     type: string
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       403:
 *         description: Forbidden - Superadmin access required
 */
router.get("/users", authMiddleware, superadminMiddleware, getAllUsers);

/**
 * @swagger
 * /api/superadmin/admins:
 *   get:
 *     summary: Get all admins and superadmins
 *     description: Retrieve a list of all users with admin or superadmin roles.
 *     tags: [Superadmin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all admins retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   username:
 *                     type: string
 *                   email:
 *                     type: string
 *                   role:
 *                     type: string
 *                     enum: [admin, superadmin]
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       403:
 *         description: Forbidden - Superadmin access required
 */
router.get("/admins", authMiddleware, superadminMiddleware, getAllAdmins);

/**
 * @swagger
 * /api/superadmin/user/{userId}:
 *   get:
 *     summary: Get user details by ID
 *     description: Retrieve detailed information about a specific user by their ID
 *     tags: [Superadmin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: The unique identifier of the user
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 username:
 *                   type: string
 *                 email:
 *                   type: string
 *                 role:
 *                   type: string
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       403:
 *         description: Forbidden - Superadmin access required
 *       404:
 *         description: User not found
 */
router.get("/user/:userId", authMiddleware, superadminMiddleware, getUserById);

/**
 * @swagger
 * /api/superadmin/statistics:
 *   get:
 *     summary: Get system statistics
 *     description: Retrieve comprehensive statistics about the system including user counts, admin counts, and property statistics
 *     tags: [Superadmin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: System statistics retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalUsers:
 *                   type: integer
 *                   description: Total number of users
 *                 totalAdmins:
 *                   type: integer
 *                   description: Total number of admins and superadmins
 *                 totalSuperAdmins:
 *                   type: integer
 *                   description: Total number of superadmins
 *                 totalProperties:
 *                   type: integer
 *                   description: Total number of properties
 *                 approvedProperties:
 *                   type: integer
 *                   description: Number of approved properties
 *                 pendingProperties:
 *                   type: integer
 *                   description: Number of pending properties
 *                 rejectedProperties:
 *                   type: integer
 *                   description: Number of rejected properties
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       403:
 *         description: Forbidden - Superadmin access required
 */
router.get("/statistics", authMiddleware, superadminMiddleware, getStatistics);

/**
 * @swagger
 * /api/superadmin/promote/{userId}:
 *   put:
 *     summary: Promote user to admin role
 *     description: Upgrade a regular user or admin account to admin role. Cannot be used on superadmins.
 *     tags: [Superadmin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: The unique identifier of the user to promote
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User promoted to admin successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     username:
 *                       type: string
 *                     email:
 *                       type: string
 *                     role:
 *                       type: string
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       403:
 *         description: Forbidden - Superadmin access required
 *       404:
 *         description: User not found
 */
router.put("/promote/:userId", authMiddleware, superadminMiddleware, promoteToAdmin);

/**
 * @swagger
 * /api/superadmin/demote/{userId}:
 *   put:
 *     summary: Demote admin to regular user role
 *     description: Downgrade an admin account to regular user. Cannot be used on superadmins.
 *     tags: [Superadmin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: The unique identifier of the admin to demote
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Admin demoted to user successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     username:
 *                       type: string
 *                     email:
 *                       type: string
 *                     role:
 *                       type: string
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       403:
 *         description: Forbidden - Superadmin access required or cannot demote superadmin
 *       404:
 *         description: User not found
 */
router.put("/demote/:userId", authMiddleware, superadminMiddleware, demoteToUser);

/**
 * @swagger
 * /api/superadmin/user/{userId}:
 *   delete:
 *     summary: Delete a user from the system
 *     description: Permanently delete a user account. Cannot delete superadmins. Use with caution.
 *     tags: [Superadmin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: The unique identifier of the user to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       403:
 *         description: Forbidden - Superadmin access required or cannot delete superadmin
 *       404:
 *         description: User not found
 */
router.delete("/user/:userId", authMiddleware, superadminMiddleware, deleteUserSuperAdmin);

module.exports = router;
