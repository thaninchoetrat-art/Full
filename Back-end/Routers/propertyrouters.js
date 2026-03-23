const express = require("express"); //framework สำหรับสร้าง server
const router = express.Router(); //สร้าง mini app สำหรับ route
const upload = require("../Middleware/uploadmiddleware"); //คือไฟล์ multer    //รับไฟล์รูป //เก็บลง uploads

const {      //function ทีเขียนมี   readData() , writeData() , delete file
    getproperties, 
    createproperty,
    getpropertyById,
    deleteproperty,
} = require("../Controllers/propertycontroller")

router.get("/" , getproperties); //ดึง property ทั้งหมด
                    //รับไฟล์จาก form , key ต้องชื่อ image
router.post("/" , upload.single("image") , createproperty);
router.get("/:id", getpropertyById);  // id = dynamic parameter
router.delete("/:id", deleteproperty); // delete id


module.exports = router;