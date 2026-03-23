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

/**
 * @swagger
 * tags:
 *   name: Conventions
 *   description: Routes for conventions and certificates
 */

/**
 * @swagger
 * /api/conventions/:
 *   get:
 *     summary: Get all conventions (admin and super admin)
 *     tags: [Conventions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all conventions
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.get("/", protect, authorizeRoles("admin", "super_admin"), getAllConventions);

/**
 * @swagger
 * /api/conventions/my:
 *   get:
 *     summary: Get current student's convention
 *     tags: [Conventions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Student's convention retrieved
 *       401:
 *         description: Unauthorized
 */
router.get("/my", protect, authorizeRoles("student"), getMyConvention);

/**
 * @swagger
 * /api/conventions/{id}:
 *   get:
 *     summary: Get convention by ID
 *     tags: [Conventions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the convention
 *     responses:
 *       200:
 *         description: Convention retrieved successfully
 *       401:
 *         description: Unauthorized
 */
router.get("/:id", protect, getConventionById);

/**
 * @swagger
 * /api/conventions/{id}/validate:
 *   put:
 *     summary: Validate a convention (admin and super admin)
 *     tags: [Conventions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the convention
 *     responses:
 *       200:
 *         description: Convention validated successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.put("/:id/validate", protect, authorizeRoles("admin", "super_admin"), validateConvention);

/**
 * @swagger
 * /api/conventions/{id}/supervisor:
 *   put:
 *     summary: Assign a supervisor to a convention (company)
 *     tags: [Conventions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the convention
 *     responses:
 *       200:
 *         description: Supervisor assigned successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.put("/:id/supervisor", protect, authorizeRoles("company"), assignSupervisor);

/**
 * @swagger
 * /api/conventions/certificates/all:
 *   get:
 *     summary: Get all certificates (admin and super admin)
 *     tags: [Conventions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all certificates
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.get("/certificates/all", protect, authorizeRoles("admin", "super_admin"), getAllCertificates);

/**
 * @swagger
 * /api/conventions/certificates/my:
 *   get:
 *     summary: Get current student's certificates
 *     tags: [Conventions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Student's certificates retrieved
 *       401:
 *         description: Unauthorized
 */
router.get("/certificates/my", protect, authorizeRoles("student"), getMyCertificate);

/**
 * @swagger
 * /api/conventions/certificates/{id}/validate:
 *   put:
 *     summary: Validate a certificate (admin and super admin)
 *     tags: [Conventions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the certificate
 *     responses:
 *       200:
 *         description: Certificate validated successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.put("/certificates/:id/validate", protect, authorizeRoles("admin", "super_admin"), validateCertificate);

module.exports = router;