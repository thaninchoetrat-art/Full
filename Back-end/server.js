const express = require("express");
const cors = require("cors");  //แก้ปัญหา front เรียก back ไม่ได้
require("dotenv").config();

const app = express(); //server หลัก
const propertyrouters = require("./Routers/propertyrouters") //ดึง router ทุกตัว

app.use(cors());  //เปิด CORS เป็นตัวให้ front กับ back สื่อสารกัน
app.use(express.json());  //รับ JSON เเปลง json เป้น javascript

app.use("/uploads", express.static("uploads")); //เปิดให้เข้าถึงไฟล์ในโฟลเดอร์ uploads // multer save รูปใว้ uploand  , express.static เปิดให้ frontend โหลดรูปได้

app.use("/api/properties", propertyrouters); //ใช้ router

//เริ่ม server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running port ${PORT}`);
});
