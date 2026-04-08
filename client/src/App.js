import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");
  const [allUrls, setAllUrls] = useState([]); // to store all URLs from backend

  // Fetch all URLs from backend when component mounts
  useEffect(() => {
    const fetchUrls = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/urls");
        setAllUrls(res.data);
      } catch (err) {
        console.error("Error fetching URLs:", err);
      }
    };
    fetchUrls();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setShortUrl("");

    if (!longUrl) {
      setError("Please enter a URL.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/shorten", {
        originalUrl: longUrl,
      });

      const newShortUrl = res.data.shortUrl;
      setShortUrl(newShortUrl);

      // Update allUrls to include the new URL at the top
      setAllUrls([
        { originalUrl: longUrl, shortUrl: newShortUrl, clicks: 0 },
        ...allUrls,
      ]);

      setLongUrl("");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || "Server error");
    }
  };

  const handleCopy = (url) => {
    navigator.clipboard.writeText(url);
    alert("Copied to clipboard!");
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>URL Shortener</h1>

        <form onSubmit={handleSubmit} className="url-form">
          <input
            type="text"
            placeholder="Enter URL to shorten"
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
            <button onClick={() => handleCopy(shortUrl)}>Copy</button>
          </div>
        )}

        <h2>All Shortened URLs</h2>
        {allUrls.length === 0 && <p>No URLs found.</p>}

        <table>
          <thead>
            <tr>
              <th>Short URL</th>
              <th>Original URL</th>
              <th>Clicks</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allUrls.map((url, index) => (
              <tr key={index}>
                <td>
                  <a
                    href={url.shortUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {url.shortUrl}
                  </a>
                </td>
                <td>
                  <a
                    href={url.originalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {url.originalUrl}
                  </a>
                </td>
                <td>{url.clicks}</td>
                <td>
                  <button onClick={() => handleCopy(url.shortUrl)}>Copy</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </header>
    </div>
  );
}

export default App;
