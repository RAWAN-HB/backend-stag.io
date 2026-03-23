const express = require("express");
const router = express.Router();
const {
  getAllOffers,
  getAllOffersAdmin,
  getMyOffers,
  getDomains,
  getLocations,
  getOfferById,
  createOffer,
  updateOffer,
  deleteOffer,
  updateOfferStatus,
} = require("../controllers/offerController");
const { protect, authorizeRoles } = require("../middleware/authMiddleware");

// Public routes
router.get("/", getAllOffers);
router.get("/domains", getDomains);
router.get("/locations", getLocations);
router.get("/:id", getOfferById);

// Company routes
router.post("/", protect, authorizeRoles("company"), createOffer);
router.get("/company/my", protect, authorizeRoles("company"), getMyOffers);
router.put("/:id", protect, authorizeRoles("company"), updateOffer);
router.delete("/:id", protect, authorizeRoles("company", "admin", "super_admin"), deleteOffer);

// Admin routes
router.get("/admin/all", protect, authorizeRoles("admin", "super_admin"), getAllOffersAdmin);
router.put("/:id/status", protect, authorizeRoles("admin", "super_admin"), updateOfferStatus);

module.exports = router;