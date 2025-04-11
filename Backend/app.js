const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const userRoutes = require("./routes/user.route");
const replyRoutes = require("./routes/reply.route");
const corsOptions = require('./config/corsOptions');

connectDB();

const app = express();

app.use(express.json());
app.use(cors(corsOptions));
// Routes
app.use("/api/users", userRoutes);
app.use("/api/reply", replyRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to RizzKaro API 🔥");
});

module.exports = app;
