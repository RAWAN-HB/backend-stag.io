const express = require("express");
const router = express.Router();
const {
  getCompanyStats,
  getRecentApplications,
  getAllSupervisors,
} = require("../controllers/companyController");
const { protect, authorizeRoles } = require("../middleware/authMiddleware");

// All routes require company role
router.use(protect, authorizeRoles("company"));

// Dashboard stats
router.get("/stats", getCompanyStats);

// Recent applications
router.get("/applications/recent", getRecentApplications);

// Get all supervisors to assign
router.get("/supervisors", getAllSupervisors);

module.exports = router;