import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setShortUrl("");

    if (!longUrl) {
      setError("Please enter a URL.");
      return;
    }

    try {
      // Replace with your backend URL
      const response = await axios.post("http://localhost:5000/shorten", {
        originalUrl: longUrl, // match your backend field name
      });

      setShortUrl(response.data.shortUrl);
      setLongUrl("");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Server error. Try again.");
    }
  };

  const handleCopy = () => {
    if (shortUrl) {
      navigator.clipboard.writeText(shortUrl);
      alert("Copied to clipboard!");
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Resume URL Shortener</h1>
        <form onSubmit={handleSubmit} className="url-form">
          <input
            type="text"
            placeholder="Enter your Original URL"
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
          />
          <button type="submit">Shorten</button>
        </form>

        {error && <p className="error">{error}</p>}

        {shortUrl && (
          <div className="result">
            <p>Shortened URL:</p>
            <a href={shortUrl} target="_blank" rel="noopener noreferrer">
              {shortUrl}
            </a>
            <button onClick={handleCopy}>Copy</button>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
