const fs = require("fs") // ใช้จัดการไฟล์ อ่าน เขียน ลบ
const path = require("path") // ใช้จัดการ path ให้ถูกต้อง ทุก OS
const Property = require("../Models/properties")


const dataPath = path.join(__dirname, "../Data/properties.json") // dataPath  ไฟล์เก็บข้อมูลทั้งหมด
const uploadPath = path.join(__dirname, "../uploads") // uploadPath โฟลเดอร์เก็บรูป

const readData = () => {
    try {
        return JSON.parse(fs.readFileSync(dataPath)); // อ่านไฟล์ เเปลงJSON เป็นArray
    } catch { // ถ้า error ให้ return เป็น []
        return [];
    }
};

const writeData = (data) => {
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2)); // เขียนข้อมูลลงไฟล์ (เเปลง object เป็น Json), 2 คือ format ให้สวย
};


exports.getproperties = (req, res) => {
    const { q, type, minPrice, maxPrice, bedrooms } = req.query;
    let data = readData();

    // เอาเฉพาะประกาศที่อนุมัติ
    let approvedData = data.filter(item => item.status === "approved");

    // ค้นหาจากคำ keyword (ชื่อ, ทำเล, คำอธิบาย)
    if (q) {
        const keyword = q.trim().toLowerCase();
        approvedData = approvedData.filter((item) =>
            [item.title, item.location, item.description]
                .filter(Boolean)
                .some((field) => field.toLowerCase().includes(keyword))
        );
    }

    if (type && type !== "all") {
        approvedData = approvedData.filter((item) =>
            item.type && item.type.toLowerCase() === type.toLowerCase()
        );
    }

    if (minPrice) {
        const min = Number(minPrice);
        if (!Number.isNaN(min)) {
            approvedData = approvedData.filter((item) => Number(item.price) >= min);
        }
    }

    if (maxPrice) {
        const max = Number(maxPrice);
        if (!Number.isNaN(max)) {
            approvedData = approvedData.filter((item) => Number(item.price) <= max);
        }
    }

    if (bedrooms) {
        const bed = Number(bedrooms);
        if (!Number.isNaN(bed)) {
            approvedData = approvedData.filter((item) => Number(item.bedrooms) >= bed);
        }
    }

    res.json(approvedData);
}


exports.createproperty = (req, res) => {
    const data = readData();  // อ่านข้อมูลเก่า 
    const newProperty = Property.fromRequest(req); //สร้าง property ใหม่
    data.push(newProperty.toJSON()); // เเปลงเป็น json  push ลง array
    writeData(data);    //  save ลงไฟล
    res.json({ Message: "Create", data: newProperty }) // response กลับ
};

exports.getpropertyById = (req, res) => {
    const data = readData(); //อ่านข้อมูล
    const item = data.find(p => p.id === req.params.id) // หา id
    if (!item) return res.status(404).json({ Message: "Not found" }) // ถ้าไม่่เจอ id ให้เป็น 404 ถ้าเจอ return
    res.json(item);

};



exports.deleteproperty = (req, res) => {
    try {
        let data = readData();

        const item = data.find(p => p.id === req.params.id); // หา item
        //ลบรูปถ้ามี
        if (item?.image) {// ถ้ามี image
            const filePath = path.join(uploadPath, item.image);
            if (fs.existsSync(filePath)) {  //เช็คไฟล์ว่ามีจริงป่าว
                fs.unlinkSync(filePath); // ลบไฟล์
            }
        }

        data = data.filter(p => p.id !== req.params.id); // ลบ data ( เอาทุกตัวยกเว้น id นี้)
        writeData(data); // เขียนไฟล์ใหม่่
        res.json({ Message: "Delete" }); // response

    } catch (err) {
        console.log(err);
        res.status(500).json({ Message: "Eror" }) // error handling
    }

};

