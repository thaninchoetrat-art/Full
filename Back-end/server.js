const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const propertyrouters = require("./Routers/propertyrouters");

app.use(cors());
app.use(express.json());

// เปิดให้โหลดรูป
app.use("/uploads", express.static("uploads"));


app.use("/api/properties", propertyrouters);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running port ${PORT}`);
});

