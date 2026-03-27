const express = require("express"); //framework สำหรับสร้าง server
const router = express.Router(); //สร้าง mini app สำหรับ route
const upload = require("../Middleware/uploadmiddleware"); //คือไฟล์ multer    //รับไฟล์รูป //เก็บลง uploads

const {      //function ทีเขียนมี   readData() , writeData() , delete file
    getproperties, 
    createproperty,
    getpropertyById,
    deleteproperty,
} = require("../Controllers/propertycontroller")

/**
 * @swagger
 * /api/properties:
 *   get:
 *     summary: Search properties
 *     description: Search and filter approved properties by keyword, type, price range, and number of bedrooms. This endpoint powers the SearchBar component.
 *     tags: [SearchBar]
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         description: Search keyword (searches in title, location, description)
 *         example: "apartment"
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: ["Condominium", "House", "Townhouse", "Land"]
 *         description: Property type filter
 *         example: "Condominium"
 *       - in: query
 *         name: minPrice
 *         schema:
 *           type: number
 *         description: Minimum price in Baht (฿)
 *         example: 1000000
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: number
 *         description: Maximum price in Baht (฿)
 *         example: 5000000
 *       - in: query
 *         name: bedrooms
 *         schema:
 *           type: number
 *         description: Minimum number of bedrooms
 *         example: 2
 *     responses:
 *       200:
 *         description: List of matching properties returned successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "prop001"
 *                   title:
 *                     type: string
 *                     example: "Modern Condo Near BTS"
 *                   location:
 *                     type: string
 *                     example: "Silom, Bangkok"
 *                   type:
 *                     type: string
 *                     example: "Condominium"
 *                   price:
 *                     type: number
 *                     example: 3500000
 *                   bedrooms:
 *                     type: number
 *                     example: 2
 *                   bathrooms:
 *                     type: number
 *                     example: 2
 *                   area:
 *                     type: number
 *                     description: Area in square meters
 *                     example: 120
 *                   description:
 *                     type: string
 *                     example: "Spacious condo with modern amenities"
 *                   image:
 *                     type: string
 *                     example: "image1.jpg"
 *                   status:
 *                     type: string
 *                     enum: ["approved", "pending", "rejected"]
 *                     example: "approved"
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2024-01-15T10:30:00Z"
 *       400:
 *         description: Invalid query parameters
 *       500:
 *         description: Internal server error
 */
router.get("/" , getproperties); //ดึง property ทั้งหมด

/**
 * @swagger
 * /api/properties:
 *   post:
 *     summary: Create a new property
 *     tags: [Properties]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [title, location, price, bedrooms, description]
 *             properties:
 *               title:
 *                 type: string
 *                 description: Property title
 *               location:
 *                 type: string
 *                 description: Property location
 *               price:
 *                 type: number
 *                 description: Property price
 *               bedrooms:
 *                 type: number
 *                 description: Number of bedrooms
 *               description:
 *                 type: string
 *                 description: Property description
 *               type:
 *                 type: string
 *                 description: Property type (apartment, house, condo, etc.)
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Property image file
 *     responses:
 *       200:
 *         description: Property created successfully
 *       400:
 *         description: Bad request - missing required fields
 */
router.post("/" , upload.single("image") , createproperty);

/**
 * @swagger
 * /api/properties/{id}:
 *   get:
 *     summary: Get a property by ID
 *     tags: [Properties]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Property ID
 *     responses:
 *       200:
 *         description: Property found
 *       404:
 *         description: Property not found
 */
router.get("/:id", getpropertyById);  // id = dynamic parameter

/**
 * @swagger
 * /api/properties/{id}:
 *   delete:
 *     summary: Delete a property
 *     tags: [Properties]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Property ID
 *     responses:
 *       200:
 *         description: Property deleted successfully
 *       404:
 *         description: Property not found
 */
router.delete("/:id", deleteproperty); // delete id


module.exports = router;