const express = require("express");
const router = express.Router();
const {
  getAssignedStudents,
  getStudentDetails,
  markAttendance,
  submitWeeklyReport,
  submitFinalEvaluation,
} = require("../controllers/supervisorController");
const { protect, authorizeRoles } = require("../middleware/authMiddleware");

// All routes require supervisor role
router.use(protect, authorizeRoles("supervisor"));

// Dashboard - get all assigned students with stats
router.get("/students", getAssignedStudents);

// Get one student details
router.get("/students/:trackingId", getStudentDetails);

// Mark attendance
router.post("/students/:trackingId/attendance", markAttendance);

// Submit weekly report
router.post("/students/:trackingId/weekly-report", submitWeeklyReport);

// Submit final evaluation
router.post("/students/:trackingId/evaluate", submitFinalEvaluation);

module.exports = router;