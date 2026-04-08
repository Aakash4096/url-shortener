# URL Shortener Application

A modern, full-stack URL shortening service built with **React** (frontend) and **Express.js + MongoDB** (backend). This application allows users to convert long URLs into short, easily shareable links.

## 📁 Project Structure

```
Project_URL_Shortened/
├── frontend/              # React frontend application
│   ├── public/
│   ├── src/
│   │   ├── App.js        # Main URL shortener component
│   │   ├── App.css       # Styling
│   │   └── ...
│   └── package.json
│
└── url-shortener/        # Full-stack application (backend-focused)
    ├── server/           # Express.js backend API
    │   ├── models/       # MongoDB schemas
    │   ├── controllers/  # Business logic
    │   ├── routes/       # API endpoints
    │   ├── config/       # Database configuration
    │   ├── app.js        # Express app setup
    │   ├── server.js     # Server entry point
    │   └── package.json
    │
    └── client/           # Additional React client
        ├── public/
        ├── src/
        └── package.json
```

## 🚀 Features

- **URL Shortening**: Convert long URLs into compact, shareable short URLs
- **URL Redirection**: Automatically redirect short URLs to original URLs
- **RESTful API**: Clean and simple API endpoints
- **CORS Support**: Cross-Origin Resource Sharing enabled for frontend communication
- **Database**: MongoDB for persistent URL storage
- **Responsive UI**: User-friendly React frontend

## 🛠️ Tech Stack

### Frontend
- **React** 19.2.4
- **Axios** for HTTP requests
- **React Scripts** 5.0.1

### Backend
- **Node.js** with Express 5.2.1
- **MongoDB** with Mongoose 9.3.0
- **CORS** 2.8.6
- **Dotenv** 17.3.1

## 📦 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager
- MongoDB database (local or cloud-based)

### Backend Setup

1. Navigate to the server directory:
   ```bash
   cd url-shortener/server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the server directory with your MongoDB connection string:
   ```env
   MONGO_URI=mongodb://localhost:27017/url-shortener
   PORT=5000
   ```

4. Start the backend server:
   ```bash
   npm start
   ```
   The server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```
   The frontend will open at `http://localhost:3000`

## 🔗 API Endpoints

### POST `/api/shorten`
Shortens a given URL.

**Request:**
```json
{
  "originalUrl": "https://example.com/very/long/url"
}
```

**Response:**
```json
{
  "originalUrl": "https://example.com/very/long/url",
  "shortUrl": "http://localhost:5000/abc123",
  "_id": "60d5ec49c1234567890abcde"
}
```

### GET `/:shorturl`
Redirects to the original URL.

**Example:** 
- Request: `GET /abc123`
- Response: Redirects to the original URL

### GET `/`
API health check endpoint.

**Response:** `"This is the URL shortener API"`

## 💻 Usage

1. **Start the backend server** (port 5000)
2. **Start the frontend** (port 3000)
3. **Open your browser** and navigate to `http://localhost:3000`
4. **Enter a long URL** in the input field
5. **Click "Shorten"** to generate a short URL
6. **Share the shortened URL** or click it to verify it redirects correctly

## 📝 Available Scripts

### Frontend
```bash
npm start      # Start development server
npm build      # Build for production
npm test       # Run tests
npm eject      # Eject from Create React App (one-way operation)
```

### Backend
```bash
npm start      # Start the Express server
npm test       # Run tests
```

## 🗄️ Database Schema

### URL Model
```javascript
{
  originalUrl: String,      // Original long URL
  shortUrl: String,         // Generated short URL
  shortCode: String,        // Unique short code
  clicks: Number,           // Number of redirects
  createdAt: Date,          // Creation timestamp
  expiresAt: Date          // Optional expiration date
}
```

## 🔒 Security Features

- **CORS Enabled**: Prevents unauthorized cross-origin requests
- **Environment Variables**: Sensitive data managed through `.env` files
- **Input Validation**: URL validation before shortening
- **Express Middleware**: Body parser with size limits

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| **MongoDB connection failed** | Check MongoDB is running and `MONGO_URI` in `.env` is correct |
| **CORS error** | Ensure backend server is running on port 5000 and CORS middleware is configured |
| **Port already in use** | Change port in `.env` (backend) or `package.json` (frontend) |
| **Dependencies not installed** | Run `npm install` in both frontend and backend directories |

## 📝 Environment Variables

### Backend `.env` file
```env
MONGO_URI=mongodb://localhost:27017/url-shortener
PORT=5000
NODE_ENV=development
```

## 🚀 Deployment

### Deploy Backend
- Use services like Heroku, Railway, or Render
- Update `MONGO_URI` to use a cloud MongoDB instance (e.g., MongoDB Atlas)
- Set environment variables on the hosting platform

### Deploy Frontend
- Build the project: `npm run build`
- Deploy the `build/` folder to services like Vercel, Netlify, or GitHub Pages
- Update API base URL in `App.js` to point to production backend

## 📄 License

ISC

## 👨‍💻 Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for bugs and feature requests.

## 📞 Support

For support, please reach out or open an issue on the GitHub repository.

---

**Happy URL Shortening! 🎉**
