const url = required("../models/urlModel");

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
