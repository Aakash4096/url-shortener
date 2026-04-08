// controllers/urlController.js
const Url = require("../models/urlModel");

// Generate a random short code
async function generateShortUrl() {
  let code;
  let exists = true;
  while (exists) {
    code = Math.random().toString(36).substring(3, 9);
    exists = await Url.findOne({ shortUrl: code });
  }
  return code;
}
// Get all shortened URLs
exports.getAllUrls = async (req, res) => {
  try {
    const urls = await Url.find().sort({ createdAt: -1 }); // latest first
    res.json(urls);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
// Create a shortened URL
exports.createShortUrl = async (req, res) => {
  try {
    const { originalUrl } = req.body;

    // Ensure originalUrl includes protocol
    const formattedUrl =
      originalUrl.startsWith("http://") || originalUrl.startsWith("https://")
        ? originalUrl
        : `https://${originalUrl}`;

    const shortUrl = await generateShortUrl();

    const newUrl = new Url({
      originalUrl: formattedUrl,
      shortUrl,
    });

    await newUrl.save();

    res.json({
      shortUrl: `http://localhost:5000/${shortUrl}`,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// Redirect short URL to original URL
exports.redirectUrl = async (req, res) => {
  try {
    const { shorturl } = req.params;

    const url = await Url.findOne({ shortUrl: shorturl });
    if (!url) {
      return res.status(404).json({ error: "URL not found" });
    }

    url.clicks = (url.clicks || 0) + 1;
    await url.save();

    res.redirect(url.originalUrl);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
