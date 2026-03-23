const express = require("express");
const router = express.Router();
const {
  getPlatformStats,
  getAllUsers,
  getPendingCompanies,
  approveCompany,
  suspendCompany,
  createAdmin,
  updateUserRole,
  deleteUser,
  toggleUserStatus,
} = require("../controllers/superAdminController");
const { protect, authorizeRoles } = require("../middleware/authMiddleware");

// All routes require super_admin role
router.use(protect, authorizeRoles("super_admin"));

// Platform stats
router.get("/stats", getPlatformStats);

// User management
router.get("/users", getAllUsers);
router.put("/users/:id/role", updateUserRole);
router.put("/users/:id/toggle", toggleUserStatus);
router.delete("/users/:id", deleteUser);

// Company management
router.get("/companies/pending", getPendingCompanies);
router.put("/companies/:id/approve", approveCompany);
router.put("/companies/:id/suspend", suspendCompany);

// Admin management
router.post("/admins", createAdmin);

module.exports = router;