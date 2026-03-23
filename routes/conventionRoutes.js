const express = require("express");
const router = express.Router();
const {
  getAllConventions,
  getMyConvention,
  getConventionById,
  validateConvention,
  assignSupervisor,
  getAllCertificates,
  validateCertificate,
  getMyCertificate,
} = require("../controllers/conventionController");
const { protect, authorizeRoles } = require("../middleware/authMiddleware");

// Convention routes
router.get("/", protect, authorizeRoles("admin", "super_admin"), getAllConventions);
router.get("/my", protect, authorizeRoles("student"), getMyConvention);
router.get("/:id", protect, getConventionById);
router.put("/:id/validate", protect, authorizeRoles("admin", "super_admin"), validateConvention);
router.put("/:id/supervisor", protect, authorizeRoles("company"), assignSupervisor);

// Certificate routes
router.get("/certificates/all", protect, authorizeRoles("admin", "super_admin"), getAllCertificates);
router.get("/certificates/my", protect, authorizeRoles("student"), getMyCertificate);
router.put("/certificates/:id/validate", protect, authorizeRoles("admin", "super_admin"), validateCertificate);

module.exports = router;