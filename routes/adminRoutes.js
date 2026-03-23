const express = require("express");
const router = express.Router();
const {
  getAdminStats,
  getValidationQueue,
  getPendingConventions,
  getPendingCertificates,
  getAllUsers,
} = require("../controllers/adminController");
const { protect, authorizeRoles } = require("../middleware/authMiddleware");

// All routes require admin role
router.use(protect, authorizeRoles("admin", "super_admin"));

// Dashboard stats
router.get("/stats", getAdminStats);

// Validation queue
router.get("/validation-queue", getValidationQueue);

// Pending conventions
router.get("/conventions/pending", getPendingConventions);

// Pending certificates
router.get("/certificates/pending", getPendingCertificates);

// User management
router.get("/users", getAllUsers);

module.exports = router;