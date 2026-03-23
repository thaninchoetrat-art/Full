class Property {
    constructor ({    // ข้อมูล     // ใช้ object destructuring เวลาเรียก new Property({})
        id,
        title,
        price,
        oldPrice = 0,  //ค่า default
        location,
        description,
        image = null,
        type ="Condominium", //ค่า default
        bedrooms = 0,
        bathrooms = 0,
        landSize = 0,
        areaSize = 0,
        badge = "Featured",
        createBy = null,
        status = "pedding",

    })   {
        this.id = id || Date.now().toString();         // id   ถ้าไม่มี  ใช้ timestamp
        this.title = title || "";
        this.price = Number(price) || 0; //แปลงเป็น number เสมอ
        this.oldPrice = Number(oldPrice) || 0; 
        this.location = location || "";            //string fields    กัน undefined
        this.description = description || "";
        this.image = image;    // รับค่าจาก multer (req.file.filename)
        this.type = type;
        this.bedrooms = bedrooms;
        this.bathrooms = bathrooms;
        this.landSize = landSize;              // เก็บข้อมูล property
        this.areaSize = areaSize;
        this.badge = badge;
        this.createBy = createBy; // ใช้เก็บ user ที่สร้าง
        this.status = status; //มี typo


    }

    //Method: getDiscount
    getDiscount () {    //ใช้คำนวณ % ส่วนลด
        if (!this.oldPrice) return 0;    //กัน error กัน หาร 0
        return Math.round(
            ((this.oldPrice - this.price) / this.oldPrice) * 100
        );
    }

    //Method: toJSON
    toJSON(){ //ใช้ตอน ก่อนเก็บลงไฟล์
        return{
            ...this, //copy property ทั้งหมด
            discount: this.getDiscount(), //เพิ่ม field ใหม่
        };
    }
           //bridge ระหว่าง Frontend - Model
    static fromRequest(req) { // map request เป็น object
       
        return new Property({      //แปลง req.body เป็น Property object  รับค่าจาก form
            title: req.body.title,   //รับค่าจาก form
            price: req.body.price,    
            oldPrice: req.body.oldPrice,
            location: req.body.location,
            description: req.body.description,
            type: req.body.type,
            bedrooms: req.body.bedrooms,
            bathrooms: req.body.bathrooms,
            landSize: req.body.landSize,
            areaSize: req.body.areaSize,
            badge: req.body.badge,
            image: req.file ? req.file.filename : null,  // รับค่า จาก multer     ถ้ามีไฟล์  ใช้ชื่อไฟล์, ถ้าไม่มี null
        })

    }
}

module.exports = Property