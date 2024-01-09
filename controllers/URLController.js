const express = require("express");
const { SECRET, BEURL } = require("../utils/config.js");
const User = require("../models/usersModel.js");
const Url = require("../models/urlModel.js");
const shortid = require("shortid");
const router = express.Router();

// Getting token function
const getTokenFrom = (req) => {
  const authorization = req.get("authorization");

  if (authorization && authorization.startsWith("bearer ")) {
    return authorization.replace("bearer ", "");
  }
};

// Function to create a shortened URL
const shortenURL = async (req, res) => {
  try {
    const { longURL } = req.body;

    // Generate a unique short code using shortid
    const shortCode = shortid.generate();

    // Create a new URL entry
    const newURL = new Url({
      longurl: longURL, // Update to match your schema
      shorturl: shortCode, // Update to match your schema
      user: req.userId, // Assuming you have a middleware to extract userId from the JWT
    });

    // Save the URL to the database
    await newURL.save();

    // Modify the response for clarity
    res.status(201).json({
      shortURL: `${FEURL}/${shortCode}`, // Update to match your URL structure
      message: 'URL shortened successfully.',
    });
  } catch (error) {
    console.error('Error shortening URL:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

// Function to redirect to the original URL when given a short code
const redirectToOriginalURL = async (req, res) => {
  try {
    const { shortCode } = req.params;

    // Find the URL by short code
    const url = await Url.findOne({ shorturl: shortCode }); // Update to match your schema
    if (!url) {
      return res.status(404).json({ message: 'URL not found.' });
    }

    // Update the click count
    url.clickCount += 1;
    await url.save();

    // Redirect with a 302 Found status code
    res.status(302).redirect(url.longurl); // Update to match your schema
  } catch (error) {
    console.error('Error redirecting to original URL:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

const getUserURLs = async (req, res) => {
  try {
    // Find URLs associated with the user
    const userURLs = await Url.find({ user: req.userId }); // Assuming you have a middleware to extract userId from the JWT

    res.status(200).json(userURLs);
  } catch (error) {
    console.error('Error getting user URLs:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

// Getting full data
router.get("/user/url", async (req, res) => {
  try {
    // Find URLs associated with the user
    const userURLs = await Url.find({ user: req.userId }); // Assuming you have a middleware to extract userId from the JWT

    res.status(200).json(userURLs);
  } catch (error) {
    console.error('Error getting user URLs:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

module.exports = { shortenURL, redirectToOriginalURL, getUserURLs };