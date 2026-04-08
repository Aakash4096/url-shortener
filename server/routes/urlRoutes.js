const express = require("express");
const { createShortUrl, getAllUrls } = require("../controllers/urlController");

const router = express.Router();

// POST /api/shorten
router.post("/shorten", createShortUrl);

// GET /api/urls → return all short URLs
router.get("/urls", getAllUrls);

module.exports = router;
