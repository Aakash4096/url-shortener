// models/urlModel.js
const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema(
  {
    originalUrl: { type: String, required: true },
    shortUrl: { type: String, required: true },
    clicks: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
  },
  {
    collection: "url", // <-- match the name of your existing collection
  },
);

module.exports = mongoose.model("Url", urlSchema);
