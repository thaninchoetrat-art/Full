// Middleware/authMiddleware.js

const authMiddleware = (req, res, next) => {
    // รับ Token จาก Header (รูปแบบ: { authorization: 'Bearer token' })
    const authHeader = req.headers.authorization;
    
    // ตรวจสอบว่ามี header และขึ้นต้นด้วยคำว่า Bearer หรือไม่
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "No token provided, authorization denied" });
    }

    // แยกเอาเฉพาะตัว token ออกมา
    const token = authHeader.split(" ")[1];

    try {
        // TODO: หากมีระบบ Login แล้ว ให้ใช้ jsonwebtoken มาตรวจสอบ (jwt.verify)
        // const jwt = require("jsonwebtoken");
        // const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // req.user = decoded;
        
        // ถ้าต้องการให้เฉพาะ Admin ใช้ API นี้ได้ (เมื่อทำระบบ Role แล้ว)
        // if (req.user.role !== 'admin') {
        //     return res.status(403).json({ message: "Access denied. Admin only." });
        // }

        // ให้ผ่านการตรวจสอบไปยัง Controller ถัดไป (ใช้สำหรับการทดสอบเบื้องต้น)
        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid token" });
    }
};

module.exports = authMiddleware;