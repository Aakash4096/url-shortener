const mongoose = require("mongoose");

async function connectDB() {
  try {
    await mongoose.connect(
      "mongodb+srv://testuser:Aakash12345@cluster0.jurndht.mongodb.net/url_shortener?retryWrites=true&w=majority",
    );
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Exit the process with an error code
  }
}
module.exports = connectDB;
// "mongodb+srv://aakashgupta9931_db_user:<db_password>@rookie96.rifzeo0.mongodb.net/?appName=rookie96"
// "mongodb://127.0.0.1:27017/url-shortener"
