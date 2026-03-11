const express = require("express");
// GET
// POST
// PUT
// DELETE

const cors = require("cors");
// Frontend (localhost:3000)
// Backend  (localhost:5000)
// Browser blocks cross-origin requests.
// CORS allows communication between them.
// Without this your React frontend would fail
//  to call the API.

const app = express();
// app behaves as an API server object
// app.get()
// app.post()
// app.use()

app.use(cors());
// use() means add middleware.

// Middleware = code that runs before the
//  request reaches your route.

app.use(express.json()); //This middleware allows the server to read JSON data from requests.

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
