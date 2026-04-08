// app.js
console.log("APP FILE LOADED");
const express = require("express");
const cors = require("cors");
const urlRoutes = require("./routes/urlRoutes");
const { redirectUrl } = require("./controllers/urlController");

const app = express();

app.use(cors());
app.use(express.json());

// POST /api/shorten route
app.use("/api", urlRoutes);

// Redirect short URLs at root
app.get("/:shorturl", redirectUrl);

// Root test route
app.get("/", (req, res) => {
  res.send("This is the URL shortener API");
});

module.exports = app;
