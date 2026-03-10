const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
// Express.js → build the API server

// CORS → allow frontend requests

//testing of routes

app.get("/", (req, res) => {
  res.send("This is the url shortener API");
});
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    message: "server healthy",
  });
});

module.exports = app;
