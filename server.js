const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const path = require("path");
require("dotenv").config();

// Import routes
const authRoutes = require("./routes/authRoutes");
const offerRoutes = require("./routes/offerRoutes");
const applicationRoutes = require("./routes/applicationRoutes");
const conventionRoutes = require("./routes/conventionRoutes");
const supervisorRoutes = require("./routes/supervisorRoutes");
const companyRoutes = require("./routes/companyRoutes");
const superAdminRoutes = require("./routes/superAdminRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ===== Swagger setup =====
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Stag.io API",
      version: "1.0.0",
      description: "API documentation for Stag.io platform",
    },
    servers: [
      { url: `http://localhost:${process.env.PORT || 5000}` },
      { url: process.env.RENDER_EXTERNAL_URL || "https://your-app.onrender.com" }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: [path.join(__dirname, "/routes/*.js")], // ensure all route files are included
};

const swaggerSpecs = swaggerJsdoc(swaggerOptions);

// Swagger route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// Optional: JSON view for debugging Swagger
app.get("/swagger-json", (req, res) => res.json(swaggerSpecs));

// ===== API routes =====
app.use("/api/auth", authRoutes);
app.use("/api/offers", offerRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/conventions", conventionRoutes);
app.use("/api/supervisor", supervisorRoutes);
app.use("/api/company", companyRoutes);
app.use("/api/super", superAdminRoutes);

// Test route
app.get("/", (req, res) => res.send("Stag.io backend running"));

// ===== Connect to MongoDB =====
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("MongoDB connection error:", err));

// ===== Start server =====
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));