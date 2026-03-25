// Controllers/adminController.js
const fs = require("fs");
const path = require("path");



const dataPath = path.join(__dirname, "../Data/properties.json");

// ฟังก์ชันสำหรับอ่านข้อมูล (โครงสร้างเดียวกับที่ใช้ใน propertycontroller)
const readData = () => {
    try {
        return JSON.parse(fs.readFileSync(dataPath));
    } catch {
        return [];
    }
};

// ฟังก์ชันสำหรับบันทึกข้อมูลทับไฟล์เดิม
const writeData = (data) => {
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
};

//แยกapi
exports.getAllpropertiesAdmin = (req, res) => {
    try {
        const data = readData();
        res.status(200).json(data);
    } catch (err) {
        console.error("Get properties admin error:", err);
        res.status(500).json({ message: "Server error" });
    }
};

exports.approvedproperty = (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body; 
        let data = readData();

        const propertyIndex = data.findIndex(p => p.id === id);

        if (propertyIndex === -1) {
            return res.status(404).json({ message: "Property not found" });
        }

        // ตรวจสอบว่ามีการส่ง status มาไหม ถ้าไม่มีให้ใช้ค่าเดิม
        if (status) {
            data[propertyIndex].status = status; 
        } else {
            return res.status(400).json({ message: "Please provide a status" });
        }

        writeData(data);
        res.status(200).json({ 
            message: `Status updated to ${status} successfully`,
            data: data[propertyIndex] 
        });

    } catch (err) {
        console.error("Update status error:", err);
        res.status(500).json({ message: "Server error" });
    }
};

// ดึงข้อมูลประกาศรายตัวสำหรับ Admin
exports.getpropertyByIdAdmin = (req, res) => {
    try {
        const { id } = req.params;
        const data = readData();
        
        const item = data.find(p => p.id === id);

        if (!item) {
            return res.status(404).json({ message: "Property not found" });
        }

        res.status(200).json(item);
    } catch (err) {
        console.error("Get property by ID error:", err);
        res.status(500).json({ message: "Server error" });
    }
};

// ลบไม่ได้ช่วยให้ลืม
exports.deletepropertyAdmin = (req, res) => {
    try {
        const { id } = req.params;
        let data = readData();

        // ค้นหาและกรองเอาประกาศที่ไม่ตรงกับ id ที่ต้องการลบ
        const filteredData = data.filter(p => p.id !== id);

        // ถ้าจำนวนข้อมูลเท่าเดิม แสดงว่าไม่เจอ id ที่ต้องการลบ
        if (data.length === filteredData.length) {
            return res.status(404).json({ message: "Property not found" });
        }

        // บันทึกข้อมูลที่ถูกลบแล้วลงไฟล์
        writeData(filteredData);

        res.status(200).json({ message: "Deleted successfully" });

    } catch (err) {
        console.error("Delete error:", err);
        res.status(500).json({ message: "Server error while deleting property" });
    }

};