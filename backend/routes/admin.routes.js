const express = require('express');
const router = express.Router();
const { isAdmin } = require('../middleware/auth');
const {
  getSalesReport,
  // ... other controller functions
} = require('../controllers/admin.controller');

// ... existing routes ...

// Sales Report Route
router.get('/sales-report', isAdmin, getSalesReport);

module.exports = router; 