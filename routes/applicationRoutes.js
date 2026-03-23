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

/**
 * @swagger
 * tags:
 *   name: Applications
 *   description: Application management routes for students, companies, and admins
 */

/**
 * @swagger
 * /api/applications/{offerId}:
 *   post:
 *     summary: Student applies to an offer
 *     tags: [Applications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: offerId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the offer to apply to
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               cv:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Application submitted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.post("/:offerId", protect, authorizeRoles("student"), upload.single("cv"), applyToOffer);

/**
 * @swagger
 * /api/applications/my/applications:
 *   get:
 *     summary: Get logged-in student's applications
 *     tags: [Applications]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of student's applications
 *       401:
 *         description: Unauthorized
 */
router.get("/my/applications", protect, authorizeRoles("student"), getMyApplications);

/**
 * @swagger
 * /api/applications/offer/{offerId}:
 *   get:
 *     summary: Get applications for a specific offer (company)
 *     tags: [Applications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: offerId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the offer
 *     responses:
 *       200:
 *         description: List of applications for the offer
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.get("/offer/:offerId", protect, authorizeRoles("company"), getOfferApplications);

/**
 * @swagger
 * /api/applications/{id}/review:
 *   put:
 *     summary: Review an application (company)
 *     tags: [Applications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the application
 *     responses:
 *       200:
 *         description: Application reviewed successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.put("/:id/review", protect, authorizeRoles("company"), reviewApplication);

/**
 * @swagger
 * /api/applications/admin/all:
 *   get:
 *     summary: Get all applications (admin and super admin)
 *     tags: [Applications]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all applications
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.get("/admin/all", protect, authorizeRoles("admin", "super_admin"), getAllApplicationsAdmin);

/**
 * @swagger
 * /api/applications/{id}/validate:
 *   put:
 *     summary: Validate an application (admin and super admin)
 *     tags: [Applications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the application
 *     responses:
 *       200:
 *         description: Application validated successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.put("/:id/validate", protect, authorizeRoles("admin", "super_admin"), validateApplication);

module.exports = router;