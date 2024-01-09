const express = require('express');
const router = express.Router();
const ResetRequestController = require('../controllers/ResetRequestController');

// Get recent password reset requests
router.get('/reset-requests', ResetRequestController.getRecentResetRequests);

module.exports = router;