const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/user.route');
const replyRoutes = require('./routes/reply.route');
const corsOptions = require('./config/corsOptions');
connectDB();

const app = express();

app.use(
  cors({
    origin: "https://rizz-karo.vercel.app",
    credentials: true, // if you're using cookies or sessions
  })
);
app.use(express.json());

// Routes
app.use('/api/auth', userRoutes);
app.use("/api/reply", replyRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to RizzKaro API 🔥');
});

module.exports = app;
