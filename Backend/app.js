const express = require("express");

const cors = require("cors");
const connectDB = require("./config/db");
const userRoutes = require("./routes/user.route");
const replyRoutes = require("./routes/reply.route");
const postRoutes = require("./routes/post.route");
const corsOptions = require("./config/corsOptions");

// Add this at the top of your server file (app.js or server.js)
const fs = require('fs');
const path = require('path');

const uploadDir = path.join(__dirname, 'public', 'uploads', 'avatars');

// Create directory if it doesn't exist
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
  console.log('Created upload directory:', uploadDir);
}

connectDB();

const app = express();

app.use(express.json());
app.use(cors(corsOption));
app.use('/public', express.static('public'));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/reply", replyRoutes);
app.use("/api/posts", postRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to RizzKaro API 🔥");
});

module.exports = app;
