const express = require("express");
const router = express.Router();
const {
  applyToOffer,
  getMyApplications,
  getOfferApplications,
  reviewApplication,
  validateApplication,
  getAllApplicationsAdmin,
} = require("../controllers/applicationController");
const { protect, authorizeRoles } = require("../middleware/authMiddleware");
const { upload } = require("../config/cloudinary");

// Student routes
router.post("/:offerId", protect, authorizeRoles("student"), upload.single("cv"), applyToOffer);
router.get("/my/applications", protect, authorizeRoles("student"), getMyApplications);

// Company routes
router.get("/offer/:offerId", protect, authorizeRoles("company"), getOfferApplications);
router.put("/:id/review", protect, authorizeRoles("company"), reviewApplication);

// Admin routes
router.get("/admin/all", protect, authorizeRoles("admin", "super_admin"), getAllApplicationsAdmin);
router.put("/:id/validate", protect, authorizeRoles("admin", "super_admin"), validateApplication);

module.exports = router;