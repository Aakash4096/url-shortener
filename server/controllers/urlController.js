const Url = require("../models/urlModel");

function generateShortUrl() {
  return Math.random().toString(36).substring(3, 9);
}
exports.createShortUrl = async (req, res) => {
  try {
    const { originalUrl } = req.body;
    const shortUrl = generateShortUrl();
    const newUrl = new Url({
      originalUrl,
      shortUrl,
    });
    await newUrl.save();
    res.json({
      shortUrl: `http://localhost:5000/${shortUrl}`,
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// User sends URL
//        ↓
// API receives request
//        ↓
// generate short code
//        ↓
// store in MongoDB
//        ↓
// return shortened URL

exports.redirectUrl = async (req, res) => {
  // use 'req'!
  try {
    const { shorturl } = req.params; // now this works
    const url = await Url.findOne({ shortUrl: shorturl }); // check your field name in DB
    if (!url) {
      return res.status(404).json({ error: "URL not found" });
    }
    url.clicks = (url.clicks || 0) + 1; // increment clicks safely
    await url.save();
    res.redirect(url.originalUrl);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
