const express = require("express");
const cors = require("cors");
require("dotenv").config();

const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");

const app = express();
const propertyrouters = require("./Routers/propertyrouters");
const adminRoutes = require("./Routers/adminRoutes");
const userRoutes = require("./Routers/userRoutes");
const superadminRoutes = require("./Routers/superadminRoutes");

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Property Hub API",
    version: "1.0.0",
    description: "API documentation for Property Hub - Complete property management system with user, admin, and superadmin roles",
    contact: {
      name: "API Support",
      email: "support@propertyhub.com",
    },
  },
  servers: [
    {
      url: "http://localhost:5000",
      description: "Development Server",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        description: "Enter your Bearer token to access protected endpoints",
      },
    },
  },
  tags: [
    {
      name: "Users",
      description: "User authentication and profile management",
    },
    {
      name: "SearchBar",
      description: "Property search with advanced filtering - Search by keyword, type, price range, and bedrooms",
    },
    {
      name: "Properties",
      description: "Property listing and management",
    },
    {
      name: "Admin",
      description: "Admin panel for property approval and management",
    },
    {
      name: "Superadmin",
      description: "Superadmin panel for user management, role assignment, and system statistics - Access restricted to superadmin role only",
    },
  ],
};

const options = {
  definition: swaggerDefinition,
  apis: ["./Routers/*.js", "./Controllers/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

app.use(cors());
app.use(express.json());

// เปิดให้โหลดรูป
app.use("/uploads", express.static("uploads"));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/properties", propertyrouters);
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/superadmin", superadminRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running port ${PORT}`);
  console.log(`Swagger UI: http://localhost:${PORT}/api-docs`);
});

