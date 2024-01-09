const express = require('express');
const router = express.Router();
const authenticateUser = require('../middleware/authentication');
const { shortenURL, redirectToOriginalURL, getUserURLs } = require('../controllers/URLController');

// Add the route for redirecting to the original URL
router.get("/:shortCode", redirectToOriginalURL);

// Posting new URL data
router.post("/", shortenURL);

// Route for getting a user's shortened URLs (requires authentication)
router.get("/total-urls", authenticateUser, getUserURLs);

module.exports = router;
