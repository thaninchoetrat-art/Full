const fs = require("fs");
const path = require("path");
const multer = require("multer"); // library สำหรับ upload file ใน Express
const uploadDir = path.join(__dirname, "../uploads"); // สร้าง path โฟลเดอร์

if (!fs.existsSync(uploadDir)) { //เช็คว่าโฟลเดอร์ uploads มีป่าว
    fs.mkdirSync(uploadDir); // ถ้าไม่มีสร้าง
}

const storage = multer.diskStorage({ // ให้เก็บไฟล์ลง disk
    // ที่เก็บไฟล์
    destination : (req, file ,cb) => { // req =request, file = ข้อมูลไฟล์ , cb = callback
        cb(null, uploadDir); // ไม่มีerror = null , เก็บไฟลใว้uploadDir
    },
    // ตั้งชื่อไฟล์
    filename : (req, file ,cb) => {
        const ext = path.extname(file.originalname) // นามสกุลไฟล์
        const name = Date.now() + "_" + Math.round(Math.random() * 1e9) + ext; // สร้างชือใหม่
            cb(null , name); // ส่งชื่อกลับ
    },
}); 
 // กรองไฟล์
const fileFilter = (req, file , cb) => {
    const allowed = ["image/png" , "image/jpg" , "image/jpeg"]; // type ของไฟล์
        if(allowed.includes(file.mimetype)) { // เงือนไข
            cb(null, true); // ถ้าไช่ ให้รับไฟล์
        }else {
            cb(new Error("Only image allowed") , false); // ถ้าไม่ไช่ ให้ reject
        }
    
};
 //สร้าง upload middleware
const upload = multer({
    storage,
    fileFilter,
    limits: {fileSize: 5 * 1024 * 1024} // ตัวจำกัดขนาดไฟล์
});


module.exports = upload ;