import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [allUrls, setAllUrls] = useState([]);
  const [showStats, setShowStats] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    setCopied(false);

    try {
      const res = await axios.post("http://localhost:5000/api/shorten", {
        originalUrl,
      });

      setShortUrl(res.data.shortUrl);
      setOriginalUrl("");
      fetchAllUrls();
    } catch (err) {
      console.error(err);
      setError("Unable to shorten URL. Please check the URL and try again.");
      setShortUrl("");
    } finally {
      setLoading(false);
    }
  };

  const fetchAllUrls = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/urls");
      setAllUrls(res.data);
    } catch (err) {
      console.error("Failed to fetch URLs:", err);
    }
  };

  const handleTrackPerformance = () => {
    fetchAllUrls();
    setShowStats(!showStats);
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOpenUrl = () => {
    window.open(shortUrl, "_blank");
  };

  const getTotalClicks = () => {
    return allUrls.reduce((sum, url) => sum + (url.clicks || 0), 0);
  };

  return (
    <div className="App">
      <div className="container">
        {/* Header */}
        <div className="header">
          <div className="logo-circle">
            <span className="logo-icon">Link</span>
          </div>
          <h1 className="title">URL Shortener</h1>
          <p className="subtitle">
            Transform long URLs into short, shareable links instantly
          </p>
        </div>

        {/* Main Card */}
        <div className="card">
          {/* Form Section */}
          <form onSubmit={handleSubmit} className="form">
            <div className="input-group">
              <label htmlFor="url-input" className="label">
                Your Long URL
              </label>
              <div className="input-wrapper">
                <input
                  id="url-input"
                  type="url"
                  placeholder="https://example.com/very/long/url"
                  value={originalUrl}
                  onChange={(e) => setOriginalUrl(e.target.value)}
                  required
                  className="input"
                  disabled={loading}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || !originalUrl}
              className="btn btn-primary"
            >
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Shortening...
                </>
              ) : (
                <>
                  <span className="btn-icon">✂</span>
                  Shorten URL
                </>
              )}
            </button>

            {error && <div className="error-message">{error}</div>}
          </form>

          {/* Result Section */}
          {shortUrl && (
            <div className="result-container">
              <div className="result-header">
                <h3 className="result-title">Your Shortened URL</h3>
              </div>

              <div className="result-card">
                <div className="result-display">
                  <a
                    href={shortUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="short-url-link"
                  >
                    {shortUrl}
                  </a>
                </div>

                <div className="result-actions">
                  <button
                    onClick={handleCopyToClipboard}
                    className={`btn btn-action ${copied ? "copied" : ""}`}
                    title="Copy to clipboard"
                  >
                    <span>{copied ? "✓ Copied!" : "Copy"}</span>
                  </button>

                  <button
                    onClick={handleOpenUrl}
                    className="btn btn-action"
                    title="Open in new tab"
                  >
                    <span>Open</span>
                  </button>
                </div>
              </div>

              <p className="result-hint">
                Your link is ready to share! Click "Open" to verify it works.
              </p>
            </div>
          )}
        </div>

        {/* Info Section */}
        <div className="info-section">
          <div className="info-item">
            <p>
              <strong>Instant Shortening</strong>
              <br />
              Get results in milliseconds
            </p>
          </div>
          <div className="info-item">
            <p>
              <strong>Secure & Reliable</strong>
              <br />
              Your URLs are safely stored
            </p>
          </div>
          <button
            onClick={handleTrackPerformance}
            className="info-item info-item-clickable"
            type="button"
          >
            <p>
              <strong>Track Performance</strong>
              <br />
              Monitor your link clicks
            </p>
          </button>
        </div>

        {/* Stats Section */}
        {showStats && (
          <div className="stats-container">
            <div className="stats-header">
              <h3>Link Statistics</h3>
              <button 
                onClick={() => setShowStats(false)} 
                className="close-btn"
              >
                ×
              </button>
            </div>

            <div className="stats-summary">
              <div className="stat-item">
                <span className="stat-label">Total Links Created</span>
                <span className="stat-value">{allUrls.length}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Total Clicks</span>
                <span className="stat-value">{getTotalClicks()}</span>
              </div>
            </div>

            {allUrls.length > 0 ? (
              <div className="stats-list">
                <h4>Recent URLs</h4>
                <div className="url-list">
                  {allUrls.slice(0, 5).map((item, index) => (
                    <div key={index} className="url-item">
                      <div className="url-short">{item.shortUrl}</div>
                      <div className="url-info">
                        <div className="url-original" title={item.originalUrl}>
                          {item.originalUrl.substring(0, 50)}...
                        </div>
                        <div className="url-clicks">Clicks: {item.clicks || 0}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p className="no-stats">No URLs shortened yet</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
