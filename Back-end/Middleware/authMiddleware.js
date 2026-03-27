// Middleware/authMiddleware.js

const fs = require("fs");
const path = require("path");

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "No token provided, authorization denied" });
    }

    const token = authHeader.split(" ")[1];
    const dataPath = path.join(__dirname, "../Data/users.json");

    try {
        const users = JSON.parse(fs.readFileSync(dataPath));
        const user = users.find((u) => u.token === token);
        if (!user) {
            return res.status(401).json({ message: "Invalid token" });
        }

        const role = user.role || "user";
        req.user = { id: user.id, email: user.email, username: user.username, role };

        // ถ้าเข้าถึง admin route แต่ไม่ใช่ admin หรือ superadmin ให้ปฏิเสธ
        if (req.baseUrl.startsWith("/admin") && role !== "admin" && role !== "superadmin") {
            return res.status(403).json({ message: "Admin access required" });
        }

        next();
    } catch (err) {
        console.error("Auth middleware error:", err);
        return res.status(500).json({ message: "Server error" });
    }
};

module.exports = authMiddleware;