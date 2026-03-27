// Controllers/superadminController.js
const fs = require("fs");
const path = require("path");

const usersDataPath = path.join(__dirname, "../Data/users.json");
const propertiesDataPath = path.join(__dirname, "../Data/properties.json");

const readUsersData = () => {
  try {
    return JSON.parse(fs.readFileSync(usersDataPath));
  } catch {
    return [];
  }
};

const readPropertiesData = () => {
  try {
    return JSON.parse(fs.readFileSync(propertiesDataPath));
  } catch {
    return [];
  }
};

const writeUsersData = (data) => {
  fs.writeFileSync(usersDataPath, JSON.stringify(data, null, 2));
};

// Get all users with their roles
exports.getAllUsers = (req, res) => {
  try {
    const users = readUsersData();
    const safeUsers = users.map((u) => ({
      id: u.id,
      username: u.username,
      email: u.email,
      role: u.role || "user",
      token: u.token,
    }));
    res.status(200).json(safeUsers);
  } catch (err) {
    console.error("Get all users error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all admins
exports.getAllAdmins = (req, res) => {
  try {
    const users = readUsersData();
    const admins = users
      .filter((u) => u.role === "admin" || u.role === "superadmin")
      .map((u) => ({
        id: u.id,
        username: u.username,
        email: u.email,
        role: u.role,
      }));
    res.status(200).json(admins);
  } catch (err) {
    console.error("Get all admins error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Promote user to admin
exports.promoteToAdmin = (req, res) => {
  try {
    const { userId } = req.params;
    let users = readUsersData();

    const userIndex = users.findIndex((u) => u.id === userId);
    if (userIndex === -1) {
      return res.status(404).json({ message: "User not found" });
    }

    users[userIndex].role = "admin";
    writeUsersData(users);

    res.status(200).json({
      message: "User promoted to admin successfully",
      user: {
        id: users[userIndex].id,
        username: users[userIndex].username,
        email: users[userIndex].email,
        role: users[userIndex].role,
      },
    });
  } catch (err) {
    console.error("Promote to admin error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Demote admin to user
exports.demoteToUser = (req, res) => {
  try {
    const { userId } = req.params;
    let users = readUsersData();

    const userIndex = users.findIndex((u) => u.id === userId);
    if (userIndex === -1) {
      return res.status(404).json({ message: "User not found" });
    }

    // Prevent demoting superadmin
    if (users[userIndex].role === "superadmin") {
      return res.status(403).json({ message: "Cannot demote superadmin" });
    }

    users[userIndex].role = "user";
    writeUsersData(users);

    res.status(200).json({
      message: "User demoted to user successfully",
      user: {
        id: users[userIndex].id,
        username: users[userIndex].username,
        email: users[userIndex].email,
        role: users[userIndex].role,
      },
    });
  } catch (err) {
    console.error("Demote to user error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete user by superadmin
exports.deleteUserSuperAdmin = (req, res) => {
  try {
    const { userId } = req.params;
    let users = readUsersData();

    // Prevent deleting superadmin
    const userToDelete = users.find((u) => u.id === userId);
    if (userToDelete && userToDelete.role === "superadmin") {
      return res.status(403).json({ message: "Cannot delete superadmin" });
    }

    const filteredUsers = users.filter((u) => u.id !== userId);

    if (users.length === filteredUsers.length) {
      return res.status(404).json({ message: "User not found" });
    }

    writeUsersData(filteredUsers);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    console.error("Delete user error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get statistics
exports.getStatistics = (req, res) => {
  try {
    const users = readUsersData();
    const properties = readPropertiesData();

    const stats = {
      totalUsers: users.length,
      totalAdmins: users.filter((u) => u.role === "admin" || u.role === "superadmin").length,
      totalSuperAdmins: users.filter((u) => u.role === "superadmin").length,
      totalProperties: properties.length,
      approvedProperties: properties.filter((p) => p.status === "approved").length,
      pendingProperties: properties.filter((p) => p.status === "pending").length,
      rejectedProperties: properties.filter((p) => p.status === "rejected").length,
    };

    res.status(200).json(stats);
  } catch (err) {
    console.error("Get statistics error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get user details
exports.getUserById = (req, res) => {
  try {
    const { userId } = req.params;
    const users = readUsersData();

    const user = users.find((u) => u.id === userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const safeUser = {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role || "user",
    };

    res.status(200).json(safeUser);
  } catch (err) {
    console.error("Get user by ID error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Search users by username, email, or role
exports.searchUsers = (req, res) => {
  try {
    const { query, type } = req.query;

    if (!query || query.trim() === "") {
      return res.status(400).json({ message: "Search query is required" });
    }

    const users = readUsersData();
    const searchQuery = query.toLowerCase().trim();

    let results = users.filter((u) => {
      if (type === "username") {
        return u.username.toLowerCase().includes(searchQuery);
      } else if (type === "email") {
        return u.email.toLowerCase().includes(searchQuery);
      } else if (type === "role") {
        return u.role.toLowerCase() === searchQuery;
      } else {
        // Default: search in all fields
        return (
          u.username.toLowerCase().includes(searchQuery) ||
          u.email.toLowerCase().includes(searchQuery) ||
          u.role.toLowerCase().includes(searchQuery)
        );
      }
    });

    const safeResults = results.map((u) => ({
      id: u.id,
      username: u.username,
      email: u.email,
      role: u.role || "user",
    }));

    res.status(200).json({
      count: safeResults.length,
      data: safeResults,
    });
  } catch (err) {
    console.error("Search users error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Search properties
exports.searchProperties = (req, res) => {
  try {
    const { query, status } = req.query;

    if (!query || query.trim() === "") {
      return res.status(400).json({ message: "Search query is required" });
    }

    const properties = readPropertiesData();
    const searchQuery = query.toLowerCase().trim();

    let results = properties.filter((p) => {
      const titleMatch = p.title && p.title.toLowerCase().includes(searchQuery);
      const descriptionMatch = p.description && p.description.toLowerCase().includes(searchQuery);
      const locationMatch = p.location && p.location.toLowerCase().includes(searchQuery);
      const statusMatch = status ? p.status === status : true;

      return (titleMatch || descriptionMatch || locationMatch) && statusMatch;
    });

    res.status(200).json({
      count: results.length,
      data: results,
    });
  } catch (err) {
    console.error("Search properties error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
